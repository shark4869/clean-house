import React from 'react'
import { Box } from "@mui/material";
import image404 from '../../assets/images/page-not-found.jpg'


const PageNotFound = () => {
  return (
            <Box sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                backgroundColor: "#f8fcff"
            }}>
                <img src={image404} alt="Page Not Found" height={"100%"}/>
            </Box>
  )
}

export default PageNotFound