import React,{ useState,useEffect } from 'react';
import {  Typography,FormGroup,FormControl,TextField,styled,Button,FormControlLabel,InputLabel,Select,MenuItem,FormLabel,RadioGroup, Radio ,ImageListItem,ImageList,styles } from '@mui/material';
import Loading from '../layout/Loading';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
//import swal from 'sweetalert';
import {createStudents} from '../../store/actions/studentActions';
import '../../hide.css';
import {useFormik} from 'formik';
import * as Yup from 'yup';

const Createstudent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const studentCreate = useSelector((state) => state.studentCreate);
    const { loading,error,studentInfo } = studentCreate;

    const initialValues ={
        name:'',
        occupation:'',
        email:'',
        phone:'',
        description:'',
        age:'',
        gender:''
    }
    const schema = Yup.object({
        name:Yup.string()
                .required('Name is required!')
                .min(3, 'Name should have of minimum 3 characters')
                .max(50, 'Name should have of minimum 30 characters'),
        occupation: Yup.string()
                      .required("Occupation is required!")
                      .min(3,"Occupation should have minimum 3 characters!")
                      .max(30,"Occupation should have maximum 30 characters!"),
        email: Yup.string()
                    .required("Email is required!")
                    .email("Email is invalid!")
                    .min(8,'Email should have of minimum 8 characters length!'),
        phone: Yup.string()
                  .required("Phone is required!")
                  .min(10,"Phone should have minimum 10 digits!"),
        description: Yup.string()
                       .required("Description is required!")
                       .min(3,"Descrition should have minimum 3 characters!")
                       .max(30,"Descrition should have maximum 30 characters!"),
        age:         Yup.string()
                        .required("Age is required!"),       
        gender:     Yup.string()
                       .required("Please select a gender!")
    })
    const formik = useFormik({
        initialValues:initialValues,
        validationSchema:schema,
        onSubmit: (values,{resetForm}) => {
            studentSubmit(values,resetForm);
        }
    })

    const studentSubmit = (val) => {
        const postBody = {
            name: val.name,
            occupation: val.occupation,
            email: val.email,
            phone: val.phone,
            description: val.description,
            age:val.age,
            gender:val.gender
        }
       // alert(JSON.stringify(postBody));return;
        document.getElementById("submitting").innerText = "Adding student...Please wait";
        document.getElementById("submitting").disabled  = false;
        dispatch(createStudents(postBody));
    }  
    useEffect(() => {
        if(studentInfo){
            navigate("/student");
          }
    },[studentInfo])
  return (

    <Container>
            <Typography variant="h5">Add Student <Ptags>(All the field having * are required)</Ptags></Typography>
            {loading && <Loading />}
                <FormControl id="name">
                    <TextField 
                               value={formik.values.name} 
                               required
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
                    <TextField value={formik.values.occupation} 
                               label="Occupation" 
                               name="occupation" 
                               onChange={formik.handleChange} required 
                               error={formik.touched.occupation && Boolean(formik.errors.occupation)}
                               helperText={formik.touched.occupation && formik.errors.occupation}
                               />
                </FormControl> 
                <FormControl>
                    <TextField value={formik.values.email} 
                               required
                               label="Email" 
                               name="email" 
                               onChange={formik.handleChange} 
                               type="email"  
                               error={formik.touched.email && Boolean(formik.errors.email)}
                               helperText={formik.touched.email && formik.errors.email}
                               />
                </FormControl>
                <FormControl>
                    <TextField value={formik.values.phone} 
                               required
                               label="Phone" 
                               name="phone" 
                               onChange={formik.handleChange} 
                               type="number" 
                               onInput = {(e) =>{e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0,10)}}  
                               error={formik.touched.phone && Boolean(formik.errors.phone)}
                               helperText={formik.touched.phone && formik.errors.phone}
                               />
                </FormControl>     
                <FormControl>
                    <TextField value={formik.values.description} 
                               label="Description" 
                               name="description" 
                               onChange={formik.handleChange} required 
                               error={formik.touched.description && Boolean(formik.errors.description)} 
                               helperText={formik.touched.description && formik.errors.description}/>
                </FormControl>
                <FormControl>
                    <InputLabel label="Age" required error={formik.touched.age && Boolean(formik.errors.age)} 
                               helperText={formik.touched.age && formik.errors.age}>Age</InputLabel>
                    <Select value={formik.values.age} 
                               label="Age" 
                               name="age" 
                               onChange={formik.handleChange} required 
                               error={formik.touched.age && Boolean(formik.errors.age)} 
                               helperText={formik.touched.age && formik.errors.age}>
                                
                        <MenuItem value="10">10 Years</MenuItem>
                        <MenuItem value="20">20 Years</MenuItem> 
                        <MenuItem value="30">30 Years</MenuItem> 
                        <MenuItem value="40">40 Years</MenuItem>     
                    </Select>       
                </FormControl>  
                <Spannings id="age-error">{(formik.touched.age && formik.errors.age)?<div>{formik.errors.age}</div>:''}   </Spannings>                 
                <FormControl  className="fieldset">
                    <FormLabel  required error={formik.touched.gender && Boolean(formik.errors.gender)} 
                        helperText={formik.touched.gender && formik.errors.gender}>Gender</FormLabel>
                    <RadioGroup
                        value={formik.values.gender}
                        row
                        name="gender" 
                        // eslint-disable-next-line no-unused-expressions 
                        onChange={(e) => {formik.handleChange;formik.setFieldValue("gender",e.currentTarget.value)}}
                        required 
                       /* error={formik.touched.gender && Boolean(formik.errors.gender)} 
                        helperText={formik.touched.gender && formik.errors.gender*}*/>
                        <FormControlLabel 
                                value="Male"
                                control={<Radio />} 
                                label="Male" 
                                />
                        <FormControlLabel 
                                value="Female"
                                control={<Radio />} 
                                label="Female" 
                                />
                    </RadioGroup>
                 </FormControl>         
                 <Spannings id="gender-error">{(formik.touched.gender && formik.errors.gender)?<div>{formik.errors.gender}</div>:''}   </Spannings>     
                <FormControl>
                    <Buttons variant="contained" id="submitting" type="submit" onClick={formik.handleSubmit}>Add Student</Buttons>
                </FormControl>
    </Container>
  
  )
}

export default Createstudent;
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
width: 80%;
`
const Spannings =  styled(FormLabel)`
color: #d32f2f;
font-size:13px;
margin: 0 0 0 1rem;
`

