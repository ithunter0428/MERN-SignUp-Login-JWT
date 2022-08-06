import React ,{useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import { useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Spinner } from 'react-bootstrap'


export default function Profile() {
    const [proData, setProdata] = useState({})
    const [loader, setLoader] = useState(true)
    const history = useHistory();

    useEffect(()=>{
        axios({
            method: 'get',
            url: 'http://localhost:4001/profile',
            headers: {
                "Content-Type":"application/json",
             'access-token': localStorage.getItem("token")
              }
          }).then(function(response){
              console.log("hello")
              let result = response.data.data[0];
              console.log(result)
              setProdata(result) 
              setLoader(false)          
          }).catch((error)=>{
            alert(JSON.stringify(error.response.data.message))
        });
    },[])
    
    useEffect(() => {
        formik.setFieldValue('fname', proData.firstname)
        formik.setFieldValue('lname', proData.lastname)
        formik.setFieldValue('email', proData.email)
        formik.setFieldValue('gender', proData.gender)
        formik.setFieldValue('phone', proData.phone)
    },[proData])
    

    const validationSchema = Yup.object({
        fname : Yup.string().matches(`^[a-zA-Z\\s]*$`,"Invalid First Name").required('Required!'),
        lname : Yup.string().matches(`^[a-zA-Z\\s]*$`,"Invalid Last Name").required('Required!'),
        email : Yup.string().email('Invalid email address').required('Required!'),
        gender :  Yup.string().required('Required!'),
        phone : Yup.string().matches('^[6-9]\\d{9}$',"Incorrect Number").required("Required")
    })
    
    const formik =  useFormik({
        initialValues:  {
            fname: "",
            lname:'',
            email: '',
            gender: '',
            phone:'',

        }
    ,
        onSubmit: (values) =>{
            axios({
                method: 'PATCH',
                url: 'http://localhost:4001/profile',
                data: {
                    firstname: values.fname,
                    lastname: values.lname,
                    email: values.email,
                    gender: values.gender,
                    phone: values.phone,
                },
                headers: {
                    'access-token': localStorage.getItem("token")
                  }
              }).then(function(response){
                  console.log(response.data.message);
                  routeChange();
              }).catch((error)=>{
                alert(JSON.stringify(error.response.data.message))
               
            });
            
        }, 
        validationSchema
    })

    const routeChange = () =>{
        let path = '/';
        history.push(path);
    }

    const myStyle = {
        color : 'red'
    }
    const routeLogout = ()=>{
        localStorage.clear()
        let path = '/';
        history.push(path);
    }
    
    
    return (
        <div>
            {loader?<Spinner animation="border" />:<><h1>Your Profile</h1>
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
                    <label forhtml="gender">Select gender</label>
                    <select className="form-select" aria-label="Default select example" id="gender" name="gender" value={formik.values.gender} onChange = {formik.handleChange} onBlur={formik.handleBlur}>
                        <option defaultValue value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="T">Transgender</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                {formik.touched.gender && formik.errors.gender? <div style={myStyle}>{formik.errors.gender}</div>: null}
                
                <div className="mb-3">
                    <label forhtml="mobileNumber" className="form-label">Mobile Number</label>
                    <input type="text" className="form-control" id="phone" name="phone" aria-describedby="emailHelp"  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone}/>
                </div>
                {formik.touched.phones && formik.errors.phone? <div style={myStyle}>{formik.errors.phone}</div>: null}
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
        <div className="my-3"><button onClick={routeLogout} className="btn btn-primary">Logout</button></div></>}
            
        </div>
    )
}


