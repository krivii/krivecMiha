import React, { useEffect, useState } from 'react';
import Header from '../../components/admin/Header';
import { Box, Typography, Button  } from '@mui/material';
import { DataGrid, GridToolbar  } from '@mui/x-data-grid';
import { format } from 'date-fns';

import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CategoryList = () => {


    const [userRows, setUserRows] = useState([]);
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 10,
        page: 0,
      });

      useEffect(() => {
        fetch(`http://localhost:3001/api/admin/category/`)
          .then((response) => response.json())
          .then((data) => {           
           setUserRows(data);
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
      }, []);

      const handleDeleteCategory = (categoryId) => {
        if (confirm('Are you sure you want to delete the category? All category data will be lost.')) {
            fetch(`http://localhost:3001/api/admin/category/${categoryId}`, {
                method: 'DELETE',
                })
                .then((response) => {
                    if (response.ok) {
                        
                        window.location.reload();
                    } else {
                        console.error("Error while deleting category:", error);
                        toast.error('An error occurred while deleting category.');
                    }
                })
                .catch((error) => {
                    console.error("Error while deleting category:", error);
                toast.error('An error occurred while deleting category.');
                });
        }
        
      };
      
      
      
      const columns = [
        {
          field: '_id',
          headerName: 'ID',
          flex: 0.3,
        },
        {
          field: 'photos',
          headerName: 'Images',
          flex: 0.5,
          renderCell: (params) => (
            <Link to={`/admin/categories/images/${params.row._id}`}>
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
                Images
              </Button>
            </Link>
          ),
        },
        {
          field: 'name',
          headerName: 'Name',
          flex: 1,
          cellClassName: 'name-column--cell',
        },
        {
          field: 'description',
          headerName: 'Description',
          flex: 1.5,
        },
        {
            flex: 0.7,
            renderCell: (params) => (
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link to={`/admin/categories/edit/${params.row._id}`}>
                  <Button variant="contained" color="primary">
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteCategory(params.row._id)}
                >
                  Delete
                </Button>
              </div>
            ),
          },
          
      ];
      

  return (

    <Box m="20px">
      <Header title="CATEGORY LIST" subtitle="Welcome to category list" buttonLabel="Add category" buttonLink="/admin/categories/add" />
      
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
      <ToastContainer />
    </Box>
  );
};

export default CategoryList;
