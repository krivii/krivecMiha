import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Topbar = () => {
    const handleReload = () => {
      window.location.reload(); 
    };

    const signOut = () => {
        console.log("signout");
    }
  
    return (
      <Box p={1} display="flex" justifyContent="flex-end">
        <Tooltip title="Reload">
          <IconButton onClick={handleReload}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Logout">
          <IconButton onClick={handleReload}>
            <ExitToAppIcon />
          </IconButton>
        </Tooltip>
      </Box>
    );
  };
  
  export default Topbar;