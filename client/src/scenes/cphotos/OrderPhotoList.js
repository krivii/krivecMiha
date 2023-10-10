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
} from '@mui/material';
import { useParams } from 'react-router-dom';

const OrderPhotoList = () => {
  const { orderId } = useParams();

  const [orderRows, setOrderRows] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 10,
    page: 0,
  });

  useEffect(() => {
    fetch(`http://localhost:3001/api/admin/cphoto/orderPhotos/${orderId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOrderRows(data);
      })
      .catch((error) => {
        console.error('Error fetching order data:', error);
      });
  }, []);

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
      return; // No images selected, do nothing
    }

    // Confirmation dialog
    const confirmDelete = window.confirm('Are you sure you want to delete these images?');

    if (confirmDelete) {
      console.log('Selected Image IDs:', selectedImages);
      // Implement the delete logic here using selectedImages array
    }
  };

  return (
    <Box m="20px">
      <Header title="ORDER PHOTOS" subtitle={`This is the photo list from order: ${orderId}`} />
      <Box m="20px 0 0 0" height="70vh">
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
                style={{ color: 'white', background: 'red' }} // Add red color to the delete button
              >
                Delete Selected
              </Button>
            </Box>
          </Grid>
          {orderRows.map((row) => (
            <Grid item key={row._id} xs={12} sm={6} md={4} lg={3} xl={2}>
              <Card>
                <CardMedia
                  component="img"
                  height="150"
                  width="150"
                  image={`http://localhost:3001/${row.path.replace(/\\/g, '/').split('uploads/')[1]}`}
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
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default OrderPhotoList;
