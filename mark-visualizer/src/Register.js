import React, { useState } from "react";
import Axios from "axios";
import "./Register.css";
import logo from "./img/logo.png";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
    // Defining useStates
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [idReg, setIdReg] = useState("");

    const register = () => {
        // define variables username, password to use in backend
        try {
            Axios.post("http://localhost:3001/register", {
                username: usernameReg,
                password: passwordReg,
                id: idReg,
            }).then((response) => {
                console.log(response);
            });
            toast.success("User Registered Successfully");
        } catch {
            toast.warning("User already exists");
        }
    };

    // added later
    /* 
    useEffect(() => {
        Axios.get("http://localhost:3000/login").then((response) => {
            console.log(response);
        });
    }, []);
    */

    return (
        <div className="register">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="registerContainer">
                <img src={logo} alt="" className="web__logo" />
                <input
                    type="text"
                    placeholder="user ID"
                    name="usrId"
                    onChange={(e) => {
                        setIdReg(e.target.value);
                    }}
                />
                <input
                    type="text"
                    placeholder="username"
                    name="usrname"
                    onChange={(e) => {
                        setUsernameReg(e.target.value);
                    }}
                />
                <input
                    type="password"
                    placeholder="password"
                    name="passwd"
                    maxLength={13}
                    onChange={(e) => {
                        setPasswordReg(e.target.value);
                    }}
                />

                <button onClick={register} className="reg__registerButton">
                    Register
                </button>

                <br />
                <p style={{ margin: "auto" }} className="labelText">
                    Already Registered?
                </p>
                <br />
                <Link to="./login">
                    <button className="reg__signInButton">Login</button>
                </Link>
            </div>
        </div>
    );
}

export default Register;
