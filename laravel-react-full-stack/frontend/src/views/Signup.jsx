import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup () {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPassRef = useRef();

    const {setUser, setToken} = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: confirmPassRef.current.value
        }

        console.log(payload)
        axiosClient.post('/signup', payload).then(({data})=>{
            console.log(data)
            setToken(data.token);
            setUser(data.user);
        }).catch(error =>{
            console.log(error)
            const response = error.response;
            if(response && response.status === 422){ // Validation error
                console.log(response.data.errors);
            }
        })
    }

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Signup to your account</h1>
                    <input ref={nameRef} placeholder="Full Name" />
                    <input ref={emailRef} type="email" placeholder="Email Address"/>
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <input ref={confirmPassRef} type="password" placeholder="Password Confirmation" />
                    <button className="btn btn-block">Signup</button>
                    <p className="message">
                        Already Registered? <Link to="/login">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}