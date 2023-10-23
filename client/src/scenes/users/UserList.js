import React, { useEffect, useState } from 'react';
import Header from '../../components/admin/Header';
import { Box, Typography, Button  } from '@mui/material';
import { DataGrid, GridToolbar  } from '@mui/x-data-grid';
import { format } from 'date-fns';
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

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
             data.sort((a, b) => {
              const usersOrder = { admin: 0, manager: 1, customer: 2 };
              return usersOrder[a.role] - usersOrder[b.role];
            });

            setUserRows(data);     
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
      }, []);
      
  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1, 
      
    },
    {
        field: "role",
        headerName: "Access Level",
        flex: 1,
        renderCell: ({ row: { role } }) => {
          return (
            <Box
              width="60%"
              m="20px"
              p="5px"

              display="flex"
              justifyContent="center"
              backgroundColor={
                role === "admin"
                  ? "#E0CF5B"
                  : role === "manager"
                  ? "#B4F1CA"
                  : "#B4F1CA"
              }
              borderRadius="25px"
             
            >
              {role === "admin" && <AdminPanelSettingsOutlinedIcon />}
              {role === "manager" && <SecurityOutlinedIcon />}
              {role === "customer" && <LockOpenOutlinedIcon />}
              <Typography color="black" sx={{ ml: "1px" }}>
                { role}
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
          <Link to={`/admin/orders/${params.row._id}`}>
            <Button
              variant="contained"
              color="primary" 
              sx={{
                textTransform: 'lowercase', 
                backgroundColor: '#800080', 
                '&:hover': {
                  backgroundColor: 'black', 
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
                  <EditIcon sx={{ color: '#800080' }} />
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
              color: "#800080 ",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "transparent",
              color: "#AAAAAA ",     

            },

            "& .MuiDataGrid-footerContainer": {   
              backgroundColor: "transparent",
              color: "#AAAAAA ",  
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
