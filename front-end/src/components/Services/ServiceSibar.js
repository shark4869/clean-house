import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Box} from "@mui/material";
import { NavLink } from "react-router-dom";
import { fetchCategory } from '../../features/Category/CategoryAPI';
import './ServiceSibar.scss'

const ServiceSidebar = () => {
    const dispatch = useDispatch();
    const {category} = useSelector((state) => state.category);
       
    useEffect(() => {
        dispatch(fetchCategory());
   }, [dispatch]);
  return (
    <>
    <Box sx={{ display: { xs: "none", md: "block" } }}>
    <ul className="service-menu">
        <li className="service-link">
                <NavLink  to={"/service/category"} end >Tất cả</NavLink>
        </li>
        {category && category.length > 0 &&category.map((item) => (
             <li key={item.id} className="service-link">
                <NavLink  to={`/service/category/${item.id}`} end>{item.name}</NavLink>
            </li>
        ))}
    </ul>
    </Box>
    <Box sx={{ display: { xs: "block", md: "none" } }}>
        <ul className="service-menu-mobile">
         <li className="service-link">
                <NavLink  to={"/service/category"} end>Tất cả</NavLink>
        </li>
        {category && category.length > 0 &&category.map((item) => (
             <li key={item.id} className="service-link">
                <NavLink  to={`/service/category/${item.id}`} end>{item.name}</NavLink>
            </li>
        ))}
        </ul>
    </Box>
    </>
  )
}

export default ServiceSidebar