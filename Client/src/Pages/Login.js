import React, { useState } from "react";
import Header from "../components/Header";
import './css/Login.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';

const Login = () => {

    const [cookies, setCookies] = useCookies(["cookie-name"])

    const Nav = useNavigate()

    const [Rotate, setRotate] = useState("")

    const [PwdState, setPwdState] = useState("password")
    const [iconState, setIcon] = useState("fa-solid fa-eye")

    const ChangeType = () => {
        if (PwdState === "password") {
            setPwdState("text")
            setIcon("fa-solid fa-eye-slash")
        }
        else {
            setPwdState("password")
            setIcon("fa-solid fa-eye")
        }
    }

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const [ErrE, setErrE] = useState("")
    const [ErrP, setErrP] = useState("")

    const LoginUser = (e) => {
        e.preventDefault()
        setErrE("")
        setErrP("")

        if (Email === "") {
            setErrE('Enter your Email')
        }

        else if (Password === "") {
            setErrP("Enter your password")
        }

        else {
            try {
                axios.post('http://localhost:3001/Auths/Login', {
                    Email: Email,
                    Password: Password
                }, { withCredentials: true })

                .then((res) => {
                    if (res.data === "Login success") {
                        toast.success("Login Success", {
                            position: 'top-center'

                        })

                        Nav('/')

                    }
                    else if (res.data === "Incorrect Password") {
                        toast.error("Incorrect Password", {
                            position: 'top-center'
                        })
                    }

                    else if (res.data === "No such user") {
                        toast.error("No such user", {
                            position: 'top-center'
                        })
                    }
                })
            }
            catch (error) {
                toast.error("No user")
            }
        }

    }
    if (cookies.jwt1) {
        toast.error("Already Loggedin", {
            position: 'top-center'
        })
        window.location.href = '/'
    }

    else {
        return (
            <div>
                <Header />
                <div className="Login-outer" style={{ animation: `${Rotate} 1s ease-in` }}>
                    <form className="Login-card" onSubmit={LoginUser}>
                        <div className="Login-sec2">
                            <h3 className="Login-heading">Login</h3>
                            <label>Email</label>
                            <input className="Login-input" onChange={(e) => setEmail(e.target.value)} />
                            <p style={{ color: "red" }}>{ErrE}</p>
                            <label>Password</label>
                            <div className="Pwd-block">
                                <input type={PwdState} className="Login-input-pwd" onChange={(e) => setPassword(e.target.value)} />
                                <i class={iconState} style={{ cursor: 'pointer' }} onClick={ChangeType} />
                            </div>
                            <p style={{ color: "red" }}>{ErrP}</p>
                        </div>
                        <div className="Login-sec3">
                            <p className="Login-ptag">Not a user</p>
                            <p className="Login-ptag" style={{ color: 'dodgerblue', cursor: 'pointer' }} onClick={() => {
                                setRotate("Rotate"); setTimeout(() =>
                                    Nav('/Signup'), 1000)
                            }}>Signup</p>
                        </div>
                        <button className="Login-btn-inside" type="submit">Login</button>
                    </form>
                </div>
            </div>
        )
    }
}

const Signup = () => {
    const Nav = useNavigate()
    const [PwdState, setPwdState] = useState("password")
    const [iconState, setIcon] = useState("fa-solid fa-eye")


    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [UserName, setUserName] = useState("")


    const [ErrE, setErrE] = useState("")
    const [ErrP, setErrP] = useState("")

    const ChangeType = () => {
        if (PwdState === "password") {
            setPwdState("text")
            setIcon("fa-solid fa-eye-slash")
        }
        else {
            setPwdState("password")
            setIcon("fa-solid fa-eye")
        }
    }

    const RegisterUser = (e) => {
        e.preventDefault()
        setErrE("")
        setErrP("")
        let atPos = Email.indexOf("@")
        let dotPos = Email.indexOf(".")
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
        if (Email === "") {
            setErrE('Enter your Email')
        }
        else if (atPos < 1 || dotPos < (atPos + 2)) {
            setErrE('Enter proper Email')
        }
        else if (Password === "") {
            setErrP("Enter your password")
        }
        else if (!passwordPattern.test(Password)) {
            setErrP("Password must contain at least 8 characters, one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*)")
        }
        else {
            try {
                axios.post('http://localhost:3001/Auths/Register', {
                    Email: Email,
                    Password: Password,
                    userName: UserName
                }, { withCredentials: true })

                .then((res) => {
                    if (res.data === "User added") {
                        toast.success("User Added", {
                            position: 'top-center'
                        })
                        Nav('/')

                    }
                    else if (res.data === "User already exist") {
                        toast.error("User already exist", {
                            position: 'top-center'
                        })
                    }
                })
            }
            catch (error) {
                toast.error("User not added")
            }
        }

    }

    return (
        <div>
            <Header />
            <div className="Login-outer">
                <form className="Signup-card" onSubmit={RegisterUser}>
                    <div className="Login-sec2">
                        <h3 className="Login-heading">Signup</h3>
                        <label>Email</label>
                        <input type='email' className="Login-input" onChange={(e) => setEmail(e.target.value)} />
                        <p style={{ color: "red",margin:'2px' }}>{ErrE}</p>
                        <label>User Name</label>
                        <input type='text' className="Login-input" onChange={(e) => setUserName(e.target.value)} />
                        <label>Password</label>
                        <div className="Pwd-block">
                            <input type={PwdState} className="Login-input-pwd" onChange={(e) => setPassword(e.target.value)} />
                            <i class={iconState} style={{ cursor: 'pointer' }} onClick={ChangeType} />
                        </div>
                        <p style={{ color: "red" }}>{ErrP}</p>
                    </div>
                    <div className="Login-sec3">
                        <p className="Login-ptag">Already have an account</p>
                        <p className="Login-ptag" style={{ color: 'dodgerblue', cursor: 'pointer' }} onClick={() => Nav('/Login')}>Login</p>
                    </div>
                    <button className="Login-btn-inside" type="submit">Create Account</button>
                </form>
            </div>
        </div>
    )
}


export { Login, Signup }