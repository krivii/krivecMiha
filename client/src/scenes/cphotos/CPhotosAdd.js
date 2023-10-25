//Spletna aplikacija za fotografe/ Web application for photographers

//Copyright (C) 2023  Luka Krivec (lk2378@student.uni-lj.si). Licensed under the GPL-3.0 or later.

import React, { useEffect, useState } from 'react';
import { Box, Button, Select, MenuItem, FormControl, InputLabel, Input,CircularProgress  } from "@mui/material";
import { Formik, Field } from "formik";
import * as yup from "yup";
import Header from "../../components/admin/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useAuthContext} from '../../hooks/useAuthContext'   

const CPhotosAdd = () => {
  const [orders, setOrders] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileSelected, setFileSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const {user} = useAuthContext();

  useEffect(() => {
    fetch("http://localhost:3001/api/admin/order", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {        
        setOrders(data.reverse());
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const handleFileChange = (event) => {
    
    const files = Array.from(event.currentTarget.files);
    setSelectedFiles(files);
    setFileSelected(true); 
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    if (selectedFiles.length === 0) {
      toast.error("Please select at least one photo to upload.");
      return;
    }

    setLoading(true); 

    const formData = new FormData();
    formData.append("order", values.order);
    selectedFiles.forEach((file) => {
      formData.append("photos", file);
    });

    try {
      const response = await fetch("http://localhost:3001/api/admin/cphoto", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Server Response:", data);
        resetForm();
        toast.success("Photos uploaded successfully!");
        setFileSelected(false);
      } else {
        throw new Error("Error uploading photos.");
      }
    } catch (error) {
      console.error("Error uploading photos:", error);
      toast.error("Error uploading photos. Please try again.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Box m="10px">
      <Header title="ADD PHOTOS" subtitle="Add photos to existing orders" />
      <Box m="30px 0 0 0">
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={photoSchema}
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
             <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 4" }}>
                  <InputLabel htmlFor="order">Order</InputLabel>
                  <Select
                    label="order"
                    value={values.order}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="order"
                  >
                    {orders.map((order) => (
                      <MenuItem key={order._id} value={order._id}>
                        {order.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.order && touched.order && (
                    <div style={{ color: "red" }}>{errors.order}</div>
                  )}
                </FormControl>

                <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 4" }}>
                    <InputLabel htmlFor="photos"></InputLabel>
                    <Input
                        type="file"
                        name="photos"
                        id="photos"
                        onChange={handleFileChange}
                        inputProps={{ multiple: true, accept: "image/*" }}  
                        sx={{ display: 'none' }}
                    />
                    <label htmlFor="photos">
                        <Button
                        component="span"
                        variant="outlined"
                        color="primary"
                        >
                        {fileSelected ? `${selectedFiles.length} files selected` : "Upload Photos"}
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
                    Add photos
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

const photoSchema = yup.object().shape({
    order: yup.string().required("Order is required"),
});

const initialValues = {
  order: "",
};

export default CPhotosAdd;
