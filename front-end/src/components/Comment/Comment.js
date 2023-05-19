import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRate } from '../../features/Rates/RatesAPI';
import { fetchAllUser } from '../../features/Users/UserAPI';
import {Box, Typography, Container, Rating, Avatar } from "@mui/material";
import Carousel from "react-multi-carousel";
import './Comment.scss'
import "react-multi-carousel/lib/styles.css";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1  
}};

function Comment()
{
    const dispatch = useDispatch();
    const {rates} = useSelector((state) => state.rates);
    const { users } = useSelector(state => state.users);
       
    useEffect(() => {
        dispatch(fetchAllRate());
        dispatch(fetchAllUser());
   }, [dispatch]);
    return (
        <Container maxWidth="lg" sx={{marginBottom: "100px", marginTop: "100px"}}>
                <Typography  mb={"50px"} variant="h4" component="h1" sx={{ color:"#cf881d", textTransform: 'uppercase'}} textAlign={"center"}>
                     Đánh giá về các dịch vụ của chúng tôi
                </Typography>
               <Carousel
                responsive={responsive}
                infinite
                showDots
                autoPlaySpeed={1000}
                customTransition="all .5"
                transitionDuration={500}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                >
                {rates && rates.length > 0 &&rates.map((item) => {
                    const customer = users ? users.find((i) => i.id === item.customer_id) : {};   
                    return (
                      
                            <Box key={item.id} component="div" className="rating">
                                <Typography variant="body1"  className="rating-context" mb={4} mt={4} >
                                    {item.comment} 
                                </Typography>
                                <Box className='rating-info'>

                                <Avatar alt="avatar" src={customer?.avatar} className='avatar' />                   
                                 <Rating name="read-only" value={item.rate} readOnly />
                                <Typography variant="body1"  className="rate-user" mt={2} mb={1}>
                                    {customer?.first_name} {customer?.last_name}
                                </Typography>
                                <Typography variant="body2" className="rate-role"  mb={4}>
                                    Khách hàng
                                </Typography>
                                </Box>
                            </Box>
                    )}
                )}
                </Carousel>
         
            </Container>
    )
}

export default Comment;