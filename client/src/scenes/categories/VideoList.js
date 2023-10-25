//Spletna aplikacija za fotografe/ Web application for photographers

//Copyright (C) 2023  Luka Krivec (lk2378@student.uni-lj.si). Licensed under the GPL-3.0 or later.

import React, { useEffect, useState } from 'react';
import Header from '../../components/admin/Header';
import { Box, Typography, Button  } from '@mui/material';
import { DataGrid, GridToolbar  } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useAuthContext} from '../../hooks/useAuthContext'   

const VideoList = () => {
    const {user} = useAuthContext();

    const [userRows, setUserRows] = useState([]);

    useEffect(() => {
      fetchVideoData();
    }, []);

    const fetchVideoData = async () => {
        fetch(`http://localhost:3001/api/admin/video/`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {           
           setUserRows(data);
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
      };

      const handleDeleteVideo = (videoId) => {
        if (confirm('Are you sure you want to delete the video? ')) {
            fetch(`http://localhost:3001/api/admin/video/${videoId}`, {
                method: 'DELETE',
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
                })
                .then((response) => {
                    if (response.ok) {
                        toast.success('Video deleted!');
                        fetchVideoData();
                    } else {
                        console.error("Error while deleting v:", error);
                        toast.error('An error occurred while deleting video.');
                    }
                })
                .catch((error) => {
                    console.error("Error while deleting video:", error);
                toast.error('An error occurred while deleting video.');
                });
        }
        
      };
      
      
      
      const columns = [
        {
          field: '_id',
          headerName: 'ID',
          flex: 1,
        },
        {
          field: 'name',
          headerName: 'Name',
          flex: 2,
          cellClassName: 'name-column--cell',
        },
        {
          field: 'iframe',
          headerName: 'Source',

          flex: 2,
        },
        {
            flex: 0.5,
            field: 'Delete user',
            renderCell: (params) => (
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteVideo(params.row._id)}
                >
                  <DeleteOutlineIcon /> 
                </Button>
              </div>
            ),
          },
          
      ];
      

  return (

    <Box m="20px">
      <Header title="VIDEO LIST" subtitle="Welcome to video list" buttonLabel="Add video" buttonLink="/admin/videos/add" />
      
      <Box 
        m="20px 0 0 0"
        height="100%"
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
      <ToastContainer />
    </Box>
  );
};

export default VideoList;
