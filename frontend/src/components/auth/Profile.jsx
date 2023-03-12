import React,{ useEffect } from 'react';
import {  Typography,FormGroup,FormControl,TextField,styled,Button,FormControlLabel,Checkbox,FormLabel,ImageListItem,ImageList,Avatar } from '@mui/material';
import { useState } from 'react';
import Loading from "../layout/Loading";
import {useDispatch,useSelector} from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';
import { useFormik } from 'formik'; 
import * as Yup from 'yup';
import { deepOrange } from '@mui/material/colors';
import '../../hide.css';
import {updateUser} from '../../store/actions/authActions';
import { toast } from 'react-toastify';

const Profile = () => {

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [spinner,setSpinner] = useState(true);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams();
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { loading, error, success } = userUpdateProfile;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const savedValues = {
        name: name,
        email: email,
        password: '',
        repassword:''
    };    
    const initialValues = {
        name:'',
        email:'',
        password:'',
        repassword:''
    }
    const schema = Yup.object({
                name: Yup.string()
                         .required('Name is required!')
                         .min(3)
                         .max(30),
                email: Yup.string()
                          .required('Email is required')
                          .email('Enter a valid email!'),
                password: Yup.string()
                            .min(8, 'Password should be of minimum 6 characters length')
                            .max(30, 'Password should be of minimum 30 characters length')
                            //.required('Password is required') in editing password is not required initially because it comes from database and we will not check its required
                            .matches(/^(?=.*\d)(?=.*[@#\-_$%^&+=ยง!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=ยง!\?]+$/, 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special characters.'),
                repassword: Yup.string('')
                            .min(8, 'Re Password should be of minimum 6 characters length')
                            .max(30, 'Re Password should be of minimum 30 characters length')
                            //.required('Re Password is required') //.required('Password is required') in editing password is not required initially because it comes from database  and we will not check its required
                            .matches(/^(?=.*\d)(?=.*[@#\-_$%^&+=ยง!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=ยง!\?]+$/, 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special characters.')
                            .when('password', {
                              is: (val) => !!(val && val.length > 0),
                              then: Yup.string().oneOf(
                                [Yup.ref('password')],
                                'Password and Retype Password do not match')
                            })/*,
                image : Yup.mixed()
                           .required("Image is required"),   */                          
    })
    const formik = useFormik({
        initialValues: (savedValues || initialValues),
        validationSchema: schema,
        enableReinitialize:true,  //this variable must be true if data comes from API
        onSubmit: (values,{resetForm}) => {
            onUpdateProfile(values,resetForm);
        }
    })
    
    const onUpdateProfile = (val) => {
        const postBody = {
            name:val.name,
            email:val.email,
            password:val.password,
        }
        
        document.getElementById("submitting").innerText = "Updating user...Please wait!";
        document.getElementById("submitting").disabled  = true;
        dispatch(updateUser(postBody,id));
           
    }
    useEffect(() => {
        if( id !== userInfo._id){
            toast.error(`OOps!...No Record Found on this ID ${id} !!`, {
                position: "bottom-right",
                hideProgressBar: false,
                progress: undefined,
            });
        navigate("/home");    
        }
        setSpinner(false);
        //alert(JSON.stringify(userInfo));
        setName(userInfo.name);
        setEmail(userInfo.email);
    },[]);  
  return (
    <Container>
            <center><Avatar style={{alignItems:'center'}} sx={{ bgcolor: deepOrange[500] }} /></center>
            <Typography variant="h5" style={{textAlign:'center'}}>Update Profile <Ptags>(All the field having * are required)</Ptags></Typography>
            {(loading && <Loading />) || (spinner===true && <Loading />)} {success && (navigate("/home"))}
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
                    />
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
                    <Buttons variant="contained" type="submit" id="submitting" onClick={(e) => formik.handleSubmit()}>Update User</Buttons>
                </FormControl>
    </Container>
  )
}

export default Profile;
const Container = styled(FormGroup)`
width: 40%;
margin: 3% auto 0 auto;
& > div {
    margin-top:10px;
}
`
const Spanning =  styled(FormLabel)`
color: red;
font-size:12px;
`
const Ptags =  styled('p')`
font-size:10px;
`
const Buttons =  styled(Button)`
width: 70%;
`
const ImagePreview = styled(ImageListItem)`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 200px;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);

  img {
    max-width: 100%;
  }
`
const Spannings =  styled(FormLabel)`
color: #d32f2f;
font-size:13px;
`
