import React, { useEffect  } from 'react';
import { fetchBaner } from '../../features/HomeContent/HomeAPI';
import {useSelector, useDispatch  } from 'react-redux';
import { Box, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { StyledFillButton } from '../Button/Button';

const Baner = () => {
    const dispatch = useDispatch();
     useEffect(() => {
        dispatch(fetchBaner())
    }, [dispatch]);
    const { banner } = useSelector(state => state.home);
    const bannerImage = banner ? banner.find((item) => item.active === 1) : null
   
  return (
    <Box className="banner"
    sx={{
    backgroundImage: `url(${bannerImage && bannerImage.image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '600px',
    position: 'relative'
  }}
    >
       <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.3)', 
          
        }}
      ></Box>
      <Container maxWidth="lg" sx={{display: 'flex', alignItems: 'center'}}>
        <Box sx={{margin: '100px auto', display: 'flex' , alignItems: 'center', flexDirection: 'column', gap: '50px 0'}}>
            <Typography  variant="h3"  sx={{ color:"#fff", textAlign: "center", fontWeight: 'medium',display: 'block', 
            width: {xs: '100%', sm: '500px'}, zIndex: 10, lineHeight: 1.5}}>
                            DỊCH VỤ VỆ SINH NHÀ Ở, THƯƠNG MẠI CHUYÊN NGHIỆP
            </Typography>
            <StyledFillButton sx={{fontSize: '20px'}}>
              <Link to={"/service"}>Thử ngay</Link>
            </StyledFillButton>
        </Box>
      </Container>
    </Box>
  );
};
export default Baner;
