
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import '../../styles/login.scss'
import Input from '../../components/form/Input';
import { useFormik } from 'formik';
import { LoginValidation } from "./../../validations/AuthValidators";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoginMutation } from '../../store/user/api';
import { NotifyAlert } from '../../utils/NotifyAlert';
import Navbar from 'react-bootstrap/Navbar';
import { saveToken, saveUserData, getToken } from '../../utils/LocalStorage';



const Login = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if(getToken() !== null){
        navigate('/user')
    }
  

},[]);

    const [loginUser, { isLoading }] = useLoginMutation();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { values, errors, handleSubmit, setFieldValue, touched } = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: LoginValidation,
        onSubmit: () => initRequest()
    })

        

    const initRequest = () => {
        loginUser(values)
        .unwrap()
        .then((res) => {
            if(res.success){
                NotifyAlert(res.response, 'success')
                saveToken(res.token);
                saveUserData(res.data)
                navigate('/user')
            }else{
                NotifyAlert(res.response, 'error')
            }
        })
        .catch((e) => {
            if(e.data && e.data !== null){
            NotifyAlert(e.data.message, 'error')
            }else{
            NotifyAlert('No server response, Server error', 'error')
            }
        });
    }


    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setFieldValue(name, value)
    }



    const goToSignUp = () => {
        navigate('/auth/register')
    }




return (
        <>
            <div className='mt-5'>
                <div className='row'>
                    <div className='col-md-3 col-12'></div>
                    <div className='col-md-6 col-12'>
                        <div className='form-section'>
                            <div>
                                <h3 className='basic-info'>Log In</h3>
                                <p>Welcome back! Please enter your details.</p>
                            </div>
                        
                            <div className='form-wrapper'>
                                <div className='row mt-1'>
                                    <div className='col-md-12 col-12'>
                                    <Input
                                        type="text"
                                        label="Email"
                                        value={values.email}
                                        name="email"
                                        error={Boolean(errors.email)}
                                        errorText={errors.email}
                                        onChange={handleChange}
                                        placeholder="Please enter your email"
                                    />
                                    </div>
                                </div>
                                <div className='row mt-1'>
                                    <div className='col-md-12 col-12'>
                                    <Input
                                        type="password"
                                        label="Password*"
                                        value={values.password}
                                        name="password"
                                        error={Boolean(errors.password)}
                                        errorText={errors.password}
                                        onChange={handleChange}
                                        placeholder="Please enter your password"
                                        showPasswordIcon={true}
                                    />
                                    </div>
                                </div>
                            </div>

                            <div className='text-center mt-3'>
                                <button disabled={isLoading} onClick={() => {handleSubmit()}} className='btn-block signup-btn'>
                                    { !isLoading ? <><span>Sign In</span></>  : <><span><div className="spinner-border text-light spinner-border-sm"></div></span></> }
                                </button>
                                <p className='already-text'>
                                    Don't have an account ?
                                    <span className='' onClick={() => {goToSignUp()}}>Sign Up</span>
                                </p>
                            </div>

                            <div className='footer-wrapper'>
                                <div>
                                    <p>© Untitled UI 2077</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
)

 



}

export default Login

