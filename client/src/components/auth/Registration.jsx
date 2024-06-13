import React from 'react';
import {useUser} from "../../stores/User";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import {MAIN_PATH} from "../../utils/const";

const Registration = () => {
    const {registrationUser} = useUser()

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')

    const navigate = useNavigate()

    const registration = () => {
        if (password !== confirmPassword) {
            return Swal.fire({
                title: 'Внимание!',
                text: 'Извините, Ваши пароли не совпадают!',
            })
        }

        const user = new FormData()
        user.append('email', email)
        user.append('password', password)
        user.append('roleId', 1)

        registrationUser(user).then(() => {
            navigate(MAIN_PATH)
            return Swal.fire({
                title: 'Внимание!',
                text: 'Добро пожаловать в семью!',
            })
        }).catch((error) => {
            return Swal.fire({
                title: 'Внимание!',
                text: error.response.data.message,
            })
        })
    }

    return (
        <div className="auth">
            <h1>
                Регистрация
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
            <div className="auth__input-container">
                <input className="auth__input"
                       type="password"
                       placeholder=" "
                       value={confirmPassword}
                       onChange={(e) => setConfirmPassword(e.target.value)}/>
                <label className="auth__label">
                    Повторите пароль
                </label>
            </div>
            <button className="auth__button"
                    onClick={registration}>
                Войти
            </button>
        </div>
    );
};

export default Registration;
