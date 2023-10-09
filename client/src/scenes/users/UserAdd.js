import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/admin/Header";
import React, { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserAdd = () => {

    const notifySuccess = () => {
        toast.success('User added!', {
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


      const handleFormSubmit = (values,  { resetForm }) => {
        // Send the form data as a JSON body to the server
        fetch("http://localhost:3001/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((response) => {
            if (response.status === 200) {
                resetForm();
              notifySuccess();
              return response.json();
            } else {
              
              return response.json().then((data) => {
                notifyError(data.error);
              });
            }
          })
          .catch((error) => {
            console.error("Error during registration:", error);
          });
      };
      

  return (

    <Box m="20px">
        <Header title="CREATE USER" subtitle="Create a new user profile" />
        <Box m="30px 0 0 0">
            <Formik
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
                <TextField
                    fullWidth
                    variant="filled"
                    type="password" 
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password" 
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                    fullWidth
                    variant="filled"
                    type="password" 
                    label="Repeat password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.re_password}
                    name="re_password" 
                    error={!!touched.re_password && !!errors.re_password}
                    helperText={touched.re_password && errors.re_password}
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
                  Create New User
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

const userSchema = yup.object().shape({
    name: yup.string().required("required").min(2, "Name must be at least 2 characters long"),
    email: yup.string().email("invalid email").required("required"),
    password: yup
      .string()
      .required("required")
      .min(8, "Password must be at least 8 characters long"),
    re_password: yup
      .string()
      .required("required")
      .oneOf([yup.ref("password"), null], "Passwords don't match"),
  });
  
const initialValues = {
  name: "",
  email: "",
  password: "",
  re_password: "",
  role: "customer"

};

export default UserAdd;

