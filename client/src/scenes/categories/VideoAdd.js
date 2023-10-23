import { Box, Button, TextField, FormControl, InputLabel, Input, CircularProgress } from "@mui/material";
import * as yup from "yup";
import React, { useState } from 'react';
import { Formik } from "formik";
import Header from "../../components/admin/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useAuthContext} from '../../hooks/useAuthContext'   

const VideoAdd = () => {
    const {user} = useAuthContext();

    const handleFormSubmit = async (values, { resetForm }) => {


        fetch("http://localhost:3001/api/admin/video", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(values),
          })
            .then((response) => {
              if (response.status === 200) {
                  resetForm();
                  toast.success('Video added!');
                return response.json();
              } else {
                
                return response.json().then((data) => {
                    toast.error('There was an error adding the video.');
                });
              }
            })
            .catch((error) => {
              console.error("Error during adding the video:", error);
            });
    };
    

    return (
        <Box m="10px">
            <Header title="ADD VIDEO" subtitle="Add a new video" />
            <Box m="30px 0 0 0">
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={videoSchema}
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
                                gridTemplateColumns="repeat(4, minmax(0, 1fr)"
                            >
                                 <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.name}
                                    name="name"
                                    error={!!touched.name && !!errors.name}
                                    helperText={touched.name && errors.name}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Iframe"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.iframe}
                                    name="iframe"
                                    error={!!touched.iframe && !!errors.iframe}
                                    helperText={touched.iframe && errors.iframe}
                                    sx={{ gridColumn: "span 4" }}
                                />
                            </Box>

                                <Box display="flex" justifyContent="end" mt="20px">
                                    <Button
                                        type="submit"
                                        color="secondary"
                                        variant="contained"
                                        onClick={handleSubmit}
                                    >
                                        Add video
                                    </Button>
                                </Box>
                        </form>
                    )}
                </Formik>
            </Box>
            <ToastContainer />
        </Box>
    );
};



const videoSchema = yup.object().shape({
    name: yup.string().required("required").min(2, "Name must be at least 2 characters long"),
    iframe: yup.string().required("required"),
  });
  
const initialValues = {
  name: "",
  iframe: "",
};

export default VideoAdd;

