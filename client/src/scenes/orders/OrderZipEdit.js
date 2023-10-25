//Spletna aplikacija za fotografe/ Web application for photographers

//Copyright (C) 2023  Luka Krivec (lk2378@student.uni-lj.si). Licensed under the GPL-3.0 or later.

import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, FormControl, InputLabel, Input,CircularProgress  } from "@mui/material";
import { Formik, Field } from "formik";
import * as yup from "yup";
import Header from "../../components/admin/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useAuthContext} from '../../hooks/useAuthContext'
import { useParams } from 'react-router-dom';   

const OrderZipAdd = () => {
  const [order, setOrder] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileSelected, setFileSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const {user} = useAuthContext();
  const [zipFileText, setZipFileText] = useState("");
  const { orderId } = useParams();

  const zipFileName = order.zip ? order.zip.split('/').pop() : null;

  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchOrderData = async () => {
    fetch(`http://localhost:3001/api/admin/order/${orderId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {        
        setOrder(data.order);
        const zipFileName = data.order.zip ? data.order.zip.split('/').pop() : null;
        setZipFileText(zipFileName ? `Order has a zip file: ${zipFileName}` : "There are no zip files for this order.");
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
    };

  const handleFileChange = (event) => {
    
    const files = Array.from(event.currentTarget.files);
    setSelectedFiles(files);
    setFileSelected(true); 
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    if (selectedFiles.length === 0) {
      toast.error("Please select at least one file to upload.");
      return;
    }

    setLoading(true); 

    const formData = new FormData();
    formData.append("order", orderId);
    formData.append("zipName", values.zipName);
    formData.append("zip", selectedFiles[0]);

    try {
      const response = await fetch(`http://localhost:3001/api/admin/order/zip`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Server Response:", data);
        resetForm();
        toast.success("Folder uploaded successfully!");
        setFileSelected(false);
        fetchOrderData();
      } else {
        throw new Error("Error uploading the folder.");
      }
    } catch (error) {
      console.error("Error uploading the folder:", error);
      toast.error("Error uploading the folde. Please try again.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Box m="10px">
      <Header title="EDIT ZIP" subtitle={`Add or edit zip folder for Order: ${orderId}`} />
      <Typography
        variant="h5"  // Adjust the variant to set the text size
        sx={{
            marginTop: "20px",
            border: "1px solid #800080", // Add a border with your preferred style and color
            borderRadius: "5px",       // Add rounded corners for a modern look
            padding: "10px",          // Add padding for spacing
            backgroundColor: "#C6B3C6", // Add a background color for the text
        }}
        >
        {zipFileText}
        </Typography>

      <Box m="30px 0 0 0">
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={zipSchema}
          sx={{ marginTop: "50px" }}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              >
             <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Folder name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.zipName}
                    name="zipName"
                    error={!!touched.zipName && !!errors.zipName}
                    helperText={touched.zipName && errors.zipName}
                    sx={{ gridColumn: "span 4" }}
                />

                <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 4" }}>
                    <InputLabel htmlFor="zip"></InputLabel>
                    <Input
                        type="file"
                        name="zip"
                        id="zip"
                        onChange={handleFileChange}
                        inputProps={{ accept: ".zip" }}  // Set accept to only allow .zip files
                        sx={{ display: 'none' }}
                    />
                    <label htmlFor="zip">
                        <Button
                        component="span"
                        variant="outlined"
                        color="primary"
                        >
                        {fileSelected ? `${selectedFiles.length} file selected` : "Upload folder"}
                        </Button>
                    </label>
                </FormControl>

              </Box>
              {loading ? ( 
                <Box display="flex" justifyContent="center">
                  <CircularProgress />
                </Box>
              ) : (
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    Save updates
                  </Button>
                </Box>
              )}
            </form>
          )}
        </Formik>
      </Box>
      <ToastContainer />
    </Box>
  );
};

const zipSchema = yup.object().shape({
    zipName: yup.string().required("Folder name is required."),
});

const initialValues = {
    zipName: "",
};

export default OrderZipAdd;
