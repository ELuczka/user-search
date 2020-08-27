import React from "react";
import { Avatar, Box, Grid } from "@material-ui/core";

const UserDetails = ({ user }) => {
  return (
    <>
      <Grid
        container
        item
        xs={5}
        alignItems="flex-end"
      >
        <Grid item xs={2}>
          <Avatar
            variant="rounded"
            alt="Avatar"
            src={user?.data?.avatar_url}
          />
        </Grid>
        <Grid item xs={3}>
          <Box fontWeight="fontWeightBold">
            {user.data?.name || user.data?.login}
          </Box>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={8}>
            <Box fontWeight="fontWeightLight" my={2}>
              {user.data?.bio || ""}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default UserDetails;