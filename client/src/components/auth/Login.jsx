import React from 'react';
import {useUser} from "../../stores/User";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {MAIN_PATH} from "../../utils/const";

const Login = () => {
    const {loginUser} = useUser()

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const navigate = useNavigate()

    const login = () => {
        const user = new FormData()
        user.append('email', email)
        user.append('password', password)

        loginUser(user).then((data) => {
            navigate(MAIN_PATH)
            return Swal.fire({
                title: 'Внимание!',
                text: 'C возвращением в семью!',
                icon: "success"
            })
        }).catch((error) => {
            return Swal.fire({
                title: 'Внимание!',
                text: error.response.data.message,
                icon: "error"
            })
        })
    }

    return (
        <div className="auth">
            <h1>
                Авторизация
            </h1>
            <div className="auth__input-container">
                <input className="auth__input"
                       type="text"
                       placeholder=" "
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}/>
                <label className="auth__label">
                    Логин
                </label>
            </div>
            <div className="auth__input-container">
                <input className="auth__input"
                       type="password"
                       placeholder=" "
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       onKeyDown={(e) => {
                           if (e.key === ' ') {
                               e.preventDefault();
                           }
                       }}/>
                <label className="auth__label">
                    Пароль
                </label>
            </div>
            <button className= "auth__button"
                    onClick={login}>
                Войти
            </button>
        </div>
    );
};

export default Login;