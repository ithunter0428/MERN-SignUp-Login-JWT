import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export default function Signup() {
    const history = useHistory();
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

// phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid')

    const validationSchema = Yup.object({
        fname : Yup.string().matches(`^[a-zA-Z\\s]*$`,"Invalid First Name").required('Required!'),
        lname : Yup.string().matches(`^[a-zA-Z\\s]*$`,"Invalid Last Name").required('Required!'),
        email : Yup.string().email('Invalid email address').required('Required!'),
        phone : Yup.string().matches(phoneRegExp,'Phone number is not valid').required('Required!'),
        password : Yup.string().required('Required!'),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
    })
    const formik =  useFormik({
        initialValues:  {
            fname:'',
            lname:'',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: (values) =>{
            console.log(values)
            // routeChange();
            axios({
                method: 'post',
                url: 'http://localhost:4001/signup',
                headers: {"Content-Type":"application/json"},
                data: JSON.stringify({
                    firstname: values.fname,
                    lastname: values.lname,
                    email: values.email,
                    gender:"male",
                    phone: values.phone,
                    password: values.password,
                    confirmpassword: values.confirmPassword,
                })
              }).then(function(response){
                  console.log(response);
                  routeChange();
              }).catch((error)=>{
                  console.log("hello")
                alert(JSON.stringify(error.response.data.message))
            });
            
        }, 
        validationSchema
        // validate
    })

    const routeChange = () =>{
        let path = '/';
        history.push(path);
    }

    const myStyle = {
        color : 'red'
    }
    return (
        <div>
            <div className='container my-3'>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                    <label forhtml="exampleInputName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="fname" name="fname" aria-describedby="nameHelp" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.fname}/>    
                </div>
                {formik.touched.fname && formik.errors.fname? <div style={myStyle}>{formik.errors.fname}</div>: null}
                <div className="mb-3">
                    <label forhtml="exampleInputName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lname" name="lname" aria-describedby="nameHelp" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lname}/>    
                </div>
                {formik.touched.lname && formik.errors.lname? <div style={myStyle}>{formik.errors.lname}</div>: null}
                <div className="mb-3">
                    <label forhtml="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp"  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
                </div>
                {formik.touched.email && formik.errors.email? <div style={myStyle}>{formik.errors.email}</div>: null}
                <div className="mb-3">
                    <label forhtml="phone" className="form-label">Phone Number</label>
                    <input type="phone" className="form-control" id="phone" name="phone" aria-describedby="phone"  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone}/>
                </div>
                {formik.touched.phone && formik.errors.phone? <div style={myStyle}>{formik.errors.phone}</div>: null}
                <div className="mb-3">
                    <label forhtml="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
                </div>
                {formik.touched.password && formik.errors.password? <div style={myStyle}>{formik.errors.password}</div>: null}
                <div className="mb-3">
                    <label forhtml="confirmPassword" className="form-label">Confirm password</label>
                    <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmPassword}/>
                </div>
                {formik.touched.confirmPassword && formik.errors.confirmPassword? <div style={myStyle}>{formik.errors.confirmPassword}</div>: null}
               <button type="submit" disabled={!formik.isValid} className="btn btn-primary">Sign Up</button>
            </form>
            <div className="my-3"><button onClick={()=>{let path = '/';history.push(path);}} disabled={!formik.isValid} className="btn btn-primary">Back to login page</button></div>
        </div>
        </div>
    )
}
