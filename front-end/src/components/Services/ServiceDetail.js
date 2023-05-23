import React, { useEffect, useState  } from 'react';
import { useParams } from 'react-router-dom';
import { fetchServices } from '../../features/Services/ServiceAPI';
import { fetchAllUser } from '../../features/Users/UserAPI';
import { fetchCategory } from '../../features/Category/CategoryAPI';
import { fetchRateService } from '../../features/Rates/RatesAPI';
import {useSelector, useDispatch  } from 'react-redux';
import { Box, Container, Typography, Avatar, Divider,Rating, Snackbar, Alert  } from "@mui/material";
import TransgenderIcon from '@mui/icons-material/Transgender';
import CakeIcon from '@mui/icons-material/Cake';
import PhonelinkRingIcon from '@mui/icons-material/PhonelinkRing';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import DnsIcon from '@mui/icons-material/Dns';
import { Link, useNavigate  } from 'react-router-dom';
import { StyledFillButton } from '../Button/Button';
import './ServiceDetailPage.scss'
import styled from 'styled-components';

const StyledContent = styled.div`
  h1,h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #fa8d22;
  }
  ul {
    margin-bottom: 10px;
    list-style: inside;
  }
  p {
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 10px;
    text-align: justify;
  }
  strong {
    font-weight: bold;
    color: #cf881d;
  }
`;

const ServiceDetail = () => {
    const { id } = useParams();
    const serviceId =parseInt(id)
    const navigate = useNavigate();
    const dispatch = useDispatch();
     useEffect(() => {
        dispatch(fetchServices()) 
        dispatch(fetchAllUser()) 
        dispatch(fetchCategory())
        dispatch(fetchRateService(serviceId))
    }, [dispatch]);
    const { services } = useSelector(state => state.services);
    const { users } = useSelector(state => state.users);
    const { category } = useSelector(state => state.category);
    const { rateService } = useSelector(state => state.rates);

    const service = services ? services.find((item) => item.id === parseInt(id)) : null
    const user = users ? users.find((item) => item.id === service?.employee_id) : null
    const type = category ? category.find((item) => item.id === service?.category_id) : null
    
    const isLogin = localStorage.getItem('isLogin');
    const userData = localStorage.getItem('user');
    const userLogin = JSON.parse(userData);

    const calculateAverageRating = () => {
        if (rateService.length === 0) {
        return 0; // Trường hợp không có đánh giá nào
        }
        const sum = rateService.reduce((total, rating) => total + rating.rate, 0);
        return sum / rateService.length;
    }
    const averageRating = calculateAverageRating();
    const numRatings = rateService.length;

    // Kiểm tra đăng nhập
    const [openToast, setOpenToast] = useState(false);
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenToast(false);
    };
    const handleBookService = (id) => {
    if (isLogin) {
      navigate(`/book/${id}`);
    } else {
      setOpenToast(true)
    }
  };
  return (
      <Container maxWidth="lg" >
        <Typography variant="h4" className="heading" mt={"50px"} textAlign={"center"}>
                        Chi tiết dịch vụ
        </Typography>
        <Box mt={'50px'} mb={'50px'} sx={{display: 'flex', flexDirection: {xs: 'column-reverse', sm: 'row'}, gap: '30px'}}>
            <Box className="user" sx={{ padding: {xs: '15px', sm: '30px', md: '50px'}}} >
                <Typography variant="h6"  className="user-heading" textAlign={"center"}>
                    Thông tin người làm dịch vụ
                </Typography>
                <Box className="user-item" >
                    <Avatar alt="avatar" src={user?.avatar} className='user-avatar' />
                </Box>
                <Box className="user-item" >  
                        <Typography variant="body1"  className="user-title">
                        <DnsIcon sx={{color: '#cf881d'}}/>  Họ và tên: 
                        </Typography>
                    <Typography variant="body1" className="user-value">
                        {user?.first_name} {user?.last_name}
                    </Typography>
                </Box>
                <Box className="user-item"> 
                    <Typography variant="body1" className="user-title">
                    <CakeIcon sx={{color: '#cf881d'}}/>   Ngày sinh: 
                    </Typography>
                    <Typography variant="body1"  className="user-value">
                        {user?.birth_date}
                    </Typography>
                </Box>
                <Box className="user-item"> 
                    <Typography variant="body1"  className="user-title">
                    <TransgenderIcon sx={{color: '#cf881d'}}/>   Giới tính: 
                    </Typography>
                    <Typography variant="body1"  className="user-value">
                        {user?.gender}
                    </Typography>
                </Box>
                <Box className="user-item"> 
                    <Typography variant="body1"  className="user-title">
                    <EmailIcon sx={{color: '#cf881d'}}/>   Email: 
                    </Typography>
                    <Typography variant="body1"  className="user-value">
                        {user?.email}
                    </Typography>
                </Box>
                <Box className="user-item"> 
                    <Typography variant="body1"  className="user-title">
                    <PhonelinkRingIcon sx={{color: '#cf881d'}}/>    Số điện thoại: 
                    </Typography>
                    <Typography variant="body1"  className="user-value">
                        {user?.phone}
                    </Typography>
                </Box>
                <Box className="user-item"> 
                    <Typography variant="body1"  className="user-title">
                    <HomeIcon sx={{color: '#cf881d'}}/>    Địa chỉ: 
                    </Typography>
                    <Typography variant="body1"  className="user-value">
                        {user?.address}
                    </Typography>
                </Box>
            </Box>
            <Box className="service-detail" sx={{ padding: {xs: '15px', sm: '30px', md: '50px'}}}>
                <Typography variant="h6"  className="service-heading">
                            {service?.name} 
                </Typography>
                <Box className="item" sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}}}> 
                    <Typography variant="body1"  className="service-title">
                        Loại dịch vụ: 
                    </Typography>
                    <Typography variant="body1"  className="service-value">
                        {type?.name}
                    </Typography>
                </Box>
                <Box className="item" sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}}}> 
                    <Typography variant="body1"  className="service-title">
                        Mô tả dịch vụ: 
                    </Typography>
                    <Typography variant="body1"  className="service-value">
                        {type?.description}
                    </Typography>
                </Box>
                <Box className="item" sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}}}> 
                    <Typography variant="body1"  className="service-title">
                Mô tả công việc: 
                    </Typography>
                    <Typography variant="body1"  className="service-value">
                        <StyledContent  dangerouslySetInnerHTML={{ __html: service?.description }} />
                    </Typography>
                </Box>
                <Box className="item" sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}}}> 
                    <Typography variant="body1"  className="service-title">
                        Phí dịch vụ: 
                    </Typography>
                    <Typography variant="body1"  className="service-value">
                        {service?.price}  /giờ
                    </Typography>
                </Box>
                 {!isLogin || (isLogin && userLogin.role_id === 3) ?
                 <StyledFillButton sx={{ width: '300px' }} onClick={()=>handleBookService(serviceId)}>
                        Đặt dịch vụ
                    </StyledFillButton>
                : null
                }
                
                 <Snackbar open={openToast} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert variant="filled" onClose={handleClose} severity="warning" sx={{ width: '100%', backgroundColor: "#cf881d" }}>
                    Vui lòng đăng nhập để đặt dịch vụ
                </Alert>
                </Snackbar>

            </Box>
        </Box>
        <Box mt={'50px'} mb={'100px'}>
            <Typography variant="h4"  className="heading" mb={3}>
                        Bình luận và đánh giá
            </Typography>
            <Box sx={{display: 'flex', alignItems: 'center'}} mb={2}>
            <Rating name="read-only" value={averageRating} readOnly />  
             <Typography variant="h6"  sx={{color: "#5a5a5a"}}>
                     ({numRatings} đánh giá ) 
            </Typography>
            </Box>
        {rateService && rateService.length > 0 && rateService.map((item) => {

         
            const customer = users ? users.find((i) => i.id === item.customer_id) : {};   
            return (
                <Box className="comment" key={item.id} mb={5}>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: '0 15px'}}>
                    <Avatar alt="avatar" src={customer?.avatar} className='' />
                    <Typography variant="body1"  className="">
                         {customer?.first_name} {customer?.last_name}
                    </Typography>
                    </Box>
                    <Box  ml={6}> 
                    <Rating name="read-only" value={item.rate} readOnly />
                    </Box>
                    <Box mt={2} ml={6}> 
                        <Typography variant="body1"  sx={{color: '#5a5a5a'}}>
                            {item.comment} 
                        </Typography>
                    </Box>
                     <Box mt={2} ml={6}> 
                        <Typography variant="body1"  sx={{color: '#5a5a5a', fontStyle: 'italic', textAlign: 'right'}}>
                            {item.rate_date} 
                        </Typography>
                    </Box>
                <Divider></Divider>
                </Box>
            )
        })}
        </Box>
      </Container>
  );
};
export default ServiceDetail;
