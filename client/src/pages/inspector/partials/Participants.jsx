import React from 'react';
import {getAllProfile, updateAccountStatus, updateParticipant, updateProfile} from "../../../http/admin";
import {Button, Input, Modal, Select, Space, Table} from "antd";
import {NavLink} from "react-router-dom";
import Swal from "sweetalert2";
import {getOne} from "../../../http/profile";
import {deleteOne, getOne as oneGet} from "../../../http/participant";
import PhoneInput from "react-phone-input-2";

const {Option} = Select;

const Participants = () => {
    const [profiles, setAllProfiles] = React.useState([]);
    const [selectedParticipant, setSelectedParticipant] = React.useState(null);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [rejectReason, setRejectReason] = React.useState('');

    const [mainModal, setMainModal] = React.useState(false)
    const [middleModal, setMiddleModal] = React.useState(false)
    const [oneProfile, setOneProfile] = React.useState()
    const [oneParticipant, setOneParticipant] = React.useState();
    const [mainId, setMainId] = React.useState()
    const [middleId, setMiddleId] = React.useState();
    const showMainModal = id => {
        setMainId(id)
        getOne(id).then((data) => {
            setOneProfile(data)
        })
        setMainModal(true)
    }

    const showMiddleModal = id => {
        setMiddleId(id)
        oneGet(id).then((data) => {
            setOneParticipant(data)
        })
        setMiddleModal(true)
    }

    const closeMainModal = () => {
        getAllProfile().then((data) => {
            setAllProfiles(data);
        });
        setMainModal(false)
    }
    const closeMiddleModal = () => {
        getAllProfile().then((data) => {
            setAllProfiles(data);
        });
        setMiddleModal(false)
    }


    const updateMainData = () => {
        const profile = new FormData()
        profile.append('id', mainId)
        profile.append('phone', mainPhone)
        profile.append('telegramLink', mainTg)

        updateProfile(profile).then(() => {
            getAllProfile().then((data) => {
                console.log(data);
                setAllProfiles(data);
            });
            setMainModal(false)
            return Swal.fire({
                icon: 'success',
                title: 'Внимание!',
                text: 'Поздравляем с успешным действием!'
            })


        }).catch((error) => {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: error.response.data.message
            })
        })
    }
    const updateMiddleData = () => {
        const participant = new FormData()
        participant.append('id', middleId)
        participant.append('phone', middlePhone)
        participant.append('telegramLink', middleTg)
        participant.append('email', middleEmail)
        updateParticipant(participant).then(() => {
            getAllProfile().then((data) => {
                console.log(data);
                setAllProfiles(data);
            });
            setMiddleModal(false)
            return Swal.fire({
                icon: 'success',
                title: 'Внимание!',
                text: 'Поздравляем с успешным действием!'
            })


        }).catch((error) => {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: error.response.data.message
            })
        })
    }


    const [mainPhone, setMainPhone] = React.useState(oneProfile?.phone)
    const [mainTg, setMainTg] = React.useState(oneProfile?.telegramLink)

    const [middlePhone, setMiddlePhone] = React.useState(oneParticipant?.phone)
    const [middleTg, setMiddleTg] = React.useState(oneParticipant?.telegramLink)
    const [middleEmail, setMiddleEmail] = React.useState(oneParticipant?.phone)

    React.useEffect(() => {
        if (oneProfile) {
            setMainPhone(oneProfile.phone || '');
            setMainTg(oneProfile.telegramLink || '');
        }
    }, [oneProfile]);

    React.useEffect(() => {
        if (oneParticipant) {
            setMiddlePhone(oneParticipant?.phone || '')
            setMiddleTg(oneParticipant?.telegramLink || '')
            setMiddleEmail(oneParticipant?.email || '')
        }
    }, [oneParticipant]);

    React.useEffect(() => {
        getAllProfile().then((data) => {
            console.log(data);
            setAllProfiles(data);
        });
    }, []);

    const handleSelectChange = (value, record) => {
        if (value === '3') {
            setSelectedParticipant(record);
            setModalVisible(true);
        } else {
            updateAccountStatus(record.id, value, null).then(() => {
                getAllProfile().then((data) => {
                    setAllProfiles(data);
                });
                Swal.fire({
                    title: 'Внимание!',
                    text: 'Поздравляем с успешным изменением статуса аккаунта!',
                    icon: "success"
                });
            });
        }
    };

    const handleSaveRejectReason = async () => {
        try {
            updateAccountStatus(selectedParticipant.id, 3, rejectReason).then(() => {
                getAllProfile().then((data) => {
                    console.log(data);
                    setAllProfiles(data);
                });
                Swal.fire({
                    title: 'Внимание!',
                    text: 'Поздравляем с успешным изменением статуса аккаунта!',
                    icon: "success"
                });
            });
            setModalVisible(false);
            setSelectedParticipant(null);
            setRejectReason('');
        } catch (error) {
            console.error('Ошибка при сохранении причины отклонения:', error);
        }
    };

    const columns = [
        {
            title: 'Фамилия',
            dataIndex: 'surname',
            key: 'surname',
        },
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Отчество',
            dataIndex: 'patronymic',
            key: 'patronymic',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Телеграм',
            dataIndex: 'telegramLink',
            key: 'telegramLink',
            render: (text, record) => <NavLink to={`${record.telegramLink}`}>{text}</NavLink>
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Button style={{
                    backgroundColor: 'orange',
                    color: 'white'
                }}
                        onClick={() => showMainModal(record.id)}>
                    Изменить данные
                </Button>
            )
        }
    ];

    const expandedSecondRowRender = (record) => {
        return (
            <>
                <p>Дата рождения: {record.birthday}</p>
                <p>Почта: {record.email}</p>
                <p>Телефон: {record.phone}</p>
                <p>Место учебы / работы: {record.placeOfStudyOfWork}</p>
                <p>Специальность: {record.specialization}</p>
                {
                    record.positionOrStudyDocument.includes('.png') ? (
                        <>
                            <p>
                                Справка с места учебы: <NavLink
                                to={process.env.REACT_APP_API_PATH + record.positionOrStudyDocument}>просмотреть</NavLink>
                            </p>
                        </>
                    ) : (
                        <p>Должность: {record.positionOrStudyDocument}</p>
                    )
                }
                {
                    record.participant_comments.length > 0 ? (
                        <p>Причина отклонения: {record.participant_comments[0].status}</p>
                    ) : null

                }
            </>
        )
    };

    const expandedRowRender = (record) => {
        const column = [
            {
                title: 'Surname',
                dataIndex: 'surname',
                key: 'surname',
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Patronymic',
                dataIndex: 'patronymic',
                key: 'patronymic',
            },
            {
                title: 'Phone',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: 'Телеграм',
                dataIndex: 'telegramLink',
                key: 'telegramLink',
                render: (_, record) => (
                    <NavLink to={`${record.telegramLink}`}>{record.telegramLink}</NavLink>
                )
            },
            {
                title: 'Status',
                dataIndex: 'account_status',
                key: 'account_status',
                render: (_, record) => (
                    <Select defaultValue={record.account_status.status}
                            onChange={(value) => handleSelectChange(value, record)}
                            style={{width: 120}}>
                        <Option value="2">На проверке</Option>
                        <Option value="3">Отклонено</Option>
                        <Option value="4">Принято</Option>
                    </Select>
                ),
            },
            {
                title: '',
                dataIndex: 'actions',
                key: 'actions',
                render: (_, record) => (
                    <Space size={"large"}>
                        <Button style={{
                            backgroundColor: 'orange',
                            color: 'white'
                        }}
                                onClick={() => showMiddleModal(record.id)}>
                            Изменить данные
                        </Button>
                        <Button style={{
                            backgroundColor: 'red',
                            color: 'white'
                        }}
                                onClick={() => {
                                    deleteOne(record.id).then(() => {
                                        getAllProfile().then((data) => {
                                            setAllProfiles(data);
                                        });
                                        return Swal.fire({
                                            title: 'Внимание!',
                                            text: 'Поздравляем с успешынм удалением участника!',
                                            icon: "success"
                                        })
                                    })
                                }}>
                            Удалить данные
                        </Button>
                    </Space>

                )
            }
        ];

        return (
            <Table
                dataSource={record.participants}
                columns={column}
                rowKey="id"
                expandable={{expandedRowRender: expandedSecondRowRender}}
            />
        );
    };

    return (
        <>
            <Table
                dataSource={profiles}
                columns={columns}
                rowKey="id"
                expandable={{expandedRowRender}}
                pagination={{
                    defaultPageSize: 5,
                    showSizeChanger: false
                }}
            />
            <Modal
                title="Укажите причину отклонения"
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => {
                        setModalVisible(false)
                        getAllProfile().then((data) => {
                            console.log(data);
                            setAllProfiles(data);
                        });
                    }}>Отмена</Button>,
                    <Button key="save" type="primary" onClick={handleSaveRejectReason}>Сохранить</Button>,
                ]}
            >
                <Input.TextArea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    rows={4}
                    placeholder="Введите причину отклонения"
                />
            </Modal>
            <Modal title="Изменить данные руководителя"
                   open={mainModal}
                   footer={[
                       <Button style={{
                           backgroundColor: 'red',
                           color: "white"
                       }}
                               onClick={closeMainModal}>
                           Отмена
                       </Button>,
                       <Button onClick={updateMainData}
                               style={{
                                   backgroundColor: "green",
                                   color: 'white'
                               }}>
                            Сохранить изменения
                       </Button>
                   ]}
            >
                <PhoneInput country={'ru'}
                            placeholder="+7 (123) 456-78-90"
                            value={mainPhone}
                            onChange={setMainPhone}/>
                <Input placeholder="Новый телеграм"
                       value={mainTg}
                       onChange={(e) => setMainTg(e.target.value)}/>
            </Modal>

            <Modal title="Изменить данные участника"
                   open={middleModal}
                   footer={[
                       <Button style={{
                           backgroundColor: 'red',
                           color: "white"
                       }}
                               onClick={closeMiddleModal}>
                           Отмена
                       </Button>,
                       <Button onClick={updateMiddleData}
                               style={{
                                   backgroundColor: "green",
                                   color: 'white'
                               }}>
                           Сохранить изменения
                       </Button>
                   ]}
            >
                <PhoneInput country={'ru'}
                            placeholder="+7 (123) 456-78-90"
                            value={middlePhone}
                            onChange={setMiddlePhone}/>
                <Input placeholder="Новый телеграм"
                       value={middleTg}
                       onChange={(e) => setMiddleTg(e.target.value)}/>
                <Input placeholder="Новая почта"
                       value={middleEmail}
                       onChange={(e) => setMiddleEmail(e.target.value)}/>
            </Modal>
        </>
    );
};

export default Participants;
