import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/admin/Header";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserEdit = () => {

  const { userId } = useParams();
  
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const notifySuccess = () => {
    toast.success('User edited!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  const notifyError = (error) => {
    toast.error(error, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  // Replace 'http://localhost:3001/api/admin/user/:userid' with the actual endpoint
  const fetchUserData = async () => {
    try {
        const response = await fetch(`http://localhost:3001/api/admin/user/${userId}`); // Replace with the actual endpoint
      if (response.ok) {
        const data = await response.json();
        setUserData(data.user);
        setLoading(false);
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  
  const initialValues = {
    name: userData.name,
    email: userData.email,
    role: userData.role
  
  };

  const handleFormSubmit = async (values) => {
    try {
      // Send the updated user data as a JSON body to the server
      const response = await fetch(`http://localhost:3001/api/admin/user/${userId}`, {
        method: "PUT", // Assuming you are using PUT to update the user
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.status === 200) {
        notifySuccess();
      } 
      if (response.status === 409){        
            notifyError("Email already exists.");
          
      }
    } catch (error) {
      console.error("Error during user update:", error);
    }
  };

  return (
    <Box m="20px">
      <Header title="EDIT USER" subtitle="Edit user profile" />
      {loading ? (
        <div>Loading user data...</div>
      ) : (
        <Box m="30px 0 0 0">
          <Formik
            enableReinitialize // Allows initialValues to be updated
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={userSchema}
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
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 4" }}>
                    <InputLabel htmlFor="role">Role</InputLabel>
                    <Select
                      label="Role"
                      value={values.role}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="role"
                      error={!!touched.role && !!errors.role}
                    >
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="manager">Manager</MenuItem>
                      <MenuItem value="customer">Customer</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    Update User
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      )}
      <ToastContainer />
    </Box>
  );
};

const userSchema = yup.object().shape({
  name: yup.string().required("required").min(2, "Name must be at least 2 characters long"),
  email: yup.string().email("invalid email").required("required")
});



export default UserEdit;
