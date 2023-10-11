import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/admin/Header";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderEdit = () => {

  const { orderId } = useParams();
  
  const [orderData, setOrderData] = useState({});
  const [loading, setLoading] = useState(true);
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  const [orderPhotos, setOrderPhotos] = useState([]);

  const [users, setUsers] = useState([]);

  

  useEffect(() => {

    fetch("http://localhost:3001/api/admin/user")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);          })
      .catch((error) => {
        console.error("Error fetching users:", error);
        
      });
  }, []);

  const notifySuccess = () => {
    toast.success('Order edited!', {
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


  const fetchOrderData = async () => {
    try {
        const response = await fetch(`http://localhost:3001/api/admin/order/${orderId}`); 
      if (response.ok) {
        const data = await response.json();
        setOrderData(data.order);
        setLoading(false);
      } else {
        throw new Error('Failed to fetch order data');
      }
    } catch (error) {
      console.error('Error fetching order data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);
  
  const initialValues = {
    name: orderData.name,
    orderOwner: orderData.orderOwner,
    status: orderData.status,
    date: formattedDate
  
  };

  const handleFormSubmit = async (values) => {
    try {
      
      if (values.status === "completed") {
        const selectedImages = orderData.photos;
        if (selectedImages.length > 0) {

          if (confirm('Are you sure you want to change the order status to "Completed". By doing so, you will delete all photos related to this order.')) {
            const apiUrl = "http://localhost:3001/api/admin/cphoto/deleteMany";
            console.log("Poslal fetch")
            fetch(apiUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ photoIds: selectedImages }), // Send selected image IDs in the request body
            })
              .then((response) => {
                if (response.ok) {
                  return response.json();
                } else {
                  throw new Error("Failed to delete images");
                }
              })
              .then((data) => {
  
                  window.location.reload();
  
              })
              .catch((error) => {
                console.error("Error while deleting images:", error);
                toast.error('An error occurred while deleting images.');
              });
          }       
        }
        
      }
      
      const response = await fetch(`http://localhost:3001/api/admin/order/${orderId}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.status === 200) {
        notifySuccess();
      } 
      if (response.status === 409){        
            notifyError("Order name already exists.");
          
      }
    } catch (error) {
      console.error("Error during order update:", error);
    }
  };

  return (
    <Box m="20px">
      <Header title="EDIT ORDER" subtitle="Edit order profile" buttonLabel="Add photos" buttonLink="/admin/cphotos/add" />
      {loading ? (
        <div>Loading order data...</div>
      ) : (
        <Box m="30px 0 0 0">
          <Formik
            enableReinitialize 
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

                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    Update order
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

const orderSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters long"),
  status: yup.string().required("Status is required"),
  orderOwner: yup.string().required("Customer is required"),
  date: yup.date().required("Date is required")
});


export default OrderEdit;
