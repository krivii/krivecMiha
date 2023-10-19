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
  Button, 
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
        console.log(faqData)
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
      item._id === id ? { ...item, question: newQuestion, answer: newAnswer } : item
    );
    setFAQData(updatedFAQ);
  };

  const deleteQuestion = (id) => {
    const updatedFAQ = faqData.filter((item) => item._id !== id);

        setFAQData(updatedFAQ);
  };

  const toggleEdit = (id) => {
    setEditingItem(id);
    const selectedItem = faqData.find((item) => item._id === id);
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
    console.log(isInvalid)
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
      <Header  title="FAQ manager" subtitle="Add, edit and delete Frequently Asked Questions" />
      <div style={{margin: "15px"}}></div>
      {faqData.map((item) => (
        <Accordion
            key={item._id}
            sx={{
            border: "none", 
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)", 
            borderRadius: "8px", 
            marginTop: "10px",
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
            {editingItem === item._id ? (
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
            {editingItem === item._id ? (
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
          {editingItem === item._id ? (
            <IconButton style={{ color: '#089B02' }} onClick={() => saveQuestion(item._id)}>Save</IconButton>
          ) : (
            <IconButton style={{ color: '#B5B5B5' }}  onClick={() => toggleEdit(item._id)}>Edit</IconButton>
          )}
          <IconButton style={{ color: '#D30C04' }} onClick={() => deleteQuestion(item._id)}>Delete</IconButton>
        </Accordion>
      ))}

      <label style={{color: "grey", fontSize: "20px", margin: "8px"}} htmlFor="">Fill out new FAQ</label>
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
      <Button
        onClick={addNewAccordion}
        color="success"
        variant="contained"

        sx={{

 
          "&:hover": {
            backgroundColor: "#4cb54f", 
          },
        }}
      >
        Add FAQ
      </Button>

      <Box display="flex" justifyContent="end" mt="20px">
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            onClick={handleSaveUpdates}>
            Save Updates
          </Button>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default FAQAdmin;