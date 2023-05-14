import  { useState, useEffect } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {IconButton} from "@mui/material";

const GoToTop = () => {
  const [showButton, setShowButton] = useState(false);
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setShowButton(scrollTop > 300); // show the button when user scrolls down more than 300px
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {showButton && (
        <IconButton onClick={handleClick}  sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            color: "#fff",
            backgroundColor: "#CF881D",
            ":hover": {
                backgroundColor: "#CF881D"
            }
        }} >
          <ExpandLessIcon fontSize="large" />
        </IconButton>
      )}
    </>
  );
};

export default GoToTop;