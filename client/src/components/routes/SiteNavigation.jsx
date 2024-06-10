import React from "react";

import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";

import Main from "../../layout/Main";
import Home from "../../layout/Home";
import Auth from "../../layout/Auth";
import Account from "../../layout/Account";

import Front from "../../pages/home/Front";
import Venues from "../../pages/home/Venues";
import Contact from "../../pages/home/Contact";
import Document from "../../pages/home/Document";
import Authorization from "../../pages/auth/Authorization";
import Person from "../../pages/account/Person";
import Application from "../../pages/account/partials/Application";
import PersonMain from "../../pages/account/partials/Main";
import Profile from "../../pages/account/partials/Profile";
import Team from "../../pages/account/partials/Team";

import {
    ACCOUNT_PATH, ADMIN_PATH,
    APPLICATION_PATH,
    AUTH_PATH,
    CONTACT_PATH,
    DOCUMENT_PATH, INSPECTOR_PATH,
    MAIN_PATH,
    PROFILE_PATH,
    TEAM_PATH,
    VENUES_PATH
} from "../../utils/const";
import Administrator from "../../pages/admin/Administrator";
import Admin from "../../layout/Admin";
import Inspector from "../../layout/Inspector";
import Validators from "../../pages/inspector/Validators";
import Participants from "../../pages/admin/partials/Participants";


const SiteNavigation = createBrowserRouter(
    createRoutesFromElements(
        <Route path={MAIN_PATH}
               element={<Main/>}>

            <Route element={<Home/>}>
                <Route index
                       element={<Front/>}/>
                <Route path={VENUES_PATH}
                       element={<Venues/>}/>
                <Route path={CONTACT_PATH}
                       element={<Contact/>}/>
                <Route path={DOCUMENT_PATH}
                       element={<Document/>}/>
            </Route>

            <Route element={<Auth/>}>
                <Route path={AUTH_PATH}
                       element={<Authorization/>}/>
            </Route>

            <Route element={<Account/>}>
                <Route path={ACCOUNT_PATH}
                       element={<Person/>}>
                    <Route index
                           element={<PersonMain/>}/>
                    <Route path={PROFILE_PATH}
                           element={<Profile/>}/>
                    <Route path={TEAM_PATH}
                           element={<Team/>}/>
                    <Route path={APPLICATION_PATH}
                           element={<Application/>}/>
                </Route>
            </Route>

            <Route element={<Admin/>}>
                <Route path={ADMIN_PATH}
                       element={<Administrator/>}>
                    <Route index element={<Participants />} />
                </Route>
            </Route>

            <Route element={<Inspector/>}>
                <Route path={INSPECTOR_PATH}
                       element={<Validators/>}>

                </Route>
            </Route>
        </Route>
    )
)

export default SiteNavigation;
