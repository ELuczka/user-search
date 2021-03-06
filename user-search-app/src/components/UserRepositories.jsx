import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Link, Paper, Typography } from "@material-ui/core";

import { useAsyncData } from "../api/useAsyncData";
import { fetchUser } from "../requests/fetchUser";
import { CLIENT_ID, CLIENT_SECRET } from "./constances";
import ErrorMessage from "../common-coponents/ErrorMessage";
import Loading from "../common-coponents/Loading";

const useStyles = makeStyles((theme) => ({
  repoLink: {
    padding: theme.spacing(),
    marginTop: theme.spacing(2),
  },
}));

const UserRepositories = ({ user }) => {
  const classes = useStyles();

  const url = `https://api.github.com/users/${user.login}/repos?sort=stars&per_page=3&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;

  const { data, isLoading, error, loadData } = useAsyncData({
    loadOnMount: true,
    fetchData: () => fetchUser(url),
  });

  useEffect(() => {
    loadData(url);
  }, [url]);

  const hasRepos = data?.data?.length > 0;

  return (
    <>
      <Grid container item xs={5} direction="column">
        <Grid item xs={6}>
          <Box fontWeight="fontWeightBold">Top repositories</Box>
        </Grid>

        {hasRepos ? (
          data.data.map((el) => (
            <Grid item xs={8} key={el.id}>
              <Paper className={classes.repoLink}>
                <Link href={el.svn_url}>
                  <Typography noWrap>{el.name}</Typography>
                </Link>
              </Paper>
            </Grid>
          ))
        ) : (
          <Typography>This user has no repository.</Typography>
        )}

        <Grid container item xs={5}>
          {isLoading && <Loading />}
          {error && <ErrorMessage errorMessage="Something went wrong... " />}
        </Grid>
      </Grid>
    </>
  );
};

export default UserRepositories;

UserRepositories.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
  }),
};
