import React from "react";

import { Box, Grid } from "@material-ui/core";
import UserSearch from "./UserSearch";

const MainCard = () => {
  return (
    <>
      <Box component={Grid} mt={6}>
        <Grid container spacing={2} direction="column" alignItems="center">
          <UserSearch />
        </Grid>
      </Box>
    </>
  );
};

export default MainCard;
