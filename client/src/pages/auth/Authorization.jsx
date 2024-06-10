import React from 'react';
import leagueLogo from '../../assets/images/LeagueStudent.png'
import {NavLink} from "react-router-dom";
import {MAIN_PATH} from "../../utils/const";
import Login from "../../components/auth/Login";
import Registration from "../../components/auth/Registration";

const Authorization = () => {
    const [isLoginForm, setIsLoginForm] = React.useState(true)
    const switchAuthForm = () => setIsLoginForm(!isLoginForm)

    return (
        <div className="auth-page">
            <div className="auth-page__background"></div>
            <div className="auth-page__form-container">
                <NavLink to={MAIN_PATH}>
                    <img src={leagueLogo}
                         alt="League Student"/>
                </NavLink>

                {
                    isLoginForm ? <Login/> : <Registration/>
                }

                <button className="btn-reset"
                        onClick={switchAuthForm}>
                    {
                        isLoginForm ? 'Нет аккаунта? Зарегистрируйтесь!' : 'Есть аккаунт? Войдите!'
                    }
                </button>

            </div>
        </div>
    );
};

export default Authorization;
