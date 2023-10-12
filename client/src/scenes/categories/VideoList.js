import React, { useEffect, useState } from 'react';
import Header from '../../components/admin/Header';
import { Box, Typography, Button  } from '@mui/material';
import { DataGrid, GridToolbar  } from '@mui/x-data-grid';
import { format } from 'date-fns';

import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const VideoList = () => {


    const [userRows, setUserRows] = useState([]);


      useEffect(() => {
        fetch(`http://localhost:3001/api/admin/video/`)
          .then((response) => response.json())
          .then((data) => {           
           setUserRows(data);
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
      }, []);

      const handleDeleteVideo = (videoId) => {
        if (confirm('Are you sure you want to delete the video? ')) {
            fetch(`http://localhost:3001/api/admin/video/${videoId}`, {
                method: 'DELETE',
                })
                .then((response) => {
                    if (response.ok) {
                        
                        window.location.reload();
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
          flex: 0.5,
        },
        {
          field: 'name',
          headerName: 'Name',
          flex: 1,
          cellClassName: 'name-column--cell',
        },
        {
          field: 'iframe',
          headerName: 'Link',
          flex: 1,
        },
        {
            flex: 0.7,
            renderCell: (params) => (
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteVideo(params.row._id)}
                >
                  Delete
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
            components={{ Toolbar: GridToolbar }}

            />
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default VideoList;
