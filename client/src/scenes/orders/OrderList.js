import React, { useEffect, useState } from 'react';
import Header from '../../components/admin/Header';
import { Box, Typography, Button  } from '@mui/material';
import { DataGrid, GridToolbar  } from '@mui/x-data-grid';
import { format } from 'date-fns';

import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckIcon from '@mui/icons-material/Check';
import NotificationsIcon from '@mui/icons-material/Notifications';


const OrderList = () => {
  
    const [userRows, setUserRows] = useState([]);
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 10,
        page: 0,
      });

      useEffect(() => {
        fetch(`http://localhost:3001/api/admin/order/`)
          .then((response) => response.json())
          .then((data) => {
            
            data.sort((a, b) => {
              const statusOrder = { active: 0, pending: 1, completed: 2 };
              return statusOrder[a.status] - statusOrder[b.status];
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
      flex: 0.5, 
      
    },
    {
        field: "status",
        headerName: "Status",
        flex: 1,
        renderCell: ({ row: { status } }) => {
          return (
            <Box
              width="60%"
              m="0 auto"
              p="10px"
              display="flex"
              justifyContent="center"
              backgroundColor={
                status === "pending"
                  ? "yellow"
                  : status === "active"
                  ? "green"
                  : "grey"
              }
              borderRadius="4px"
             
            >
              {status === "pending" && <AutorenewIcon />}
              {status === "active" && <NotificationsIcon />}
              {status === "completed" && <CheckIcon />}
              <Typography color="white" sx={{ ml: "1px" }}>
                {status}
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
      field: 'orderOwner',
      headerName: 'Owner',
      flex: 1,
      
    },
    {
        field: 'photos',
        headerName: 'Photos',
        flex: 0.5,
        renderCell: (params) => (
          <Link to={`/admin/cphotos/${params.row._id}`}>
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
              Photos
            </Button>
          </Link>
        ),
      },
      
    {
        field: 'date', 
        headerName: 'date',
        flex: 1,
        valueGetter: (params) => {
          const date = new Date(params.value);
    
        try {
            return format(date, 'dd.MM.yyyy');
        } catch (error) {
            
        }
            
       },
      },      
      {
        headerName: 'Edit order',
        flex: 0.5,
        renderCell: (params) => (
          <Link to={`/admin/orders/edit/${params.row._id}`}>            
            <Button variant="contained" color="primary">Edit</Button>
          </Link>
        ),
      },
  ];

  return (

    <Box m="20px">
      <Header title="ORDER LIST" subtitle="Welcome to order list" buttonLabel="Add order" buttonLink="/admin/orders/add" />
      
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

export default OrderList;
