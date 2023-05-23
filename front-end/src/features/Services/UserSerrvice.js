import React, { useState,useEffect  } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {useSelector, useDispatch  } from 'react-redux';
import { fetchServices, editService, CreateService, removeService } from './ServiceAPI';
import { getAllSerrvice } from './ServiceSlice';
import { fetchCategory } from '../Category/CategoryAPI';
import {Typography, Box, Select, MenuItem, OutlinedInput, Divider, Dialog, DialogContent,DialogContentText, DialogActions, Button  } from "@mui/material";
import { StyledFillButton, StyledOutlineButton } from '../../components/Button/Button';
import StyleFormControl from '../../components/FormControl/FormControl';
import styled from 'styled-components';
import './UserService.scss'

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

const UserService = () => {

    const [isAdd, setIsAdd] = useState(false);
    
    const dispatch = useDispatch();
    useEffect(() => {
         dispatch(fetchServices());
         dispatch(fetchCategory());
    }, [dispatch]);
    const { services } = useSelector(state => state.services);
    const { category } = useSelector(state => state.category);
  
    const userData = localStorage.getItem('user');
    const user = JSON.parse(userData);
    const userService = (services && services.length > 0) && services.filter(service => service.employee_id === user.id && service.is_deleted === false);
     
    const [selectedService, setSelectedService] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    // edit
    const handleEditClick = (service) => {
        setSelectedService(service);
        setShowEditForm(true);
    };

    const handleFormSubmit = (editedService) => {
        // Thực hiện các xử lý chỉnh sửa sản phẩm tại đây
        console.log('check:', editedService)
        dispatch(editService(editedService.id, editedService));
        setShowEditForm(false);
        const updatedServices = services.map((service) =>
            service.id === editedService.id ? editedService : service
        );
        dispatch(getAllSerrvice(updatedServices));
    };
    // add
    const handleAddService = () => {
        setIsAdd(true)
    };

     const handleSubmitPost = (service) => {
        const name = service.name;
        const category_id = service.category_id;
        const description = service.description;
        const employee_id = user.id;
        const price = service.price;
        const post = { name, category_id, description, employee_id, price};
        console.log('check post:', post)
        dispatch(CreateService(post));
        setIsAdd(false)
    };
    // hủy 
    const [openToast, setOpenToast] = useState(false);
    const handleCloseCancle = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenToast(false);
    };
    const handleOpenCancle = () => {
        setOpenToast(true);
    }
     const handleDelete = (serviceId) => {
        dispatch(removeService(serviceId));
        handleCloseCancle();
    };

  return (
    <Box mt={"50px"} mb={"100px"}>
         <Dialog
        open={openToast}
        onClose={handleCloseCancle}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Xác nhận xóa dịch vụ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}  sx={{color: '#cf881d'}}>
            Xác nhận
          </Button>
           <Button onClick={handleCloseCancle} autoFocus sx={{color: '#cf881d'}}>
            Hủy
          </Button>
        </DialogActions>
      </Dialog> 
       <Typography mb={"50px"} variant="h4" component="h1" sx={{ color:"#cf881d", textAlign: "center" }}>
               Danh sách dịch vụ cung cấp
        </Typography>
       <Box className="service" sx={{width: {xs: '100%', sm: '70%'}}}>
        {isAdd ?
         <AddForm onSubmit={handleSubmitPost} onClose={() => setIsAdd(false)} category={category} />
         :
         <StyledFillButton variant='outline' onClick={handleAddService} sx={{ marginBottom: "50px"}} >Thêm dịch vụ
        </StyledFillButton>
        }
        
        {!showEditForm ?
        (
            <ListService
            services={userService}
            onEdit={handleEditClick}
            category={category}
            onMove={handleOpenCancle}
            />
        )
        :
        (
            <EditForm
            service={selectedService}
            onSubmit={handleFormSubmit}
            onCancel={() => setShowEditForm(false)}
            category={category}
            />
        )}
       
       </Box>
    
    </Box>
  
  )
}

const AddForm = ({  onSubmit, onClose, category }) => {
    const [name, setName] = useState( "");
    const [category_id, setCategoryId] = useState( "");  
    const [description, setDesc] = useState("");
    const [price, setPrice] = useState("");
   
    const handleEditorChange = (newContent) => {
        setDesc(newContent);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const addService = {
        name,
        category_id,
        description, 
        price
        };
        onSubmit(addService);
    };
   const handleKeyNumber = (event) => {
    const pattern = /^[0-9]+$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
    };
  return (
    
    <Box component="form" onSubmit={handleSubmit} noValidate autoComplete='off' className="form" sx={{ marginBottom: "50px"}}>
        <Typography variant="body1"  className="form-heading">
                        Thêm dịch vụ mới
        </Typography>
        <Box className="input"  sx={{flexDirection: {xs: 'column', sm: 'row'}, alignItems: {xs: 'flex-start', sm: 'center'}}}>
            <Typography variant="body1"  className="input-label">
                    Tên dịch vụ: 
            </Typography>
            <StyleFormControl sx={{minWidth: 270,
            '.MuiOutlinedInput-root': {
                    borderRadius: "5px"
                }
             }}>
            <OutlinedInput size='small' name='name' value={name} type='text' className="input-value"
            onChange={(e) => setName(e.target.value)}
            />
                </StyleFormControl>
         </Box>
        <Box className="input"  sx={{flexDirection: {xs: 'column', sm: 'row'}, alignItems: {xs: 'flex-start', sm: 'center'}}}>
            <Typography variant="body1"  className="input-label">
                   Phân loại: 
            </Typography>
            <StyleFormControl sx={{minWidth: 270,
            '.MuiOutlinedInput-root': {
                    borderRadius: "5px"
                }
             }}>
                    <Select
                    size="small"
                    name='category_id'
                    id="category_id"
                    value={category_id}
                    onChange={(e) => setCategoryId(e.target.value)}
                >
                    {category && category.length > 0 && category.map((i) => (
                            <MenuItem
                            key={i.id}
                            value={i.id}
                            >
                            {i.name}
                            </MenuItem>
                        ))}
                </Select>
            </StyleFormControl>
         </Box>

        <Box className="input"  sx={{flexDirection: {xs: 'column', sm: 'row'}, alignItems: {xs: 'flex-start', sm: 'center'}}}>
            <Typography variant="body1"  className="input-label">
                    Mô tả công việc: 
            </Typography>
            <TinyMCEEditor value={description} onChange={handleEditorChange} />
        </Box>
        <Box className="input"  sx={{flexDirection: {xs: 'column', sm: 'row'}, alignItems: {xs: 'flex-start', sm: 'center'}}}>
            <Typography variant="body1"  className="input-label">
                     Phí dịch vụ: 
             </Typography>
                <StyleFormControl sx={{
                minWidth: 270,
            '.MuiOutlinedInput-root': {
                    borderRadius: "5px"
                }
            }}>
            <OutlinedInput 
            size='small'
            name='price'
            value={price}
            type='text'
            className="input-value"
            onKeyPress={handleKeyNumber}
            onChange={(e) => setPrice(e.target.value)}
            />
            </StyleFormControl>
        </Box>
                                
        <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, alignItems: {xs: 'flex-start', sm: 'center'}, gap: '20px 50px'}} >
        <StyledFillButton type="submit" size="large" variant="contained" >
            Thêm dịch vụ
        </StyledFillButton>
        <StyledOutlineButton onClick={onClose} size="large" variant="contained" >
            Hủy
        </StyledOutlineButton>
        </Box>
    </Box>     
  );
};


const EditForm = ({ service, onSubmit, onCancel, category }) => {
    const [id, setId] = useState(service.id || "");
    const [name, setName] = useState(service.name || "");
    const [category_id, setCategoryId] = useState(service.category_id || "");  
    const [description, setDesc] = useState(service.description || "");
    const [employee_id, setEmloyee] = useState(service.employee_id || "");
    const [price, setPrice] = useState(service.price || "");
    const [is_delete, setIsDelete] = useState(service.is_delete || "");

    const handleEditorChange = (newContent) => {
        setDesc(newContent);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const editedService = {
        id,
        name,
        category_id,
        description, 
        employee_id,
        price,
        is_delete
        };
        onSubmit(editedService);
    };
   const handleKeyNumber = (event) => {
    const pattern = /^[0-9]+$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
    };

    
  return (
    
    <Box component="form" onSubmit={handleSubmit} noValidate autoComplete='off' className="form">
        <Typography variant="body1"  className="form-heading">
                        {service.name} 
        </Typography>
        <Box className="input" sx={{flexDirection: {xs: 'column', sm: 'row'}, alignItems: {xs: 'flex-start', sm: 'center'}}}>
            <Typography variant="body1"  className="input-label">
                    Tên dịch vụ: 
            </Typography>
            <StyleFormControl sx={{minWidth: 270,
            '.MuiOutlinedInput-root': {
                    borderRadius: "5px"
                }
             }}>
            <OutlinedInput size='small' name='name' value={name} type='text' className="input-value"
            onChange={(e) => setName(e.target.value)}
            />
                </StyleFormControl>
         </Box>
        <Box className="input" sx={{flexDirection: {xs: 'column', sm: 'row'}, alignItems: {xs: 'flex-start', sm: 'center'}}}>
            <Typography variant="body1"  className="input-label">
                   Phân loại: 
            </Typography>
            <StyleFormControl sx={{minWidth: 270,
            '.MuiOutlinedInput-root': {
                    borderRadius: "5px"
                }
             }}>
                    <Select
                    size="small"
                    name='category_id'
                    id="category_id"
                    value={category_id}
                    onChange={(e) => setCategoryId(e.target.value)}
                >
                    {category && category.length > 0 && category.map((i) => (
                            <MenuItem
                            key={i.id}
                            value={i.id}
                            >
                            {i.name}
                            </MenuItem>
                        ))}
                </Select>
            </StyleFormControl>
         </Box>

        <Box className="input" sx={{flexDirection: {xs: 'column', sm: 'row'}, alignItems: {xs: 'flex-start', sm: 'center'}}}>
            <Typography variant="body1"  className="input-label">
                    Mô tả công việc: 
            </Typography>
            <Box>
            <Typography variant="body1"  mb={1} sx={{color: "#5a5a5a", fontStyle: "italic"}}>
            Bao gồm các mô tả về thời gian dự kiến hoàn thành công việc, các công việc sẽ thực hiện, các dụng cụ sử dụng,.. 
            </Typography>
            <TinyMCEEditor value={description} onChange={handleEditorChange} />
            </Box>
        </Box>
         
        <Box className="input" sx={{flexDirection: {xs: 'column', sm: 'row'}, alignItems: {xs: 'flex-start', sm: 'center'}}}>
            <Typography variant="body1"  className="input-label">
                     Phí dịch vụ: 
             </Typography>
                <StyleFormControl sx={{
                minWidth: 270,
            '.MuiOutlinedInput-root': {
                    borderRadius: "5px"
                }
            }}>
            <OutlinedInput 
            size='small'
            name='price'
            value={price}
            type='text'
            className="input-value"
            onKeyPress={handleKeyNumber}
            onChange={(e) => setPrice(e.target.value)}
            />
            </StyleFormControl>
        </Box>
                                
        <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, alignItems: {xs: 'flex-start', sm: 'center'}, gap: '20px 50px'}} >
        <StyledFillButton type="submit" size="large" variant="contained" >
            Lưu thay đổi
        </StyledFillButton>
        <StyledOutlineButton onClick={onCancel} size="large" variant="contained" >
            Hủy
        </StyledOutlineButton>
        </Box>
    </Box>     

  );
};

const ListService = ({ services, onEdit, category, onMove}) => {
   
  return (
    <>
        {services && services.length > 0 && services.map((service) => {
    
         
            const type = category ? category.find((i) => i.id === service.category_id) : {};   
            return (
                <Box className="service-content" key={service.id}>
                    <Typography variant="body1"  className="service-heading">
                        {service.name} 
                    </Typography>
                    <Box className="service-part" sx={{flexDirection: {xs: 'column', sm: 'row'}, alignItems: {xs: 'flex-start', sm: 'center'}}}> 
                        <Typography variant="body1"  className="service-title">
                            Phân loại: 
                        </Typography>
                        <Typography variant="body1"  className="service-value">
                            {type?.name} 
                        </Typography>
                    </Box>
                    <Box className="service-part" sx={{flexDirection: {xs: 'column', sm: 'row'}, alignItems: {xs: 'flex-start', sm: 'center'}}}> 
                        <Typography variant="body1"  className="service-title">
                            Mô tả dịch vụ: 
                        </Typography>
                        <Typography variant="body1"  className="service-value">
                            {type?.description} 
                        </Typography>
                    </Box>
                    <Box className="service-part" sx={{flexDirection: {xs: 'column', sm: 'row'}, alignItems: {xs: 'flex-start', sm: 'center'}}}> 
                        <Typography variant="body1"  className="service-title">
                            Mô tả công việc: 
                        </Typography>
                        <Typography variant="body1"  className="service-value" >
                             <StyledContent  dangerouslySetInnerHTML={{ __html: service.description }} />
                        </Typography>
                    </Box>
                    <Box className="service-part" sx={{flexDirection: {xs: 'column', sm: 'row'}, alignItems: {xs: 'flex-start', sm: 'center'}}}> 
                        <Typography variant="body1"  className="service-title">
                            Phí dịch vụ: 
                        </Typography>
                        <Typography variant="body1"  className="service-value">
                            {service.price}  /giờ
                        </Typography>
                    </Box>
             
                    <Box className="service-button" sx={{flexDirection: {xs: 'column', sm: 'row'}}} > 
                        <StyledFillButton  onClick={() => onEdit(service)}>
                                Chỉnh sửa dịch vụ
                        </StyledFillButton>
                        <StyledOutlineButton onClick={() => onMove(service.id)}>
                            Xóa dịch vụ
                        </StyledOutlineButton>
                    </Box>
                  <Divider></Divider>
                </Box>
            )
    })}
     </>
  );
};

const TinyMCEEditor = ({ value, onChange }) => {
  const handleEditorChange = (content, editor) => {
    onChange(content);
  };

  return (
    <Editor
      apiKey="tzeru7ro9xkd34m9kcv1r6g4mfpkzhj8q82x4xqoqojksbyv" // Thay YOUR_API_KEY bằng API key của bạn (xem bước 3)
      value={value}
      onEditorChange={handleEditorChange}
    />
  );
};

export default UserService