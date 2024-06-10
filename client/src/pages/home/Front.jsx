import React from 'react';
import cat from '../../assets/images/big-cat.png'
import AKB from '../../assets/images/akb.png'
import ABD from '../../assets/images/abd.png'
import KuzlerClinic from '../../assets/images/KuzlerClinic.png'
import TalentsUniversity from '../../assets/images/TalentsUniversity.png'
import { NavLink, useNavigate } from 'react-router-dom';
import {useUser} from '../../stores/User.js'
import { ACCOUNT_PATH, AUTH_PATH } from '../../utils/const.js';
const Front = () => {
    const navigate = useNavigate()
    const {user} = useUser()
    const directions = [
        {
            title: "Вокальное",
            content: ["ООВО", "ПОО"],
        },
        {
            title: "Инструментальное",
            content: ["ООВО", "ПОО"],
        },
        {
            title: "Танцевальное",
            content: ["ООВО", "ПОО"],
        },
        {
            title: "Театральное",
            content: ["ООВО", "ПОО"],
        },
        {
            title: "Оригинальный жанр",
            content: ["ООВО", "ПОО"],
        },
        {
            title: "Медиа",
            content: ["ООВО", "ПОО"],
        },
        {
            title: "Видео",
            content: ["ООВО", "ПОО"],
        },
        {
            title: "Мода",
            content: ["ООВО", "ПОО"],
        },
        {
            title: "Арт",
            content: ["ООВО", "ПОО"],
        },
        {
            title: "Общая программа",
            content: ["ООВО", "ПОО"]
        }
    ]

    return (
        <div className="page home-page">
            <section>
                <div className="home-page__image">
                    <div className="container home-page__container">
                        <h1>
                            Студенческая Весна - <span>творчество</span> внутри тебя!
                        </h1>
                        <button className="btn"
                        onClick={() => {
                            user && user.isAuth ? navigate(ACCOUNT_PATH) : navigate(AUTH_PATH)
                        }}>
                            Подать заявку
                        </button>

                        <div className="home-page__history">
                            <div className="home-page__history-image">
                                <img src={cat}
                                     alt="Big Cat"/>
                            </div>
                            <div className="home-page__history-content">
                                <h3>
                                    XIII Республиканский фестиваль студенческого творчества
                                    «Студенческая весна Республики Татарстан» в 2024 году.
                                    Ежегодный фестиваль, проводимый в ВУЗах и ССУЗах, а также
                                    крупнейшая площадка для обмена и реализации творческих идей,
                                    проводимый в рамках реализации Программы поддержки и развития
                                    студенческого творчества «Российская студенческая весна»
                                </h3>
                                <NavLink className="btn"
                                         to={"https://studvesna.ruy.ru/about-program/"}>
                                    История Российской Студенческой Весны
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container home-page__container">
                    <div className="home-page__directions">
                        <h1>
                            Направления участия
                        </h1>
                        <div className="directions-list">
                            {
                                directions.map((direction, index) => (
                                    <div className="directions-item"
                                         key={index}>
                                        <h3 className="directions-item__title">
                                            {direction.title}
                                        </h3>
                                        <div className="directions-item__content">
                                            {
                                                direction.content.map((text, i) => (
                                                    <p className="text" key={i}>
                                                        {text}
                                                    </p>
                                                ))
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <NavLink className="btn"
                        to={"https://drive.google.com/drive/folders/1NMDnMvIbgjErm6noOslJ3Z1OR8FSvjF4"}>
                            Подробнее
                        </NavLink>
                    </div>
                </div>
            </section>

            <section>
                <div className="container home-page__container">
                    <div className="home-page__sponsors">
                        <h1>Наши спонсоры</h1>
                        <div className="sponsors__list">
                            <div className="sponsors__list">
                                <div className="sponsors__item">
                                    <img src={ABD}
                                         alt="АБД"/>
                                </div>
                                <div className="sponsors__item">
                                    <img src={AKB}
                                         alt="АК БАРС"/>
                                </div>
                                <div className="sponsors__item">
                                    <img src={TalentsUniversity}
                                         alt="ИНСТИТУТ ТАЛАНТОВ"/>
                                </div>
                                <div className="sponsors__item">
                                    <img src={KuzlerClinic}
                                         alt="КЮЗЛАР"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Front;
