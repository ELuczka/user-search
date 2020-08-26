import React from "react";
import { Avatar, Box } from "@material-ui/core";

const UserDetails = ({ user }) => {
  return (
    <div>
    <Avatar
      variant="rounded"
      alt="Avatar"
      src={user?.data?.avatar_url}
      style={{ height: "64px", width: "64px" }}
    />

    <Box>{user?.data?.name || user?.data?.login || ""}</Box>

    <Box>{user?.data?.bio || ""}</Box>
  </div>
  );
};

export default UserDetails;