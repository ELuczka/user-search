import React from "react";

import SearchIcon from "@material-ui/icons/Search";
import { Button, InputBase, Paper } from "@material-ui/core";

const MainCard = () => {
  return (
    <div>
      <Paper>
        <SearchIcon />
        <InputBase placeholder="Search for users" />
      </Paper>
      <Button variant="contained" size="medium" color="primary">
        Search
      </Button>
    </div>
  );
};

export default MainCard;
