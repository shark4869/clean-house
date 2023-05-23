import React from 'react';
import { Box, Typography, Container, Avatar } from "@mui/material";
import img2 from '../../assets/images/1.png';
import img1 from '../../assets/images/2.png';
import img4 from '../../assets/images/3.png';
import img3 from '../../assets/images/4.png';
// import './Intro.scss'

const Process = () => {
  return (
    <Box className="process" mt={"100px"} mb={"50px"}>
      <Container maxWidth="lg">
        <Typography  mb={"50px"} variant="h4" component="h1" sx={{ color:"#cf881d", textTransform: 'uppercase'}} textAlign={"center"}>
                     Quy trình sử dụng dịch vụ
            </Typography>
        <Box className='process-content' sx={{display: 'flex' , flexDirection: {xs: 'column', sm: 'row'}, gap: {xs: '50px 0', sm: '0 50px'}, alignItems: {xs: 'flex-start', sm: 'center'}, margin: {xs: '0 20%', sm: '0'}}}>
            <Box className='process-item'>
                <Box>
                   <img src={img1} alt="" />
                </Box>
                <Box sx={{display: 'flex' , gap: '0 10px', alignItems: 'center', marginTop: '16px'}}>
                    <Avatar sx={{ bgcolor: "#cf881d" }}>1</Avatar>
                    <Typography className='process-info' sx={{textAlign: 'center', color: "#cf881d", fontWeight: 500 }}>Chọn dịch vụ</Typography>
                </Box>
            </Box>
            <Box className='process-item'>
                <Box>
                   <img src={img2} alt="" />
                </Box>
                <Box sx={{display: 'flex' , gap: '0 10px', alignItems: 'center', marginTop: '16px'}}>
                    <Avatar sx={{ bgcolor: "#cf881d" }}>2</Avatar>
                    <Typography className='process-info' sx={{textAlign: 'center', color: "#cf881d", fontWeight: 500}}>Nhập thời gian và địa điểm</Typography>
                </Box>
            </Box>
             <Box className='process-item'>
                <Box>
                   <img src={img3} alt="" />
                </Box>
                <Box sx={{display: 'flex' , gap: '0 10px', alignItems: 'center', marginTop: '16px'}}>
                    <Avatar sx={{ bgcolor: "#cf881d" }}>3</Avatar>
                    <Typography className='process-info' sx={{textAlign: 'center', color: "#cf881d", fontWeight: 500}}>Tiến hành công việc</Typography>
                </Box>
            </Box>
             <Box className='process-item'>
                <Box>
                   <img src={img4} alt="" />
                </Box>
                <Box sx={{display: 'flex' , gap: '0 10px', alignItems: 'center', marginTop: '16px'}}>
                    <Avatar sx={{ bgcolor: "#cf881d" }}>4</Avatar>
                    <Typography className='process-info' sx={{textAlign: 'center', color: "#cf881d", fontWeight: 500}}>Đánh giá và xếp hạng</Typography>
                </Box>
            </Box>
     
        
        </Box>
      </Container>
    </Box>
  );
};
export default Process;
