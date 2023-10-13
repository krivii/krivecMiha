import React, { useEffect, useState } from 'react';
import {
  Box,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Input,
  Button, // Add Button from Material-UI
} from "@mui/material";
import Header from "../../components/admin/Header";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FAQAdmin = () => {
  const [faqData, setFAQData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/admin/faq/`)
      .then((response) => response.json())
      .then((data) => {           
        setFAQData(data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);


  // State to track the currently edited FAQ item and edited question/answer
  const [editingItem, setEditingItem] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState("");
  const [editedAnswer, setEditedAnswer] = useState("");

  // State to handle the new FAQ item
  const [newFAQItem, setNewFAQItem] = useState({
    question: "",
    answer: "",
  });

  const editQuestion = (id, newQuestion, newAnswer) => {
    const updatedFAQ = faqData.map((item) =>
      item.id === id ? { ...item, question: newQuestion, answer: newAnswer } : item
    );
    setFAQData(updatedFAQ);
  };

  const deleteQuestion = (id) => {
    const updatedFAQ = faqData.filter((item) => item.id !== id);
    setFAQData(updatedFAQ);
  };

  const toggleEdit = (id) => {
    setEditingItem(id);
    const selectedItem = faqData.find((item) => item.id === id);
    setEditedQuestion(selectedItem.question);
    setEditedAnswer(selectedItem.answer);
  };

  const saveQuestion = (id) => {
    editQuestion(id, editedQuestion, editedAnswer);
    setEditingItem(null);
  };

  const addNewAccordion = () => {
    const newId = Date.now(); 
    setFAQData([...faqData, { id: newId, ...newFAQItem }]);
    setNewFAQItem({
      question: "",
      answer: "",
    });
  };

  const handleSaveUpdates = async () => {
    const isInvalid = faqData.some((item) => !item.question || !item.answer);
  
    if (isInvalid) {
      toast.error("Some FAQ items have empty questions or answers.");
    } else {
      try {
        const response = await fetch('http://localhost:3001/api/admin/faq', {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(faqData), 
        });
  
        if (!response.ok) {
          throw new Error('Failed to update FAQ data');
        }
  
        toast.success("Updates saved!");
      } catch (error) {
        console.error('Error updating FAQ data', error);
      }
    }
  };
  
       
  
  return (
    <Box m="20px" display="flex" flexDirection="column">
      <Header title="FAQ manager" subtitle="Add, edit and delete Frequently Asked Questions" />
      <Box mt={2} alignSelf="flex-end" margin={"10px 0"}>
        <Button 
            variant="contained" 
            sx={{
                backgroundColor: 'rgb(200, 150, 243)', 
                color: 'white', 
                '&:hover': {
                backgroundColor: 'rgb(180, 101, 192)', 
                },
            }}
            onClick={handleSaveUpdates}>
            Save Updates
        </Button>
      </Box>

  
      {faqData.map((item) => (
        <Accordion
            key={item.id}
            sx={{
            border: "none", 
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)", 
            borderRadius: "8px", 
            marginBottom: "16px",
            color: "white",
            background: "#484848" 
            }}
        >
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}
            sx={{
                padding: "3px", 
                borderBottom: "1px solid white", 
            }}
          >
            {editingItem === item.id ? (
              <Input
                value={editedQuestion}
                onChange={(e) => setEditedQuestion(e.target.value)}
                autoFocus
                sx={{
                    padding: "0 10px",
                    fontStyle: "oblique",
                    width: "40%", color: "white"                
                    }}
              />
            ) : (
              <Typography 
              sx={{
                padding: "0 10px",
                fontStyle: "oblique" 
                               
                }}
                variant="h5"
            >{item.question}</Typography>
            )}
          </AccordionSummary>
          <AccordionDetails
          sx={{
            padding: "20px",
            borderBottom: "1px solid white"
          }}
          >
            {editingItem === item.id ? (
              <Input
                multiline
                fullWidth
                value={editedAnswer}
                onChange={(e) => setEditedAnswer(e.target.value)}
                style={{color: "white"}}
              />
            ) : (
              <Typography >{item.answer}</Typography>
            )}
          </AccordionDetails>
          {editingItem === item.id ? (
            <IconButton style={{ color: '#089B02' }} onClick={() => saveQuestion(item.id)}>Save</IconButton>
          ) : (
            <IconButton style={{ color: '#B5B5B5' }}  onClick={() => toggleEdit(item.id)}>Edit</IconButton>
          )}
          <IconButton style={{ color: '#D30C04' }} onClick={() => deleteQuestion(item.id)}>Delete</IconButton>
        </Accordion>
      ))}
  
    
    <label style={{color: "grey", fontSize: "20px", margin: "8px"}} htmlFor="">Add new FAQ</label>
      <Accordion
        sx={{
            border: "none", 
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)", 
            borderRadius: "8px", 
            marginBottom: "16px",

            }}
      >
        
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Input
            value={newFAQItem.question}
            onChange={(e) =>
              setNewFAQItem({ ...newFAQItem, question: e.target.value })
            }
            autoFocus
          />
        </AccordionSummary>
        <AccordionDetails>
          <Input
            multiline
            fullWidth
            value={newFAQItem.answer}
            onChange={(e) =>
              setNewFAQItem({ ...newFAQItem, answer: e.target.value })
            }
          />
        </AccordionDetails>
      </Accordion>
      <Box mt={2} alignSelf="flex-end">
      <Button
            onClick={addNewAccordion}
            variant="contained" 
            sx={{
                backgroundColor: 'rgb(33, 150, 243)', 
                color: 'white', 
                '&:hover': {
                backgroundColor: 'rgb(21, 101, 192)', 
                },
            }}
            >
            Add FAQ
        </Button>
        </Box>
        <ToastContainer />
    </Box>
  );
  };
  
  export default FAQAdmin;
  

 