import React, { useEffect , useState } from 'react';
import { fetchServices } from '../../features/Services/ServiceAPI';
import { fetchAllUser } from '../../features/Users/UserAPI';
import { fetchAllRate } from '../../features/Rates/RatesAPI';
import { fetchCategory } from '../../features/Category/CategoryAPI';
import { useParams } from 'react-router-dom';
import {useSelector, useDispatch  } from 'react-redux';
import { Box, Container, Typography, Grid, Rating, Pagination, Select,MenuItem, Button, InputLabel } from "@mui/material";
import { Link } from "react-router-dom";
import { StyledOutlineButton } from '../Button/Button';
import StyleFormControl from '../FormControl/FormControl';
import './Service.scss'

const Services = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
     useEffect(() => {
        dispatch(fetchServices()) 
        dispatch(fetchAllUser()) 
        dispatch(fetchAllRate()) 
        dispatch(fetchCategory()) 
    }, [dispatch]);
    const { services } = useSelector(state => state.services);
    const { users } = useSelector(state => state.users);
    const { rates } = useSelector(state => state.rates);
    const { category } = useSelector(state => state.category);
    
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

    const [type, setType] = useState('');
    const [location, setLocation] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

     const handleCategoryChange = (event) => {
        setType(event.target.value);
    };

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };
    const handleSearch = () => {
        const filteredUsers = users.filter((user) => {
        const userServices = services.filter((service) => service.employee_id === user.id);
        const matchingServices = userServices.filter((service) => {
        const isCategoryMatch = service.category_id === type;
        return isCategoryMatch;
      });

      return (
        matchingServices.length > 0 &&
        user.address.toLowerCase().indexOf(location.toLowerCase()) !== -1 // Sử dụng indexOf để tìm kiếm theo phần nội dung
      );
    });

    setSearchResults(filteredUsers);
    setShowResults(true);
    console.log('search:', filteredUsers)
    setLocation('')
    setType('')
  };
  const handleHideResults = () => {
    setShowResults(false); // Tắt trạng thái hiển thị kết quả
  };
  return (
      <Container maxWidth="lg" >
        <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, alignItems: 'center', justifyContent: 'space-between', gap: '20px 20px'}} mb={5}>
         <StyleFormControl fullWidth variant="outlined">
         <InputLabel id="demo-simple-select-disabled-label" color='warning' >Phân loại</InputLabel>
        <Select value={type} onChange={handleCategoryChange}  label="Phân loại">
                   {category && category.length > 0 && category.map((i, index) => (
                          <MenuItem
                          key={i.id}
                          value={i.id}
                          >
                          {i.name}
                          </MenuItem>
                      ))}
            </Select>
         </StyleFormControl>
         <StyleFormControl fullWidth variant="outlined">
            <InputLabel id="demo-simple-select-disabled-label" color='warning'>Địa điểm</InputLabel>
            <Select value={location} onChange={handleLocationChange} fullWidth  label="Địa điểm">
                <MenuItem value="Hồ Chí Minh">TP.Hồ Chí Minh</MenuItem>
                <MenuItem value="Đăk Lăk">Đăk Lăk</MenuItem>
                <MenuItem value="Đà Nẵng">Đà Nẵng</MenuItem>
                <MenuItem value="Hà Nội">Hà Nội</MenuItem>
                </Select>
         </StyleFormControl>

            <Button variant="contained" onClick={handleSearch}  sx={{ 
                    backgroundColor: "#cf881d",
                    height: "50px",
                    width: "200px",
                    ":hover": {
                    backgroundColor: "#cf881d"
                    }
                }}>
                Tìm kiếm
            </Button>
        </Box>
         
            {showResults ? (
        <>
            <Typography variant="body1"  sx={{color: "#5a5a5a"}} mb={1}>
                        Kết quả tìm kiếm:
            </Typography>
          {searchResults.length > 0 ? (
            <>
            
             <Grid container rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 3 }} mb={"50px"}>
            {searchResults.map((item)=>{
              const service = services && services.length > 0 && services.find((i) => i.employee_id === item.id)
              const ratesSerrvice = rates && rates.length > 0 && rates.filter((rate) => rate.service_id === service.id)
              const averageRating = calculateAverageRating(ratesSerrvice);
              const numRatings = ratesSerrvice.length;
             
              return (
            
              <Grid item xs={12} sm={6} md={4} className="" key={item.id}>
                  <Box component="div" className="service-item">
                      <Box className="service-img" >
                          <img src={item.avatar} alt={item.name} />
                      </Box>
                      <Box className="service-content"  > 
                      <Box className="service-top" p={2} >
                              <Typography variant="body1"  className="service-employee" textAlign={"center"}>
                                    {item.first_name} {item.last_name}
                              </Typography>
                               <Typography variant="h5"  className="service-name" textAlign={"center"} mt={2}>
                                    {service.name}
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
            </>  
       
          ) : (
            <Typography variant="body1"  sx={{color: "#5a5a5a"}} mb={3}>
                        Không tìm thấy kết quả!
                    </Typography>
          )}

             <Button variant="contained" onClick={handleHideResults}  sx={{ 
                    backgroundColor: "#cf881d",
                    height: "50px",
                    width: "200px",
                    ":hover": {
                    backgroundColor: "#cf881d"
                    }
                }}>
               Trở lại
            </Button>
        </>
      )
        : (
            <>
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
            </>

        )
    }
       
      </Container>
  );
};
export default Services;
