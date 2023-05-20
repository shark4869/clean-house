import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory } from '../../features/Category/CategoryAPI';
import './Category.scss'
import {Box, Typography, Container, Grid} from "@mui/material";
import { Link } from "react-router-dom";
import { StyledFillButton } from '../Button/Button';
function Category()
{
    const dispatch = useDispatch();
    const {category} = useSelector((state) => state.category);
       
    useEffect(() => {
        dispatch(fetchCategory());
   }, [dispatch]);

    return (
        <Container maxWidth="lg" sx={{marginBottom: "50px", marginTop: "100px", display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography  mb={"50px"} variant="h4" component="h1" sx={{ color:"#cf881d", textTransform: 'uppercase', textAlign: 'center'}}>
                    Các dịch vụ của chúng tôi
                </Typography>
                 <Grid container columnSpacing={4} rowSpacing={4}>
                     {category && category.length > 0 &&category.map((item) => (
                        <Grid key={item.id} item xs={12} sm={6} md={3}>
                            <Box component="div" className="category-item">
                                <Box className='category-img'>
                                <img src={item.image} alt=""  />
                                </Box>
                                <Box className="category-content" > 
                                <Typography variant="h6"  className="category-name" mb={1} mt={2} >
                                        {item.name} 
                                    </Typography>
                                    <Typography variant="body1"  className="category-desc" textAlign={"center"} >
                                        {item.description} 
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
                <StyledFillButton sx={{width: '120px', marginTop: '50px', padding: '10px'}} >
                      <Link to={"/service"}>  Xem tất cả</Link>
                  
                </StyledFillButton>
         
            </Container>
    )
}

export default Category;