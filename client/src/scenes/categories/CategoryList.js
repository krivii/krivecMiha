import React, { useEffect, useState } from 'react';
import Header from '../../components/admin/Header';
import { Box, Typography, Button  } from '@mui/material';
import { DataGrid, GridToolbar  } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useAuthContext} from '../../hooks/useAuthContext'


const CategoryList = () => {


    const [userRows, setUserRows] = useState([]);
    const {user} = useAuthContext();

    useEffect(() => {
      fetchCatData();
    }, []);

    const fetchCatData = async () => {
      if (user && user.token) {
        fetch('http://localhost:3001/api/admin/category/', {
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
      } else {
        console.error('User is not authenticated.');
      }
    };

    const handleDeleteCategory = (categoryId) => {
      if (confirm('Are you sure you want to delete the category? All category data will be lost.')) {
        fetch(`http://localhost:3001/api/admin/category/${categoryId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${user.token}`, 
          },
        })
          .then((response) => {
            if (response.ok) {
                toast.success('Category deleted successfully');
                fetchCatData();
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
                  backgroundColor: '#800080', 
                  '&:hover': {
                    backgroundColor: 'black', 
                  },
                }}
              >
                Images
              </Button>
            </Link>
          ),
        },
        {
          field: '_id',
          headerName: 'ID',
          flex: 1,
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
          flex: 2,
        },
        {
            flex: 0.55,
            headerName: 'Operations',
            renderCell: (params) => (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                <Link to={`/admin/categories/edit/${params.row._id}`}>
                  <EditIcon sx={{ color: '#800080', marginRight: '10px' }} />
                </Link>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteCategory(params.row._id)}
                >
                  <DeleteOutlineIcon /> 
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

export default CategoryList;
