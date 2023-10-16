import React, { useEffect, useState } from 'react';
import Header from '../../components/admin/Header';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ImageList = () => {


    const [photoRows, setphotoRows] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/api/admin/pphoto/`)
          .then((response) => response.json())
          .then((data) => {           
            setphotoRows(data);
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
      }, []);


    const handleFileChange = async (event, photoId, photoName) => {

        const file = event.currentTarget.files[0];

        if (!file) return; // No file selected, do nothing

        const formData = new FormData();
        // append to formdata row.name
        formData.append('photo', file);
        formData.append('name', photoName);

        try {
        const response = await fetch(`http://localhost:3001/api/admin/pphoto/${photoId}`, {
            method: 'PUT',
            body: formData,
        });

        if (response.status === 200) {
            toast.success('Image changed!');
            window.location.reload();
        } else {
            toast.error('Error uploading image');
            console.error(`Error uploading image `);
        }
        } catch (error) {
            toast.error('Error uploading image');
            console.error(`Error uploading image `, error);
        }
  };

  return (
    <Box m="20px">
      <Header
        title="PAGE IMAGES"
        subtitle="Edit images on your page"
      />
      <Box m="20px 0 0 0" height="70vh">
        <Grid container spacing={2}>
          {photoRows.map((row) => (
            <Grid item key={row._id} xs={12} sm={12} md={6} lg={6} xl={4}>
              <Card style={{ width: '300px', height: '85%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', margin: '10px' }}>
                <CardContent style={{  background: '#800080', color: "white" , height: '60px' }}>
                  <Box
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                    }}
                  >
                    <Typography variant="h7">{row.name}</Typography>
                  </Box>
                </CardContent>
                <CardMedia
                  component="img"
                  height="200"
                  width="100%"
                  image={`http://localhost:3001/${row.path}`}
                  alt={row.name}
                />
                <CardContent style={{ display: 'flex', justifyContent: 'center' }}>
                <input
                    type="file"
                    name={`photo${row._id}`}
                    id={`photo${row._id}`}
                    onChange={(e) => handleFileChange(e, row._id, row.name)}
                    accept="image/*"
                    style={{ display: 'none' }}
                    />
                    <label htmlFor={`photo${row._id}`}>
                    <Button component="span" variant="outlined" color="primary">
                        Change image
                    </Button>
                    </label>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ImageList;
