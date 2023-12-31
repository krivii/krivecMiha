//Spletna aplikacija za fotografe/ Web application for photographers

//Copyright (C) 2023  Luka Krivec (lk2378@student.uni-lj.si). Licensed under the GPL-3.0 or later.

import React from "react";
import { Typography, Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const Header = ({ title, subtitle, buttonLabel, buttonLink }) => {
  return (
    <Box display="flex" alignItems="center">
      <Box flex="1">
        <Typography variant="h5" color="grey" fontWeight="bold" sx={{ m: "0 0 5px 0" }}>
          {title}
        </Typography>
        <Typography variant="h8" color="#800080">
          {subtitle}
        </Typography>
      </Box>
      {buttonLabel && buttonLink && (
        <Box>
          <Link to={buttonLink} style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="success" 
              size="large" 
              startIcon={<AddIcon />} 
              sx={{ 
                "& .MuiButton-label": {
                  fontSize: "18px", 
                },
                "&:hover": {
                  backgroundColor: "#4cb54f", 
                },
              }}
            >
              {buttonLabel}
            </Button>
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default Header;
