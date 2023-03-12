import React,{ useEffect } from 'react';
import {  Typography,FormGroup,FormControl,TextField,styled,Button,FormControlLabel,Checkbox,FormLabel,ImageListItem,ImageList,Avatar } from '@mui/material';
import { useState } from 'react';
import Loading from "../layout/Loading";
import {useDispatch,useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'; 
import * as Yup from 'yup';
import { deepOrange } from '@mui/material/colors';
import '../../hide.css';
import {registerUser} from '../../store/actions/authActions';

const Signup = () => {

    const [image,setImage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    const initialValues = {
        name:'',
        email:'', 
        password:'',
        repassword:''
    }
    const schema = Yup.object({
                name: Yup.string()
                         .required('Name is required!')
                         .min(3, 'Name should be of minimum 3 characters')
                         .max(50, 'Name should be of minimum 30 characters'),
                email: Yup.string()
                          .required('Email is required')
                          .email('Enter a valid email!')
                          .min(8,'Password should be of minimum 8 characters length!'),
                password: Yup.string()
                            .min(8, 'Password should be of minimum 6 characters length')
                            .max(30, 'Password should be of minimum 30 characters length')
                            .required('Password is required')
                            .matches(/^(?=.*\d)(?=.*[@#\-_$%^&+=ยง!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=ยง!\?]+$/, 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special characters.'),
                repassword: Yup.string('')
                            .min(8, 'Re Password should be of minimum 6 characters length')
                            .max(30, 'Re Password should be of minimum 30 characters length')
                            .required('Re Password is required')
                            .matches(/^(?=.*\d)(?=.*[@#\-_$%^&+=ยง!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=ยง!\?]+$/, 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special characters.')
                            .when('password', {
                              is: (val) => !!(val && val.length > 0),
                              then: Yup.string().oneOf(
                                [Yup.ref('password')],
                                'Password and Retype Password do not match')
                            })                         
    })
    const formik = useFormik({
        initialValues:initialValues,
        validationSchema: schema,
        onSubmit: (values,{resetForm}) => {
            onRegister(values,resetForm);
        }
    })
    
    
    const onRegister = async(val) => {
        const postBody = {
            name:val.name,
            email:val.email,
            password:val.password
        }
      //  alert(postBody);return;
        document.getElementById("submitting").innerText="Adding User...Please wait";
        document.getElementById("submitting").disabled=true; 
        dispatch(registerUser(postBody));

    }
    useEffect(() => {
        if(userInfo){
             navigate("/login");
         }
    },[userInfo,error]);  
  return (
    <Container>
            <center><Avatar style={{alignItems:'center'}} sx={{ bgcolor: deepOrange[500] }} /></center>
            <Typography variant="h5" style={{textAlign:'center'}}>Sign Up <Ptags>(All the field having * are required)</Ptags></Typography>
            {loading && <Loading />}
                <FormControl>
                    <TextField 
                            value={formik.values.name} 
                            required='required'
                            id="name"
                            name="name" 
                            label="Name"  
                            onChange={formik.handleChange} 
                            inputProps={{ maxLength: 50 }}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name} 
                    />
                </FormControl>
                <FormControl>
                <TextField 
                            value={formik.values.email} 
                            required='required'
                            id="email"
                            name="email" 
                            label="Email"  
                            onChange={formik.handleChange} 
                            inputProps={{ maxLength: 50 }}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email} 
                    /><Spanning id="email-error"></Spanning>
                </FormControl>
                <FormControl>
                <TextField 
                            value={formik.values.password} 
                            required='required'
                            id="password"
                            name="password" 
                            label="Password"  
                            onChange={formik.handleChange} 
                            inputProps={{ maxLength: 50 }}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password} 
                            type="password"
                    />
                </FormControl> 
                <FormControl>
                <TextField 
                            value={formik.values.repassword} 
                            required='required'
                            id="repassword"
                            name="repassword" 
                            label="RePassword"  
                            onChange={formik.handleChange} 
                            inputProps={{ maxLength: 50 }}
                            error={formik.touched.repassword && Boolean(formik.errors.repassword)}
                            helperText={formik.touched.repassword && formik.errors.repassword} 
                            type="password"
                    />
                </FormControl>  
                <FormControl>
                    <Buttons variant="contained" type="submit" id="submitting" onClick={(e) => formik.handleSubmit()}>Add User</Buttons>
                </FormControl>
    </Container>
  )
}

export default Signup;
const Container = styled(FormGroup)`
width: 30%;
margin: 3% auto 0 auto;
& > div {
    margin-top:10px;
    margin-bottom:15px;
}
`
const Spanning =  styled(FormLabel)`
color: #d32f2f;
font-size:13px;
margin: 0 0 0 .8rem;
`
const Ptags =  styled('p')`
font-size:10px;
`
const Buttons =  styled(Button)`
width: 100%;
`
const Spannings =  styled(FormLabel)`
color: #d32f2f;
font-size:13px;
`
