import React from 'react';
import Title from "antd/es/typography/Title";
import {useUser} from "../../../stores/User";
import {deleteAll, deleteOne, getAll, getOne, updateStatus} from "../../../http/participant";
import {
    Button,
    Popconfirm,
    Space,
    Table
} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {
    getAllAccountStatuses,
    getAllParticipantStatuses
} from "../../../http/statuses";
import TeamModal from "./modal/TeamModal";
import Swal from "sweetalert2";

const Team = () => {
    const {user} = useUser()
    const [myTeam, setMyTeam] = React.useState([])
    const [participantStatus, setParticipantStatus] = React.useState([])
    const [accountStatus, setAccountStatus] = React.useState([])

    const [isActive, setIsActive] = React.useState(false)

    React.useEffect(() => {
        getAll(user.id).then((data) => {
            setMyTeam(data)
        })
    }, [user.id])

    React.useEffect(() => {
        getAllParticipantStatuses().then((data) => {
            setParticipantStatus(data)
        })

        getAllAccountStatuses().then((data) => {
            setAccountStatus(data)
        })
    }, [])

    const getStatusText = (id, statusArray) => {
        const status = statusArray.find((status) => status.id === id)
        return status ? status.status : 'Неизвестный статус'
    }

    const isAnyAccountStatusIdEqualTo1 = myTeam.some(team => (team.accountStatusId === 1 || team.accountStatusId === 3))

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
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
            title: '',
            key: 'actions',
            render: (record) => {
                return (
                    <Space size="large"
                           style={{
                               display: "flex",
                               flexFlow: "column"
                           }}>
                        {
                            myTeam.length === 0 || isAnyAccountStatusIdEqualTo1 ? (
                                <>
                                    <Button style={{
                                        background: 'orange',
                                        color: 'white'
                                    }}
                                            onClick={() => showModal(record.id)}>
                                        Изменить участника
                                    </Button>
                                    <Popconfirm title="Вы уверены, что хотите удалить этого участника?"
                                                okText="Да"
                                                onConfirm={() => {
                                                    deleteOne(record.id).then(() => {
                                                        getAll(user.id).then((data) => {
                                                            setMyTeam(data)
                                                        }).then(() => {
                                                            return Swal.fire({
                                                                icon: 'success',
                                                                title: 'Внимание!',
                                                                text: 'Поздравляем с успешным удалением участника!'
                                                            })
                                                        })
                                                    })
                                                }}
                                                cancelText="Отмена">
                                        <Button style={{
                                            backgroundColor: 'red',
                                            color: 'white'
                                        }}>
                                            Удалить участника
                                        </Button>
                                    </Popconfirm>
                                </>
                            ) : null
                        }
                    </Space>
                )
            }
        }
    ]

    const customEmptyText = (
        <div>
            <SearchOutlined style={{
                fontSize: 24,
                color: '#999'
            }}/>
            <p>Пустоватенько...</p>
        </div>
    )

    const expandedRowRender = (record) => {
        console.log(record)
        return (
            <div>
                <p>
                    <b>Email:</b> {record.email}
                </p>
                <p>
                    <b>Телефон:</b> {record.phone}
                </p>
                <p><b>Telegram: </b>
                    <a href={record.telegramLink}
                       target="_blank"
                       rel="noopener noreferrer">
                        {record.telegramLink}
                    </a>
                </p>
                <p>
                    <b>Место учебы/работы:</b> {record.placeOfStudyOfWork}
                </p>
                <p>
                    <b>Специализация:</b> {record.specialization}
                </p>
                <p>
                    <b>{record.positionOrStudyDocument.includes('.jpg') ? 'Документ, подствержающий учебу' : 'Должность'} </b>
                    {
                        record.positionOrStudyDocument.includes('.jpg') ? (
                            <a href={process.env.REACT_APP_API_PATH + record.positionOrStudyDocument}
                               target="_blank"
                               rel="noopener noreferrer">
                                Просмотреть
                            </a>
                        ) : (
                            <span>{record.positionOrStudyDocument}</span>
                        )
                    }
                </p>
                <p>
                    <b>Статус участника:</b> {getStatusText(record.participantStatusId, participantStatus)}
                </p>
                <p>
                    <b>Статус аккаунта:</b>
                    <span style={{color: record.accountStatusId === 1 ? 'gray' : record.accountStatusId === 2 ? 'orange' : record.accountStatusId === 3 ? 'red' : 'green'}}>
                        {getStatusText(record.accountStatusId, accountStatus)}
                    </span>
                </p>
                {
                    record.participant_comments.length > 0 ? (
                        <p>Причина отклонения: {record.participant_comments[0].status}</p>
                    ) : null

                }
            </div>
        )
    }

    const [oneParticipant, setOneParticipant] = React.useState(null)
    const showModal = id => {
        setIsActive(true)
        if (id) {
            getOne(id).then((data) => {
                setOneParticipant(data)
            })
        } else {
            setOneParticipant(null)
        }
    }

    const closeModal = () => {
        setIsActive(false)
        getAll(user.id).then((data) => {
            setMyTeam(data)
        })
    }

    return (
        <>
            <Title style={{
                color: '#FFF',
            }}>
                Наша команда
            </Title>

            <Table columns={columns}
                   dataSource={myTeam.map((team) => ({
                       ...team, id: team.id
                   }))}
                   bordered
                   rowKey="id"
                   pagination={{size: 5}}
                   locale={{
                       emptyText: customEmptyText
                   }}
                   expandable={{
                       expandedRowRender: expandedRowRender
                   }}
                   title={() => {
                       return (
                           <Space size="large">
                               {myTeam.length === 0 || isAnyAccountStatusIdEqualTo1 ? (
                                   <>
                                       <Button style={{
                                           backgroundColor: 'green',
                                           color: 'white'
                                       }}
                                               onClick={() => showModal(null)}>
                                           Добавить участника
                                       </Button>
                                       <Popconfirm title="Вы уверены, что хотите удалить всех участников?"
                                                   okText="Да"
                                                   onConfirm={() => {
                                                       deleteAll(user.id).then(() => {
                                                           getAll(user.id).then((data) => {
                                                               setMyTeam(data)
                                                           }).then(() => {
                                                               return Swal.fire({
                                                                   icon: 'success',
                                                                   title: 'Внимание!',
                                                                   text: 'Поздравляем с успешным удалением участников!'
                                                               })
                                                           })
                                                       })
                                                   }}
                                                   cancelText="Отмена">
                                           <Button style={{
                                               backgroundColor: 'red',
                                               color: 'white'
                                           }}>
                                               Удалить всех участников
                                           </Button>
                                       </Popconfirm>
                                       <Popconfirm
                                           title="Вы уверены, что хотите сохранить всех участников? После принятия данного действия, это уже изменить нельзя!"
                                           okText="Да"
                                           onConfirm={() => {
                                               updateStatus(user.id).then(() => {
                                                   getAll(user.id).then((data) => {
                                                       setMyTeam(data)
                                                   }).then(() => {
                                                       return Swal.fire({
                                                           icon: 'success',
                                                           title: 'Внимание!',
                                                           text: 'Поздравляем с успешным сохранением участников!'
                                                       })
                                                   })
                                               })
                                           }}
                                           cancelText="Отмена">
                                           <Button style={{
                                               backgroundColor: 'orange',
                                               color: 'white'
                                           }}>
                                               Сохранить всех участников
                                           </Button>
                                       </Popconfirm>
                                   </>
                               ) : null}
                           </Space>
                       )
                   }}
            />
            <TeamModal open={isActive}
                       oneParticipant={oneParticipant}
                       onClose={closeModal}
                       participantStatus={participantStatus}/>
        </>
    );
};

export default Team;