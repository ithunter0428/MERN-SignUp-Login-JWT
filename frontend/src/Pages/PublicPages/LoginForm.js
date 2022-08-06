import React,{useState} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function LoginForm() {

    const history = useHistory();
    const [token, setToken] = useState("")
  
    const validationSchema = Yup.object({
        email : Yup.string().email('Invalid email address').required('Required!'),
        password : Yup.string().required('Required!'),
    })
    const formik =  useFormik({
        initialValues:  {
            email: '',
            password: ''
        },
        onSubmit: (values) =>{
            // console.log(values.email)
            axios({
                method: 'post',
                url: 'http://localhost:4001/login',
                headers: {"Content-Type":"application/json"},
                data: JSON.stringify({
                    email: values.email,
                    password: values.password
                })
              }).then(function(response){
                setToken(response.data.data.token)
                console.log(token)
                localStorage.setItem("token",response.data.data.token)
                routeChange()
              }).catch((error)=>{
                alert(JSON.stringify(error.response.data.message))
              });
        }, 
        validationSchema
        // validate
    })

    const routeChange = () =>{
        let path = '/auth/dashboard';
        history.push(path);
    }

    const myStyle = {
        color : 'red'
    }
    

    return (
        <div className='container my-3'>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                    <label forhtml="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp"  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
                </div>
                {formik.touched.email && formik.errors.email? <div style={myStyle}>{formik.errors.email}</div>: null}

                <div className="mb-3">
                    <label forhtml="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
                </div>
                {formik.touched.password && formik.errors.password? <div style={myStyle}>{formik.errors.password}</div>: null}
               <button type="submit" disabled={!formik.isValid} className="btn btn-primary">Login</button>
               <div className="my-3"><Link to='/signup'>Don't have account? Signup here</Link></div>
            </form>

        </div>
            
    )
}
