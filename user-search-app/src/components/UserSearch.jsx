import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { Button, Grid, InputBase, Paper } from "@material-ui/core";

import { useAsyncData } from "../api/useAsyncData";
import { fetchUser } from "../requests/fetchUser";
import { CLIENT_ID, CLIENT_SECRET } from './constances';

import UserDetails from "./UserDetails";
import UserRepositories from "./UserRepositories";
import ErrorMessage from "../common-coponents/ErrorMessage";
import Loading from "../common-coponents/Loading";

const useStyles = makeStyles((theme) => ({
  searchUser: {
    padding: theme.spacing(),
    display: "flex",
    alignItems: "center",
    backgroundColor: "#E5E5E5",
  },

  input: {
    marginLeft: theme.spacing(1),
  },
  searchButton: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(1.5),
    textTransform: "none",
  },
}));

const UserSearch = () => {
  const classes = useStyles();

  const [input, setInput] = useState("");

  const { data, isLoading, error, loadData } = useAsyncData({
    fetchData: (event) => fetchUser(`https://api.github.com/users/${event}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`),
  });

  const memoizedUserDetails = React.useMemo(() => ({
    name: data?.data?.name || "",
    bio: data?.data?.bio || "",
    avatarUrl: data?.data?.avatar_url || "",
    login: data?.data?.login || "",
  }), [data]);

  return (
    <>
      <Grid container item xs={5}>
        <Grid item xs={6}>
          <Paper 
          className={classes.searchUser}
          >
            <SearchIcon onClick={() => loadData(input)} />
            <InputBase
              placeholder="Search for users"
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  event.stopPropagation();
                  loadData(input);
                }
              }}
              className={classes.input}
            />
          </Paper>
        </Grid>

        <Grid item xs={2}>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            onClick={() => loadData(input)}
            className={classes.searchButton}
          >
            Search
          </Button>
        </Grid>
      </Grid>

      {data && (
        <>
          <UserDetails user={memoizedUserDetails} />
          <UserRepositories user={memoizedUserDetails} />
        </>
      )}
      <Grid container item xs={5}>
        {isLoading && <Loading />}
        {error && (
          <ErrorMessage errorMessage="Sorry, but the user was not found." />
        )}
      </Grid>
    </>
  );
};

export default UserSearch;