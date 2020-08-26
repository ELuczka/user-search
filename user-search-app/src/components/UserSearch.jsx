import React, { useState } from "react";

import SearchIcon from "@material-ui/icons/Search";
import { Button, InputBase, Paper } from "@material-ui/core";

import { useAsyncData } from "../api/useAsyncData";
import { fetchUser } from "../requests/fetchUser";
import { CLIENT_ID, CLIENT_SECRET } from "./constances";

const UserSearch = () => {
  const [input, setInput] = useState("");

  const { data, isLoading, error, loadData } = useAsyncData({
    fetchData: (event) =>
      fetchUser(
        `https://api.github.com/users/${event}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
      ),
  });

  console.log("data: ", data, "isLoading: ", isLoading, "error: ", error);

  return (
    <div>
      <Paper>
        <SearchIcon onClick={() => loadData(input)} />
        <InputBase
          placeholder="Search for users"
          value={input}
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
      <Button
        variant="contained"
        size="medium"
        color="primary"
        onClick={() => loadData(input)}
      >
        Search
      </Button>
    </div>
  );
};

export default UserSearch;
