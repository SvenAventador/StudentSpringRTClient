import React from 'react';
import UNICS from '../../assets/images/UNICS.png'
import VRSUPCST from '../../assets/images/VRSUPCST.png'

const Venues = () => {
    return (
        <div className="page venues-page">
            <section>
                <div className="container venues-page__container">
                    <h1>Наши площадки</h1>
                    <div className="venue">
                        <div className="venue__image">
                            <img src={UNICS}
                                 alt="УНИКС" />
                        </div>
                        <div className="venue__details">
                            <h3 className="venue__title">
                                УНИКС
                            </h3>
                            <ul className="venue__details-list">
                                <li className="venue__details-item">
                                    Общая площадь --{" "}
                                    <span>
                                        1 600 м<sup>2</sup>
                                     </span>{" "}
                                </li>
                                <li className="venue__details-item">
                                    Посадочных мест -- <span>1 060</span>
                                </li>
                                <li className="venue__details-item">
                                    Сцена -- <span>15х8 м</span>
                                </li>
                                <li className="venue__details-item">
                                    Покрытие сцены -- <span>резина</span>
                                </li>
                                <li className="venue__details-item">
                                    Адрес -- ул.Профессора Нужина, 2
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="venue">
                        <div className="venue__image">
                            <img src={VRSUPCST}
                                 alt="ПГУФКСиТ" />
                        </div>
                        <div className="venue__details">
                            <h3 className="venue__title">
                                ПГУФКСиТ
                            </h3>

                            <ul className="venue__details-list">
                                <li className="venue__details-item">
                                    Общая площадь --{" "}
                                    <span>
                                        1 600 м<sup>2</sup>
                                    </span>{" "}
                                </li>
                                <li className="venue__details-item">
                                    Посадочных мест -- <span>1 217</span>
                                </li>
                                <li className="venue__details-item">
                                    Сцена -- <span>15х8 м</span>
                                </li>
                                <li className="venue__details-item">
                                    Покрытие сцены -- <span>дерево</span>
                                </li>
                                <li className="venue__details-item">
                                    Адрес -- Деревня Универсиады, 35
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Venues;
