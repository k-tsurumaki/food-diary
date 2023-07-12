import { Box, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import React from "react";
import "./Sidebar.css"

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField id="input-with-sx" label="Search" variant="standard" color="warning"/>
      </Box>
    </div>
  );
};

export default Sidebar;
