//Spletna aplikacija za fotografe/ Web application for photographers

//Copyright (C) 2023  Luka Krivec (lk2378@student.uni-lj.si). Licensed under the GPL-3.0 or later.

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
import EditIcon from '@mui/icons-material/Edit';
import {useAuthContext} from '../../hooks/useAuthContext'   

const UserOrderList = () => {
    const { userId } = useParams();
    const {user} = useAuthContext();
    const [userRows, setUserRows] = useState([]);


    useEffect(() => {
        fetch(`http://localhost:3001/api/admin/order/userOrders/${userId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {

            console.log(data)
            setUserRows(data); })
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
            field: "status",
            headerName: "Status",
            flex: 1,
            renderCell: ({ row: { status } }) => {
              return (
                <Box
                  width="60%"
                  m="20px"
                  p="5px"
                  display="flex"
                  justifyContent="center"
                  backgroundColor={
                    status === "pending"
                      ? "#EADF91"
                      : status === "active"
                      ? "#D2EBD3"
                      : "#F5D0CD"
                  }
                  borderRadius="25px"             
                >
                  {status === "pending" && <AutorenewIcon />}
                  {status === "active" && <NotificationsIcon />}
                  {status === "completed" && <CheckIcon />}
                  <Typography color="black" sx={{ ml: "1px" }}>
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
                    backgroundColor: '#800080', 
                    '&:hover': {
                      backgroundColor: 'black', 
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
    
                      <EditIcon sx={{ color: '#800080' }} />
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
    
                components={{ Toolbar: GridToolbar }}
                
    
                />
          </Box>
        </Box>
      );
    };

export default UserOrderList;
