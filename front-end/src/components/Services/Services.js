import React, { useEffect  } from 'react';
import { fetchServices } from '../../features/Services/ServiceAPI';
import { fetchAllUser } from '../../features/Users/UserAPI';
import { fetchAllRate } from '../../features/Rates/RatesAPI';
import { useParams } from 'react-router-dom';
import {useSelector, useDispatch  } from 'react-redux';
import { Box, Container, Typography, Grid, Rating, Pagination } from "@mui/material";
import { Link } from "react-router-dom";
import { StyledOutlineButton } from '../Button/Button';
import './Service.scss'

const Services = () => {
     const { id } = useParams();
    const dispatch = useDispatch();
     useEffect(() => {
        dispatch(fetchServices()) 
        dispatch(fetchAllUser()) 
        dispatch(fetchAllRate()) 
    }, [dispatch]);
    const { services } = useSelector(state => state.services);
    const { users } = useSelector(state => state.users);
    const { rates } = useSelector(state => state.rates);
  
   const filteredServices = id
    ? services.filter((i) => i.category_id === parseInt(id))
    : services;

    const calculateAverageRating = (rateService) => {
        if (!Array.isArray(rateService)) {
            return 0; // Trường hợp rateService không phải mảng
        }

        if (rateService.length === 0) {
        return 0; // Trường hợp không có đánh giá nào
        }
        const sum = rateService.reduce((total, rating) => total + rating.rate, 0);
        return sum / rateService.length;
    }
    
  return (
      <Container maxWidth="lg" sx={{display: 'flex', alignItems: 'center'}}>
         <Grid container rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 3 }} mb={"100px"}>
            {filteredServices && filteredServices.length > 0 && filteredServices.map((item)=>{
                const employee = users && users.length > 0 && users.find((user) => user.id === item.employee_id)
                const ratesSerrvice = rates && rates.length > 0 && rates.filter((rate) => rate.service_id === item.id)
                const averageRating = calculateAverageRating(ratesSerrvice);
                const numRatings = ratesSerrvice.length;
               
                return (
              
                <Grid item xs={12} sm={6} md={4} className="" key={item.id}>
                    <Box component="div" className="service-item">
                        <Box className="service-img" >
                            <img src={employee.avatar} alt={item.name} />
                        </Box>
                        <Box className="service-content"  > 
                        <Box className="service-top" p={2} >
                                <Typography variant="body1"  className="service-employee" textAlign={"center"}>
                                      {employee.first_name} {employee.last_name}
                                </Typography>
                                 <Typography variant="h5"  className="service-name" textAlign={"center"} mt={2}>
                                      {item.name}
                                </Typography>
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'center'}} mb={1}>
                        <Rating name="read-only" value={averageRating} readOnly />  
                        <Typography variant="h6"  sx={{color: "#5a5a5a"}}>
                                ({numRatings}) 
                        </Typography>
                        </Box>
                        <StyledOutlineButton size="large" variant="contained" sx={{marginBottom: "20px"}} >
                                   <Link to={`/service/${item.id}`}>
                                        Chi tiết
                                    </Link> 
                        </StyledOutlineButton>
                        </Box>
                    </Box>
                </Grid>
            
                )
            })}
        </Grid>
       
      </Container>
  );
};
export default Services;
