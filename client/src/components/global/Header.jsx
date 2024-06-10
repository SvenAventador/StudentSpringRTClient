import React from 'react';
import {NavLink} from "react-router-dom";
import {
    ACCOUNT_PATH,
    AUTH_PATH,
    CONTACT_PATH,
    DOCUMENT_PATH,
    MAIN_PATH,
    VENUES_PATH
} from "../../utils/const";
import leagueLogo from '../../assets/images/cat.png'
import cat from '../../assets/images/LeagueStudent.png'
import {useUser} from "../../stores/User";



const Header = () => {
    const {user} = useUser()
    return (
        <header className="header">
            <div className="container header__container">
                <div className="logo">
                    <NavLink to={MAIN_PATH}>
                        <img alt="header_logo"
                             src={leagueLogo}/>
                    </NavLink>
                </div>
                <nav className="header__nav">
                    <ul className="header__nav-list">
                        <li className="header__nav-item">
                            <NavLink className="link"
                                     to={MAIN_PATH}>
                                О фестивале
                            </NavLink>
                        </li>
                        <li className="header__nav-item">
                            <NavLink className="link"
                                     to={VENUES_PATH}>
                                Площадки
                            </NavLink>
                        </li>
                        <li className="header__nav-item">
                            <div className="logo">
                                <img alt="Лига студентов"
                                     src={cat}/>
                            </div>
                        </li>
                        <li className="header__nav-item">
                            <NavLink className="link"
                                     to={CONTACT_PATH}>
                                Контакты
                            </NavLink>
                        </li>
                        <li className="header__nav-item">
                            <NavLink className="link"
                                     to={DOCUMENT_PATH}>
                                Документы
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <NavLink className="link"
                         to={user ? ACCOUNT_PATH : AUTH_PATH}>
                    {user ? 'Личный кабинет' : 'Войти'}
                </NavLink>
            </div>
        </header>
    );
};

export default Header;
