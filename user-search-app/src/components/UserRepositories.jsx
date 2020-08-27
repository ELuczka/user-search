import React, { useEffect } from "react";
import { Box, Grid, Link, Paper, Typography } from "@material-ui/core";

import { useAsyncData } from "../api/useAsyncData";
import { fetchUser } from "../requests/fetchUser";
import { CLIENT_ID, CLIENT_SECRET } from "./constances";
import ErrorMessage from "../common-coponents/ErrorMessage";
import Loading from "../common-coponents/Loading";

const UserRepositories = ({ user }) => {
  const userLogin = user?.data?.login;

  const url = `https://api.github.com/users/${userLogin}/repos?sort=stars&per_page=3&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;

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
              <Paper >
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