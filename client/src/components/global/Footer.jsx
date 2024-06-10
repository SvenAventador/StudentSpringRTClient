import React from 'react';
import telegram from '../../assets/images/Telegram.png'
import vk from '../../assets/images/VKontakte.png'
import {NavLink} from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer__container">
                <ul className="footer__list">
                    <li className="footer__item">
                        Техническая поддержка <NavLink to='https://t.me/aiw_66'>@aiw</NavLink>
                    </li>
                    <img src={telegram}
                         alt="Telegram"/>
                    <li className="footer__item">
                        Сотрудничество&nbsp;
                        <NavLink to='mailto:ligatatarstan@gmail.com'>
                            ligatatarstan@gmail.com
                        </NavLink>
                    </li>
                    <img src={vk} alt="Vkontakte"/>
                    <li className="footer__item">
                        Пресс служба&nbsp;
                        <NavLink to='mailto:studvesna.rt24@yandex.ru'>
                            studvesna.rt24@yandex.ru
                        </NavLink>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
