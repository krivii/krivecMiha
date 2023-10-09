import React, { useEffect, useState } from 'react';
import Header from '../../components/admin/Header';
import { Box, Typography, Button  } from '@mui/material';
import { DataGrid, GridToolbar  } from '@mui/x-data-grid';
import { format } from 'date-fns';
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { Link } from 'react-router-dom';

const UserList = () => {
    const [userRows, setUserRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 10,
        page: 0,
      });

    useEffect(() => {
        fetch('http://localhost:3001/api/admin/user')
          .then((response) => response.json())
          .then((data) => {

            setUserRows(data);          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
      }, []);
      
  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 0.5, 
      
    },
    {
        field: "role",
        headerName: "Access Level",
        flex: 1,
        renderCell: ({ row: { role } }) => {
          return (
            <Box
              width="60%"
              m="0 auto"
              p="10px"
              display="flex"
              justifyContent="center"
              backgroundColor={
                role === "admin"
                  ? "brown"
                  : role === "manager"
                  ? "green"
                  : "green"
              }
              borderRadius="4px"
             
            >
              {role === "admin" && <AdminPanelSettingsOutlinedIcon />}
              {role === "manager" && <SecurityOutlinedIcon />}
              {role === "customer" && <LockOpenOutlinedIcon />}
              <Typography color="white" sx={{ ml: "1px" }}>
                {role}
              </Typography>
            </Box>
          );
        },
      },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: "name-column--cell" 
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      
    },
    {
        field: 'orders',
        headerName: 'User orders',
        flex: 0.5,
        renderCell: (params) => (
          <Link to={`/admin/orders/`}>
            <Button
              variant="contained"
              color="primary" 
              sx={{
                textTransform: 'lowercase', 
                backgroundColor: '#333', 
                '&:hover': {
                  backgroundColor: '#444', 
                },
              }}
            >
              Orders
            </Button>
          </Link>
        ),
      },
      
    {
        field: 'createdAt', 
        headerName: 'Created',
        flex: 1,
        valueGetter: (params) => {
          const createdAtDate = new Date(params.value);
    
         
            return format(createdAtDate, 'dd.MM.yyyy');
       },
      },      
      {
        headerName: 'Edit user',
        flex: 0.5,
        renderCell: (params) => (
          <Link to={`/admin/users/edit/${params.row._id}`}>            
            <Button variant="contained" color="primary">Edit</Button>
          </Link>
        ),
      },
  ];

  return (
    <Box m="20px">
      <Header title="USER LIST" subtitle="Welcome to user list" buttonLabel="Add user" buttonLink="/admin/users/add" />
      
      <Box 
        m="20px 0 0 0"
        height="70vh"
        sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              
            },
            "& .name-column--cell": {
              color: "green",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "blue",
              borderBottom: "none",
            },

            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: "blue",
            },
            "& .MuiCheckbox-root": {
              color: `green !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `black !important`,
              },
          }}
      >
      <DataGrid
            rows={userRows}
            columns={columns}
            getRowId={(row) => row._id}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            components={{ Toolbar: GridToolbar }}

            />
      </Box>
    </Box>
  );
};

export default UserList;
