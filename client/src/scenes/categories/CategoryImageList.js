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

const CategoryImageList = () => {
  const { categoryId } = useParams();
  const {user} = useAuthContext();
  const [categoryImages, setCatImages] = useState([]);
  const [categoryName, setCatName] = useState();
  const [categoryCover, setCatCover] = useState();
  const [selectedImages, setSelectedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCatData();
  }, []);

  const fetchCatData = async () => {
    fetch(`http://localhost:3001/api/admin/category/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data", data);
        setCatImages(data.category.photos.filter(image => image !== data.category.cover));
        setCatName(data.category.name);
        setCatCover(data.category.cover);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching category data:', error);
      });
    };

  const toggleSelectAll = () => {
    if (selectedImages.length === categoryImages.length) {
      setSelectedImages([]);
    } else {
      setSelectedImages(categoryImages);
    }
  };

  const handleImageSelect = (image) => {
    if (selectedImages.includes(image)) {
      setSelectedImages(selectedImages.filter((selectedImage) => selectedImage !== image));
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  };

  const makeCoverPhoto = (image) => {
    const newCover = image;
    

    const data = new FormData();
    data.append('newCover', newCover);
  
    fetch(`http://localhost:3001/api/admin/category/changeCover/${categoryId}`, {
      method: 'PUT',
      body: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to update cover image');
        }
      })
      .then((data) => {
        toast.success('Cover image updated successfully');
        fetchCatData();
      })
      .catch((error) => {
        console.error('Error while deleting images:', error);
        toast.error('An error occurred while deleting images.');
      });
  };
  

  const handleDeleteSelected = () => {
    if (selectedImages.length === 0) {
      toast.error('Please select at least one image to delete.');
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete these images?');

    if (confirmDelete) {
      const apiUrl = `http://localhost:3001/api/admin/category/imageEdit/${categoryId}`;

      fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ images: selectedImages, categoryId: categoryId }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to delete images');
          }
        })
        .then((data) => {
          toast.success('Images deleted successfully');
          fetchCatData();
        })
        .catch((error) => {
          console.error('Error while deleting images:', error);
          toast.error('An error occurred while deleting images.');
        });
    }
  };

  return (
    <Box m="20px">
      <Header
        title="CATEGORY IMAGES"
        subtitle={`These are the images from category: ${categoryName}`}
        buttonLabel="Edit category"
        buttonLink={`/admin/categories/edit/${categoryId}`}
      />
      <Box m="20px 0 0 0" height="70vh">
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Box>
            {categoryCover && (
              <Box mt={2} mb={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="150"
                        width="100%"
                        image={`http://localhost:3001/${categoryCover}`}
                        alt={categoryCover}
                      />
                     <CardContent style={{ background: '#800080', color: "white" }}>
                      <Box
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          padding: '10px',
                        }}
                      >
                        <Typography variant="h7">Cover image</Typography>
                      </Box>
                    </CardContent>

                    </Card>
                  </Grid>
                </Grid>
              </Box>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Checkbox
                    checked={selectedImages.length === categoryImages.length}
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
              {categoryImages.length === 0 ? (
                <Typography style={{ padding: '20px' }} variant="h4">
                  This category has no other images.
                </Typography>
              ) : (
                categoryImages.map((image) => (
                  <Grid item key={image} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="150"
                        width="100%"
                        image={`http://localhost:3001/${image}`}
                        alt={image}
                      />
                      <CardContent>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                          <Box display="flex" alignItems="center">
                            <Checkbox
                              checked={selectedImages.includes(image)}
                              onChange={() => handleImageSelect(image)}
                            />
                            <Typography variant="subtitle1"></Typography>
                          </Box>
                          <Button
                            variant="outlined"
                            size="small" 
                            onClick={() => makeCoverPhoto(image)}
                          >
                            Make Cover
                          </Button>

                        </Box>
                      </CardContent>

                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        )}
      </Box>

      <ToastContainer />
   

    </Box>
  );
};

export default CategoryImageList;