import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export default () => {
  return (
    <>
      <AppBar
        position="static"
        style={{ background: "black", marginBottom: 20 }}
      >
        <Toolbar>
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            Unsplash
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};
