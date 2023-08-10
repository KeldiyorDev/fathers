import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertContent, { Alert } from '../../components/Alert';
import { url } from '../../utils/config';

function Login() {
    const [alert, setAlert] = useState({ open: false, color: "", text: "" });
    const [show, setShow] = useState(false)

    const loginRef = useRef()
    const passwordRef = useRef()

    const navigate = useNavigate()

    const login = (e) => {
        e.preventDefault()
        axios.get(`${url}/TumanXTB/Login?login=${loginRef.current.value}&password=${passwordRef.current.value}`)
            .then((res) => {
                // localStorage.setItem("user", JSON.stringify(jwt_decode(res.data.access_token)))
                console.log(res.data);
                localStorage.setItem("user", JSON.stringify(res.data));
                navigate("/unread")
            }).catch((err) => {
                Alert(setAlert, "danger", "login yoki parolda xatolik");
            })
    }

    return (
        <div class="p-0">
            <div className="authentication-wrapper authentication-basic container-p-y">
                <div className="authentication-inner">
                    <div className="card" style={{position: "absolute",width: "40%", margin: "0 auto", top: "50%", left:"50%", transform: "translate(-50%, -50%)"}}>
                        <div className="card-body">
                            {/* <div className="app-brand justify-content-center pb-0 mb-2">
                                <img src="../assets/img/logo.png" alt="" height={"150px"} />
                            </div> */}
                            <h4 className="mb-2 justify-content-center text-center" style={{ color: "#152b03", fontWeight: "700" }}>Otalar reytingiga kirish</h4>
                            <form onSubmit={login}>
                                <div className="mb-3">
                                    <label for="email" className="form-label" style={{ color: "#152b03", fontWeight: "700" }}>Login</label>
                                    <input
                                        ref={loginRef}
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        name="email-username"
                                        placeholder="loginni kiriting"
                                        autofocus
                                    />
                                </div>
                                <div className="mb-3 form-password-toggle">
                                    <div className="d-flex justify-content-between">
                                        <label className="form-label" for="password" style={{ color: "#152b03", fontWeight: "700" }}>Parol</label>
                                        {/* <a href="auth-forgot-password-basic.html">
                                            <small>Forgot Password?</small>
                                        </a> */}
                                    </div>
                                    <div className="input-group input-group-merge">
                                        <input
                                            ref={passwordRef}
                                            type={show ? "text" : "password"}
                                            id="password"
                                            className="form-control"
                                            name="password"
                                            placeholder="Parolni kiriting"
                                            aria-describedby="password"
                                        />
                                        <span className="input-group-text cursor-pointer"
                                            onClick={() => setShow(!show)}>
                                            {
                                                show ? <i className="bx bx-show"></i> : <i className="bx bx-hide"></i>
                                            }
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-0">
                                    <button className="btn btn-primary d-grid w-100 mb-0" type="submit">Kirish</button>
                                </div>
                            </form>

                            {/* <p className="text-center">
                                <span>New on our platform?</span>
                                <a href="auth-register-basic.html">
                                    <span>Create an account</span>
                                </a>
                            </p> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* alert */}
            <AlertContent alert={alert} />
        </div>
    )
}

export default Login