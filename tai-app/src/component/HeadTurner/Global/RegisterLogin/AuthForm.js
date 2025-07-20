import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "./AuthForm.css";
import Banner from "../Banner/Banner";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div>
            <Banner menu="Đăng nhập - Đăng ký" img="https://t3.ftcdn.net/jpg/03/12/39/56/360_F_312395691_JwZk1L4P2dPbuqS32IApNipW95v20NnA.jpg"></Banner>
            <div className="auth-container">
                <div className="auth-tabs">
                    <span className={!isLogin ? "tab" : "tab active"} onClick={() => setIsLogin(false)}>
                        Đăng nhập
                    </span>
                    <span className={isLogin ? "tab" : "tab inactive"} onClick={() => setIsLogin(true)}>
                        Đăng ký
                    </span>
                </div>
                {isLogin ? <RegisterForm /> : <LoginForm />}
            </div>
        </div>
    );
};

export default AuthForm;
