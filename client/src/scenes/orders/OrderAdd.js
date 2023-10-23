import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/admin/Header";
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useAuthContext} from '../../hooks/useAuthContext'   

const OrderAdd = () => {

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const [users, setUsers] = useState([]);
    const {user} = useAuthContext();

    const notifySuccess = () => {
        toast.success('Order added!', {
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


      const handleFormSubmit = (values, { resetForm }) => {
        fetch("http://localhost:3001/api/admin/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(values),
        })
          .then(async (response) => {
            if (response.status === 200) {
              resetForm();
              notifySuccess();
              return response.json();
            } 
            else {
              const data = await response.json();
              if (response.status === 400) {
                toast.error('Order with the same name already exists.');
              } else {
                notifyError(data.error);
              }
              return data;
            }
          })
          .catch((error) => {
            console.error("Error: ", error);
          });
      };
      



      useEffect(() => {

        fetch("http://localhost:3001/api/admin/user", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setUsers(data.reverse());
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
            
          });
      }, []);

      const initialValues = {
        name: "",
        status: "active",
        date: formattedDate,
      };
      
      

  return (

    <Box m="20px">
        <Header title="CREATE ORDER" subtitle="Create a new order" />
        <Box m="30px 0 0 0">
            <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={orderSchema}
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
                <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 4" }}>
                  <InputLabel htmlFor="orderOwner">Customer</InputLabel>
                  <Select
                    label="orderOwner"
                    value={values.orderOwner}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="orderOwner"
                    
                  >
                    {users.map((user) => (
                        <MenuItem value={user.email}>
                            {user.email}
                        </MenuItem>
                    ))}

                  </Select>
                </FormControl>
                
                <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 4" }}>
                  <InputLabel htmlFor="status">Status</InputLabel>
                  <Select
                    label="Status"
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="status"
                    error={!!touched.status && !!errors.status}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                    fullWidth
                    variant="filled"
                    type="date" 
                    label="Date of the event"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.date}
                    name="date"
                    error={!!touched.date && !!errors.date}
                    helperText={touched.date && errors.date}
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
                  Create new order
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

const orderSchema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters long"),
    status: yup.string().required("Status is required"),
    orderOwner: yup.string().required("Customer is required"),
    date: yup.date().required("Date is required")
  });
  
  
  

  

export default OrderAdd;

