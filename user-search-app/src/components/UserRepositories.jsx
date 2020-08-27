import React, { useEffect } from "react";
import { Box, Link, Paper, Typography } from "@material-ui/core";

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
      <Box fontWeight="fontWeightBold">Top repositories</Box>

      {hasRepos ? (
        data.data.map((el) => (
          <Paper key={el.id}>
            <Link href={el.svn_url}>
              <Typography noWrap>{el.name}</Typography>
            </Link>
          </Paper>
        ))
      ) : (
        <Typography>This user has no repository.</Typography>
      )}

      {isLoading && <Loading />}
      {error && <ErrorMessage errorMessage="Something went wrong... " />}
    </>
  );
};

export default UserRepositories;
