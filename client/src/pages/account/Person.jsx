import React from 'react';
import {useUser} from "../../stores/User";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {MAIN_PATH} from "../../utils/const";
import Main from "./partials/Main";
import {
    AppstoreAddOutlined,
    HomeOutlined, LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TeamOutlined, UnorderedListOutlined,
    UserOutlined
} from "@ant-design/icons";
import {
    Button,
    Layout,
    Menu
} from "antd";
import Sider from "antd/es/layout/Sider";
import Profile from "./partials/Profile";
import Team from "./partials/Team";
import Application from "./partials/Application";
import Document from "./partials/Document";

const Person = () => {
    const history = useNavigate()

    const [collapsed, setCollapsed] = React.useState(false)
    const toggleCollapsed = () => {
        setCollapsed(!collapsed)
    }

    const [selectedMenuItem, setSelectedMenuItem] = React.useState('main')
    let {
        logoutUser
    } = useUser()

    const handleLogout = () => {
        logoutUser().then(() => {
            Swal.fire({
                title: "Внимание",
                text: 'До скорых встреч, друг! Ждем тебя снова! ❤️',
                icon: "success"
            }).then(() => {
                history(MAIN_PATH);
            })
        })
    }

    return (
        <Layout style={{
            height: '100vh',
            overflow: 'auto'
        }}>
            <Sider collapsible
                   style={{
                       background: '#19025c'
                   }}
                   width={500}
                   collapsed={collapsed}>
                <div className={collapsed ? 'menu-header-collapsed' : ''}>
                    <Button type="text"
                            onClick={toggleCollapsed}
                            className="collapse-button"
                            style={{
                                backgroundColor: '#fff',
                                width: '80px',
                                marginRight: '1rem',
                                marginBottom: '.5rem'
                            }}>
                        {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                    </Button>
                </div>

                <Menu defaultSelectedKeys={['1']}
                      mode="inline"
                      style={{
                          backgroundColor: '#19025c'
                      }}>
                    <Menu.Item key="1"
                               icon={<HomeOutlined/>}
                               onClick={() => setSelectedMenuItem('main')}
                               style={{
                                   color: '#fff'
                               }}>
                        Главная
                    </Menu.Item>
                    <Menu.Item key="2" icon={<UserOutlined/>}
                               onClick={() => setSelectedMenuItem('profile')}
                               style={{
                                   color: '#fff'
                               }}>
                        Профиль
                    </Menu.Item>
                    <Menu.Item key="3"
                               icon={<TeamOutlined/>}
                               onClick={() => setSelectedMenuItem('team')}
                               style={{
                                   color: '#fff'
                               }}>
                        Команда
                    </Menu.Item>
                    <Menu.Item key="4"
                               icon={<AppstoreAddOutlined/>}
                               onClick={() => setSelectedMenuItem('application')}
                               style={{
                                   color: '#fff'
                               }}>
                        Заявки
                    </Menu.Item>
                    <Menu.Item key="5"
                               icon={<UnorderedListOutlined />}
                               onClick={() => setSelectedMenuItem('document')}
                               style={{
                                   color: '#fff'
                               }}>
                        Сформированные документы для участия
                    </Menu.Item>
                    <Menu.Item key="6"
                               icon={<LogoutOutlined/>}
                               onClick={handleLogout}
                               style={{
                                   color: '#fff'
                               }}>
                        Выход
                    </Menu.Item>
                </Menu>

            </Sider>
            <Layout className="site-layout"
                    style={{
                        height: '100%',
                        backgroundColor: '#19064b',
                        overflow: 'auto'
                    }}>
                <Layout.Content style={{
                    minHeight: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{
                        flex: 1,
                    }}>
                        {selectedMenuItem === 'main' && <Main/>}
                        {selectedMenuItem === 'profile' && <Profile/>}
                        {selectedMenuItem === 'team' && <Team/>}
                        {selectedMenuItem === 'application' && <Application/>}
                        {selectedMenuItem === 'document' && <Document />}
                    </div>
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default Person;
