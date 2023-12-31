//Spletna aplikacija za fotografe/ Web application for photographers

//Copyright (C) 2023  Luka Krivec (lk2378@student.uni-lj.si). Licensed under the GPL-3.0 or later.

import React, { useEffect, useState } from 'react';
import Header from '../../components/admin/Header';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Checkbox,
  Button,
  CircularProgress, 
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useAuthContext} from '../../hooks/useAuthContext'  

const OrderPhotoList = () => {
  const { orderId } = useParams();
  const {user} = useAuthContext();

  const [orderRows, setOrderRows] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchOrderData = async () => {
    fetch(`http://localhost:3001/api/admin/cphoto/orderPhotos/${orderId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOrderRows(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching order data:', error);
      });
    };

  const toggleSelectAll = () => {
    if (selectedImages.length === orderRows.length) {
      setSelectedImages([]);
    } else {
      setSelectedImages(orderRows.map((row) => row._id));
    }
  };

  const handleImageSelect = (imageId) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedImages.length === 0) {
      toast.error('Please select at least one image to delete.');
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete these images?');
  
    if (confirmDelete) {
      const apiUrl = "http://localhost:3001/api/admin/cphoto/deleteMany"; 
  
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ photoIds: selectedImages }), 
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to delete images");
          }
        })
        .then((data) => {

            toast.success('Images deleted successfully.');

            fetchOrderData();

        })
        .catch((error) => {
          console.error("Error while deleting images:", error);
          toast.error('An error occurred while deleting images.');
        });
    }
  };
  
  
  

  return (
    <Box m="20px">
      <Header title="ORDER PHOTOS" subtitle={`This is the photo list from Order: ${orderId}`} buttonLabel="Add photos" buttonLink={`/admin/cphotos/add`} />
      <Box m="20px 0 0 0" height="70vh">
        {isLoading ? ( 
          <CircularProgress />
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" mb={2}>
                <Checkbox
                  checked={selectedImages.length === orderRows.length}
                  onChange={toggleSelectAll}
                />
                <Button
                  variant="outlined"
                  onClick={handleDeleteSelected}
                  style={{ color: 'white', background: 'red' }}
                >
                  Delete Selected
                </Button>
              </Box>
            </Grid>
            {orderRows.length === 0 ? (
              <Typography style={{ padding: '20px' }} variant="h4">
                This order has no photos.
              </Typography>
            ) : (
              orderRows.map((row) => (
                <Grid item key={row._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="150"
                      width="150"
                      image={`http://localhost:3001/${row.path}`}
                      alt={`Photo ${row._id}`}
                    />
                    <CardContent>
                      <Checkbox
                        checked={selectedImages.includes(row._id)}
                        onChange={() => handleImageSelect(row._id)}
                      />
                      <Typography variant="subtitle1"></Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        )}
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default OrderPhotoList;
