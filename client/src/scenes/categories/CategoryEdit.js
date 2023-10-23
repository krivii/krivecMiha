import React, { useEffect, useState } from 'react';
import Header from '../../components/admin/Header';
import { Box, Button, TextField, FormControl, InputLabel, Input, CircularProgress } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useAuthContext} from '../../hooks/useAuthContext'   

const CategoryEdit = () => {
  const { categoryId } = useParams();
  const [categoryData, setCatData] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileSelected, setFileSelected] = useState(false);
  const [loading, setLoading] = useState(true); 
  const {user} = useAuthContext();


  useEffect(() => {
    const fetchCatData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/admin/category/${categoryId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setCatData(data.category);
          setLoading(false); 
        } else {
          throw new Error('Failed to fetch category data');
        }
      } catch (error) {
        console.error('Error fetching category data:', error);
        setLoading(false); 
      }
    };

    fetchCatData();
  }, [categoryId]);


  const initialValues = loading
    ? { name: '', description: '' }
    : { name: categoryData.name, description: categoryData.description };

  const handleFileChange = (event) => {
    const files = Array.from(event.currentTarget.files);
    setSelectedFiles(files);
    setFileSelected(true);
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    setLoading(true);

    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("description", values.description);

    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch(`http://localhost:3001/api/admin/category/${categoryId}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log("Server Response:", data);
        resetForm();
        setFileSelected(false);
        toast.success('Category updated!');
      } else if (response.status === 409) {
        // Handle 409 status (Conflict) - Category with the same name or description already exists
        toast.error('Image with the same name already exists.');
      } else {
        throw new Error("Error updating category.");
      }
    } catch (error) {
      console.error("Error updating category.", error);
      toast.error("Error updating category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box m="20px">
      <Header title="EDIT CATEGORY" subtitle="Edit category profile" />
      {loading ? (
        <div>Loading category data...</div>
      ) : (
        <Box m="30px 0 0 0">
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={categorySchema}
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
                    label="Description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    name="description"
                    error={!!touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 4" }}>
                    <InputLabel htmlFor="images"></InputLabel>
                    <Input
                      type="file"
                      name="images"
                      id="images"
                      onChange={handleFileChange}
                      inputProps={{ multiple: true, accept: "image/*" }}
                      sx={{ display: 'none' }}
                    />
                    <label htmlFor="images">
                      <Button
                        component="span"
                        variant="outlined"
                        color="primary"
                      >
                        {fileSelected ? `${selectedFiles.length} files selected` : "Upload images"}
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
                      Update category
                    </Button>
                  </Box>
                )}
              </form>
            )}
          </Formik>
        </Box>
      )}
      <ToastContainer />
    </Box>
  );
};

const categorySchema = yup.object().shape({
  name: yup.string().required("required").min(2, "Name must be at least 2 characters long"),
  description: yup.string().required("required").min(10, "Name must be at least 10 characters long"),
});

export default CategoryEdit;
