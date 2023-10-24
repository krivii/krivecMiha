
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLeftLong, 
  faRightLong, 
  faCircleXmark
} from '@fortawesome/free-solid-svg-icons';
import {useAuthContext} from '../hooks/useAuthContext'  
import './Gallery.css';



const Gallery = () => {
    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const {user} = useAuthContext();

    const handleOpen = (index) => {
        setSlideNumber(index);
        setOpen(true);
      }

    const handleClose = () => {
        setOpen(false)
    }

    const prev = () => {
        slideNumber === 0 
        ? setSlideNumber( galleryImages.length -1 ) 
        : setSlideNumber( slideNumber - 1 )
    }

    const next = () => {
        slideNumber + 1 === galleryImages.length 
        ? setSlideNumber(0) 
        : setSlideNumber(slideNumber + 1)
      }

      const downloadZip = () => {
        fetch('http://localhost:3001/api/admin/order/zip', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.blob();
                } else {
                    console.error('Error downloading the file.');
                }
            })
            .then((blob) => {
                // Create a Blob URL for the downloaded file
                const url = window.URL.createObjectURL(blob);
                // Create an anchor element for triggering the download
                const a = document.createElement('a');
                a.href = url;
                a.download = 'sampleDOWNLOAD.zip'; // Replace with the desired file name
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error('Error downloading the file:', error);
            });
    };
    

    return (
        <div className='base'>
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
              {
                galleryImages && galleryImages.map((slide, index) => {
                    return(
                    <div 
                        className='single' 
                        key={index}
                        onClick={ () => handleOpen(index) }
                    >
                        <img src={slide.img} alt='' />
                    </div>
                    )
                })
              }
            </div>                                                                         
        </div>
       
    )
}





const galleryImages = [
    {
      img: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      img: "https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      img: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      img: "https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      img: "https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      img: "https://images.pexels.com/photos/1712/sunglasses-apple-iphone-desk.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
    img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1883&q=80"
    },
    {
    img: "https://plus.unsplash.com/premium_photo-1671616724629-c2fa8455c28f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
    },
    {
    img: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
    },
    {
    img: "https://images.unsplash.com/photo-1549849171-09f62448709e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
        img: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      {
        img: "https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        img: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        img: "https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        img: "https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        img: "https://images.pexels.com/photos/1712/sunglasses-apple-iphone-desk.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
      img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1883&q=80"
      },
      {
      img: "https://plus.unsplash.com/premium_photo-1671616724629-c2fa8455c28f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
      },
      {
      img: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
      },
      {
      img: "https://images.unsplash.com/photo-1549849171-09f62448709e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      }
  ]

  export default Gallery;