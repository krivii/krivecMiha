import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import RefreshIcon from '@mui/icons-material/Refresh';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useLogout } from '../../hooks/useLogout';


const Topbar = () => {
  const {logout} = useLogout();
  const currentURL = window.location.href;

    const handleSignOut = () => {
      logout();
  };
  
    return (
      <Box p={1} display="flex" justifyContent="flex-end">
        <Tooltip title="Logout">
          <IconButton onClick={handleSignOut}>
            <ExitToAppIcon />
          </IconButton>
        </Tooltip>
      </Box>
    );
  };
  
  export default Topbar;