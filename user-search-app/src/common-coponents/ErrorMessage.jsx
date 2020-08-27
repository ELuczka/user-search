import React from "react";

import { Typography } from "@material-ui/core";

const ErrorMessage = ({ errorMessage }) => {
  return <Typography color="secondary">{errorMessage}</Typography>;
};

export default ErrorMessage;
