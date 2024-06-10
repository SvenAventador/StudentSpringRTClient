import React from 'react';
import {Button, Popconfirm, Space, Table, Typography} from "antd";
import ApplicationModal from "../../modal/ApplicationModal";
import {deleteOne, getOneApplication} from "../../../../../http/application";
import Swal from "sweetalert2";
import {getAllAccountStatuses} from "../../../../../http/statuses";

const Dances = (props) => {
    const {
        allDances,
        onOk
    } = props

    const [accountStatus, setAccountStatus] = React.useState([])
    const getStatusText = (id, statusArray) => {
        const status = statusArray.find((status) => status.id === id)
        return status ? status.status : 'Неизвестный статус'
    }

    React.useEffect(() => {
        getAllAccountStatuses().then((data) => {
            setAccountStatus(data)
        })
    }, [])

    const confirmDelete = (id) => {
        deleteOne(id).then(() => {
            Swal.fire(({
                title: 'Внимание!',
                text: 'Данный номер успешно удален!',
                icon: 'success'
            })).then(() => {
                onOk()
            })
        })
    }

    const [oneApplication, setOneApplication] = React.useState([])
    const [isActive, setIsActive] = React.useState(false)
    const showModal = (id) => {
        setIsActive(true)
        getOneApplication(id).then(({application}) => {
            console.log(application)
            setOneApplication(application)
        })
    }
    const closeModal = () => setIsActive(false)

    const columns = [
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true
        },
        {
            title: 'Длительность',
            dataIndex: 'duration',
            key: 'duration'
        },
        {
            title: 'Категория',
            dataIndex: 'category',
            key: 'category'
        },
        {
            title: 'Директор',
            dataIndex: 'fioDirector',
            key: 'fioDirector'
        },
        {
            title: 'Номинация',
            dataIndex: 'nomination',
            key: 'nomination',
            render: nomination => nomination.nomination
        },
        {
            title: '',
            key: 'actions',
            render: (record) => {
                const isActiveApplication = record.applicationStatusId === 1 || record.applicationStatusId === 3;

                if (isActiveApplication) {
                    return (
                        <Space size="large"
                               style={{
                                   display: "flex",
                                   flexFlow: "column"
                               }}>
                            <Button style={{
                                background: 'orange',
                                color: 'white'
                            }}
                                    onClick={() => showModal(record.id)}>
                                Изменить номер
                            </Button>
                            <Popconfirm title="Вы уверены, что хотите удалить этот номер?"
                                        onConfirm={() => confirmDelete(record.id)}
                                        okText="Да"
                                        cancelText="Отмена">
                                <Button style={{
                                    backgroundColor: 'red',
                                    color: 'white'
                                }}>
                                    Удалить номер
                                </Button>
                            </Popconfirm>
                        </Space>
                    );
                }
                return null;
            },
        },
    ]

    const expandedRowRender = (record) => {
        const participantNames = record.application_participants.map(participant =>
            `${participant?.participant?.surname || ''} ${participant?.participant?.name || ''} ${participant?.participant?.patronymic || ''}`
        ).join(', ')

        const technicalGroupNames = record.application_technical_groups.map(groupMember =>
            `${groupMember?.participant?.surname || ''} ${groupMember?.participant?.name || ''} ${groupMember?.participant?.patronymic || ''}`
        ).join(', ')
        return (
            <div>
                <p>
                    <strong>Название коллектива: </strong>
                    {record.teamName}
                </p>
                <p>
                    <strong>Ссылка на гугл диск: </strong>
                    <a href={record.googleCloudLink}
                       target="_blank"
                       rel="noopener noreferrer">перейти
                    </a>
                </p>
                <p>
                    <strong>Контактное лицо: </strong>
                    {record.contactPerson}
                </p>
                <p>
                    <strong>Телефон контактного лица: </strong>
                    {record.phoneContactPerson}
                </p>
                <p>
                    <strong>Телеграм контактного лица: </strong>
                    <a href={record.telegramContactPerson}
                       target="_blank"
                       rel="noopener noreferrer">
                        перейти
                    </a>
                </p>
                <p>
                    <strong>Форма участия: </strong>
                    {record.form_participation?.form}
                </p>
                <p>
                    <strong>Участники: </strong>
                    {participantNames}
                </p>
                <p>
                    <strong>Техническая группа: </strong>
                    {technicalGroupNames}
                </p>
                <p>
                    <b>Статус номера: </b>
                    <span style={{color: record.applicationStatusId === 1 ? 'gray' : record.applicationStatusId === 2 ? 'orange' : record.applicationStatusId === 3 ? 'red' : 'green'}}>
                        {getStatusText(record.applicationStatusId, accountStatus)}
                    </span>
                </p>
            </div>
        )
    }

    return (
        <>
            <Table dataSource={allDances}
                   columns={columns}
                   rowKey="id"
                   expandable={{expandedRowRender}}
                   pagination={{
                       defaultPageSize: 5,
                       showSizeChanger: false
                   }}
                   title={() => {
                       return (
                           <>
                               <Typography>
                                   Направление: Танцевальное
                               </Typography>
                           </>
                       )
                   }}
            />
            <ApplicationModal open={isActive}
                              onCancel={closeModal}
                              onOk={onOk}
                              oneApplication={oneApplication}/>
        </>
    );
};

export default Dances;
