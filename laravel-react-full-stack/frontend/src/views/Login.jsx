import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useState, useRef } from "react";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login () {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);
    const {setUser, setToken} = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        axiosClient.post('/login', payload).then(({data})=>{
            setUser(data.user);
            setToken(data.token);
        }).catch(error =>{
            console.log("err", error)
            const response = error;
            if (response && response.status === 422){
                // Need to fix Display of error message
                if(response.data.errors){
                    setErrors(response.data.errors);
                }else{
                    setErrors({
                        email: [response.data.message]
                    })
                }
            }
        })
    }

    // Username: ff33@gmail.com
    // Password: ahmadawad123

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Login to your account</h1>
                    {
                        errors && <div className="alert">
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    }
                    <input ref={emailRef} type="email" placeholder="Email"/>
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Registered? <Link to="/signup">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}