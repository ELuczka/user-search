import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Box, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: "64px", 
    width: "64px",
  },
  container: {
    marginTop: "20px" ,
  },
}));

const UserDetails = ({ user }) => {
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        item
        xs={5}
        alignItems="flex-end"
        className={classes.container}
      >
        <Grid item xs={2}>
          <Avatar
            variant="rounded"
            alt="Avatar"
            src={user.avatarUrl}
            className={classes.avatar}
          />
        </Grid>
        <Grid item xs={3}>
          <Box fontWeight="fontWeightBold">
            {user.name !=="" ? user.name : user.login}
          </Box>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={8}>
            <Box fontWeight="fontWeightLight" my={2}>
              {user.bio}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default UserDetails;