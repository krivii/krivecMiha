import React, { useEffect, useState } from 'react';
import { Box, Typography, Button  } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLeftLong, 
  faRightLong, 
  faCircleXmark
} from '@fortawesome/free-solid-svg-icons';
import { useAuthContext } from '../hooks/useAuthContext';  
import './Gallery.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Gallery = () => {
    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const { user } = useAuthContext();
    const [photos, setPhotos] = useState([]);
    const [zip, setZip] = useState();
    const [loading, setLoading] = useState(true);

    const handleOpen = (index) => {
        setSlideNumber(index);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const prev = () => {
        slideNumber === 0 
        ? setSlideNumber(galleryImages.length - 1) 
        : setSlideNumber(slideNumber - 1);
    }

    const next = () => {
        slideNumber + 1 === galleryImages.length 
        ? setSlideNumber(0) 
        : setSlideNumber(slideNumber + 1);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        if (user && user.token) {
            fetch('http://localhost:3001/api/admin/order/gallery', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setPhotos(data.allphotos);
                    setZip(data.firstzip);
                    setLoading(false);

                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    setLoading(false);
                });
        } else {
            console.error('User is not authenticated.');
            setLoading(false);
        }
    };

    const downloadZip = () => {
        if (zip !== null) {
            fetch('http://localhost:3001/api/admin/order/zip', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${user.token}`,
              },
              body: JSON.stringify({ zip }),
            })
                .then((response) => {
                    if (response.status === 200) {
                        return response.blob();
                    } else {
                        console.error('Error downloading the file.');
                    }
                })
                .then((blob) => {
                    if (blob) {
                        // Create a Blob URL for the downloaded file
                        const url = window.URL.createObjectURL(blob);
                        // Create an anchor element for triggering the download
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = zip.split('/').pop(); // Replace with the desired file name
                        a.click();
                        window.URL.revokeObjectURL(url);
                    }
                })
                .catch((error) => {
                    console.error('Error downloading the file:', error);
                });
        } else {
            toast.error('Download folder not available. Please contact admin.');
        }
    };

    return (
        <Box>
            <div className='base'>
                {loading ? (
                    // Display a loading message or spinner while fetching data
                    <p>Loading...</p>
                ) : photos.length > 0 ? (
                    // Display the gallery if photos are available
                    <>
                        {open && 
                            <div className='sliderWrap'>
                                <FontAwesomeIcon icon={faCircleXmark} className='btnClose' onClick={handleClose}  />
                                <FontAwesomeIcon icon={faLeftLong} className='btnPrev' onClick={prev} />
                                <FontAwesomeIcon icon={faRightLong} className='btnNext' onClick={next} />
                                <div className='fullScreenImage'>
                                    <img src={galleryImages[slideNumber].img} alt=''  />
                                </div>
                            </div>
                        } 
                        <button onClick={downloadZip}>DOWNLOAD</button>
                        <div className='galleryWrap'>
                            {photos.map((photo, index) => (
                                <div 
                                    className='single' 
                                    key={index}
                                    onClick={() => handleOpen(index)}
                                >
                                    <img src={photo} alt='' />
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                  <p style={{ color: 'grey' }}>
                  Don't see enough photos for your liking... or any at all?{' '}
                  <a href="/contact" >
                    Get in touch to order.
                  </a>
                </p>
                
                )}
            </div>
            <ToastContainer /> 
        </Box>
    );
};



export default Gallery;
