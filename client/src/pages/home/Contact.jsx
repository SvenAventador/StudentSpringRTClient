import React from 'react';
import AdelinaRaimova from '../../assets/images/persons/AdelinaRaimova.png'
import AlenaOsyanina from '../../assets/images/persons/AlenaOsyanina.png'
import AliceKhusnutdinova from '../../assets/images/persons/AliceKhusnutdinova.png'
import ArthurRozanov from '../../assets/images/persons/ArthurRozanov.png'
import ElizabethGalieva from '../../assets/images/persons/ElizabethGalieva.png'
import EvaBatukova from '../../assets/images/persons/EvaBatukova.png'
import GulusaKavieva from '../../assets/images/persons/GulusaKavieva.png'
import MilanaKim from '../../assets/images/persons/MilanaKim.png'
import MingatinaGalina from '../../assets/images/persons/MingatinaGalina.png'
import PolinaKuzmina from '../../assets/images/persons/PolinaKuzmina.png'
import ReginaAkhunova from '../../assets/images/persons/ReginaAkhunova.png'
import ReginaShagieva from '../../assets/images/persons/ReginaShagieva.png'
import RuslanZinnurov from '../../assets/images/persons/RuslanZinnurov.png'
import {NavLink} from "react-router-dom";

const Contact = () => {
    const contacts = [
        {
            name: "Исполнительный директор — Ким Милана",
            phone: "+7-(987)-175-06-66",
            telegram: "@milano4kakim",
            image: MilanaKim
        },
        {
            name: "Руководитель Регламентно-протокольной службы — Мингатина Галина",
            phone: "+7-(962)-554-92-34",
            telegram: "@gali_mingatina",
            image: MingatinaGalina
        },
        {
            name: "Руководитель службы по работе с участниками — Хуснутдинова Алиса",
            phone: "+7-(906)-326-14-27",
            telegram: "@aiw_66",
            image: AliceKhusnutdinova
        },
        {
            name: "Руководитель Медиа — Шагиева Регина",
            phone: "+7-(927)-677-19-38",
            telegram: "@ginn8y",
            image: ReginaShagieva
        },
        {
            name: "Руководитель PR&Фандрайзинг — Кузьмина Полина",
            phone: "+7-(905)-313-68-74",
            telegram: "@mepollya",
            image: PolinaKuzmina
        },
        {
            name: "Руководитель направлений Медиа&Видео — Батюкова Ева",
            phone: "",
            telegram: "@itabave",
            image: EvaBatukova
        },
        {
            name: "Руководитель направлений Мода&АРТ — Гилева Елизавета",
            phone: "",
            telegram: "@wowowowowoe",
            image: ElizabethGalieva
        },
        {
            name: "Руководитель концертно-административной службы — Кавиева Гулюса",
            phone: "",
            telegram: "@glskka",
            image: GulusaKavieva
        },
        {
            name: "Руководитель службы по работе с экспертами — Ахунова Регина",
            phone: "",
            telegram: "@myuwerei",
            image: ReginaAkhunova
        },
        {
            name: "Руководитель технической группы — Зиннуров Руслан",
            phone: "",
            telegram: "@rouslzinn",
            image: RuslanZinnurov
        },
        {
            name: "Руководитель службы Программа — Раимова Аделина",
            phone: "",
            telegram: "@Raimbo17",
            image: AdelinaRaimova
        },
        {
            name: "Руководитель службы Логистика — Осянина Алёна",
            phone: "",
            telegram: "@Al_Rock9",
            image: AlenaOsyanina
        },
        {
            name: "Руководитель направления Общая программа ВУЗа — Розанов Артур",
            phone: "",
            telegram: "@Neikan1",
            image: ArthurRozanov
        },
    ];

    return (
        <div className="page contacts-page">
            <section>
                <div className="container contacts-page__container">
                    <h1>Исполнительная дирекция фестиваля</h1>
                    <div className="contacts">
                        <div className="contacts__list">
                            {
                                contacts.map((contact, index) => (
                                    <div key={index}
                                         className="contacts__item">
                                        <img src={contact.image}
                                             alt="Student Spring Main Person"/>
                                        <div className="contacts__item-content">
                                            <h3 className="contacts__item-title">
                                                {contact.name}
                                            </h3>
                                            <h5 className="contacts__item-subtitle">
                                                {contact.phone}
                                            </h5>
                                            <NavLink to={`https://t.me/` + contact.telegram.substring(1)} className="contacts__item-link">
                                                {contact.telegram}
                                            </NavLink>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
