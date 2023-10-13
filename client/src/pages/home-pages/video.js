import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from "framer-motion";
import { pageAnimation, fadeAnim, lineAnim } from "../../animation";

const Video = () => {
    const [videoData, setVideoData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/api/admin/video`)
          .then((response) => response.json())
          .then((data) => {           
            setVideoData(data);
          })
          .catch((error) => {
            console.error('Error fetching video data:', error);
          });
      }, []);

  if (videoData.length === 0) {

    return <div>Loading...</div>;
  }

  return (
    <StyledWork
      variants={pageAnimation}
      initial="hidden"
      animate="show"
      exit="exit"
      style={{ background: "#E8DFC2" }}
    >
      {videoData.map((video) => (
        <StyledCategory key={video._id}>
          <motion.h2 variants={fadeAnim}>{video.name}</motion.h2>
          <motion.div variants={lineAnim} className="line"></motion.div>
          <div>
            <iframe
              src={video.iframe}
              title="YouTube video player"
              frameBorder="0"
              className="video-iframe"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </StyledCategory>
      ))}
    </StyledWork>
  );
};

const StyledWork = styled(motion.div)`
  min-height: 100vh;
  overflow: hidden;
  padding: 5rem 10rem;

  @media (max-width: 1300px) {
    padding: 2rem 2rem;
  }

  h2 {
    padding: 1rem 0;
  }
`;

const StyledCategory = styled(motion.div)`
  padding-bottom: 10rem;

  .line {
    height: 0.5rem;
    background: #800080;
    margin-bottom: 3rem;
  }

  .video-iframe {
    width: 100%;
    height: 70vh;
  }

  button {
    margin-top: 1rem;
    background: #800080;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
`;

export default Video;

