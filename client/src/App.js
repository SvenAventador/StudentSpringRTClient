import React from 'react';
import {RouterProvider} from "react-router-dom";
import SiteNavigation from "./components/routes/SiteNavigation";
import {useUser} from "./stores/User";
import logo from "./assets/images/LeagueStudent.png"

const App = () => {
    const [isLoading, setIsLoading] = React.useState(true)
    const {checkUser} = useUser()

    React.useEffect(() => {
        if (localStorage.getItem('token')) {
            setTimeout(() => {
                checkUser().finally(() => {
                    setIsLoading(false)
                })
            }, 2500)
        } else {
            setTimeout(() => {
                setIsLoading(false)
            }, 2500)
        }
    }, [checkUser])

    if (isLoading) {
        return <div className="loader">
            <img src={logo}
                 width="150px"
                 height="200px"
                 alt="Logo"/>
        </div>
    }

    return <RouterProvider router={SiteNavigation}/>
};

export default App;
