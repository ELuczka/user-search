import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Button, Grid, InputBase, Paper } from "@material-ui/core";

import { useAsyncData } from "../api/useAsyncData";
import { fetchUser } from "../requests/fetchUser";
import { CLIENT_ID, CLIENT_SECRET } from './constances';

import UserDetails from "./UserDetails";
import UserRepositories from "./UserRepositories";
import ErrorMessage from "../common-coponents/ErrorMessage";
import Loading from "../common-coponents/Loading";

const UserSearch = () => {
  const [input, setInput] = useState("");

  const { data, isLoading, error, loadData } = useAsyncData({
    fetchData: (event) => fetchUser(`https://api.github.com/users/${event}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`),
  });

  return (
    <>
      <Grid container item xs={5}>
        <Grid item xs={6}>
          <Paper 
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
            />
          </Paper>
        </Grid>

        <Grid item xs={2}>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            onClick={() => loadData(input)}
          >
            Search
          </Button>
        </Grid>
      </Grid>

      {data && (
        <>
          <UserDetails user={data} />
          <UserRepositories user={data} />
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