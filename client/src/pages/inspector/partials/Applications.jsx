import React from 'react';
import {
    createDocument,
    getAllApplication,
    updateApplicationStatus
} from '../../../http/admin';
import Swal from 'sweetalert2';
import {NavLink} from 'react-router-dom';
import {
    Button,
    Input,
    Modal,
    Select,
    Space,
    Table
} from 'antd';
import {useUser} from "../../../stores/User";

import {
    deleteOne,
    getOneApplication
} from "../../../http/application";

const Applications = () => {
    const {user} = useUser()
    const [profiles, setAllProfiles] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [rejectReason, setRejectReason] = React.useState('');
    const [selectedApplication, setSelectedApplication] = React.useState(null);

    const [id, setId] = React.useState()
    const [oneApplication, setOneApplication] = React.useState()
    const [isVisible, setIsVisible] = React.useState(false)

    const showModal = id => {
        setId(id)
        getOneApplication(id).then(({application}) => {
            console.log(application)
            setOneApplication(application)
        })
        setIsVisible(true)
    }

    const onOk = () => {
        getAllApplication().then((data) => {
            setAllProfiles(data);
            console.log(data);
        });
        setIsVisible(false)
    }

    const closeModal = () => {
        getOneApplication(id).then((data) => {
            setOneApplication(data)
        })
        setIsVisible(false)
    }

    React.useEffect(() => {
        getAllApplication().then((data) => {
            setAllProfiles(data);
            console.log(data);
        });
    }, []);

    const handleStatusChange = (value, record) => {
        if (value === '3') {
            setSelectedApplication(record);
            setModalVisible(true);
        } else {
            updateApplicationStatus(record.id, value).then(() => {
                getAllApplication().then((data) => {
                    setAllProfiles(data);
                });
                Swal.fire({
                    title: 'Внимание!',
                    text: 'Статус заявки успешно изменен!',
                    icon: 'success'
                });
            });
        }
    };

    const handleSaveRejectReason = async () => {
        try {
            await updateApplicationStatus(selectedApplication.id, '3', rejectReason);
            getAllApplication().then((data) => {
                setAllProfiles(data);
            });
            Swal.fire({
                title: 'Внимание!',
                text: 'Статус заявки успешно изменен!',
                icon: 'success'
            }).then(() => {
                setModalVisible(false);
                setRejectReason('');
            })
        } catch (error) {
            console.error('Ошибка при сохранении причины отклонения:', error);
        }
    };

    const expandedRowRender = (record) => {
        const applicationColumns = [
            {
                title: 'Название',
                dataIndex: 'name',
                key: 'name',
                ellipsis: true
            },
            {
                title: 'Длительность',
                dataIndex: 'duration',
                key: 'duration',
            },
            {
                title: 'Категория',
                dataIndex: 'category',
                key: 'category',
            },
            {
                title: 'Ссылка',
                dataIndex: 'googleCloudLink',
                key: 'googleCloudLink',
                render: (text) => <NavLink to={text}>Смотреть</NavLink>
            },
            {
                title: 'Контактное лицо',
                dataIndex: 'contactPerson',
                key: 'contactPerson',
                ellipsis: true
            },
            {
                title: 'Команда / Участник',
                key: 'teamOrParticipant',
                ellipsis: true,
                render: (text, applicationRecord) => (
                    applicationRecord.formParticipationId === 1
                        ? applicationRecord.application_participants.map(participant =>
                            `${participant?.participant?.surname || ''} ${participant?.participant?.name || ''} ${participant?.participant?.patronymic || ''}`
                        ).join(', ')
                        : applicationRecord.teamName
                ),
            },
            {
                title: 'Статус',
                dataIndex: 'application_status',
                key: 'application_status',
                ellipsis: true,
                render: (_, applicationRecord) => (
                    <Select
                        defaultValue={applicationRecord.application_status.status}
                        onChange={(value) => handleStatusChange(value, applicationRecord)}
                        style={{width: 120}}
                    >
                        <Select.Option value="1">Черновик</Select.Option>
                        <Select.Option value="2">На проверке</Select.Option>
                        <Select.Option value="3">Отклонено</Select.Option>
                        <Select.Option value="4">Принято</Select.Option>
                    </Select>
                ),
            },
            {
                title: '',
                dataIndex: 'actions',
                key: 'actions',
                render: (_, record) => (
                    <Space size={"large"}
                           style={{
                               display: "flex",
                               flexFlow: "column"
                           }}>
                        <Button style={{
                            backgroundColor: 'orange',
                            color: 'white'
                        }}
                                onClick={() => showModal(record.id)}>
                            Изменить данные
                        </Button>
                        <Button style={{
                            backgroundColor: 'red',
                            color: 'white'
                        }}
                                onClick={() => {
                                    deleteOne(record.id).then(() => {
                                        getAllApplication().then((data) => {
                                            setAllProfiles(data);
                                        });
                                        return Swal.fire({
                                            title: 'Внимание!',
                                            text: 'Поздравляем с успешынм удалением заявки!',
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
            <Table columns={applicationColumns}
                   dataSource={record.applications}
                   rowKey="id"
                   expandable={{
                       expandedRowRender: (record) => {
                           const participantNames = record.application_participants.map(participant =>
                               `${participant?.participant?.surname || ''} ${participant?.participant?.name || ''} ${participant?.participant?.patronymic || ''}`
                           ).join(', ')
                           const technicalGroupNames = record.application_technical_groups.map(groupMember =>
                               `${groupMember?.participant?.surname || ''} ${groupMember?.participant?.name || ''} ${groupMember?.participant?.patronymic || ''}`
                           ).join(', ')

                           return (
                               <>
                                   <p>
                                       <strong>Ссылка на гугл диск:</strong>
                                       <NavLink to={record.googleCloudLink}> перейти</NavLink>
                                   </p>
                                   <p>
                                       <strong>ТГ контактного лица:</strong>
                                       <NavLink to={record.telegramContactPerson}> перейти</NavLink>
                                   </p>
                                   <p>
                                       <strong>Телефон контактного лица: </strong>
                                       {record.phoneContactPerson}
                                   </p>
                                   {
                                       participantNames && !participantNames.startsWith(' ') && (
                                           <p>
                                               <strong>Участники: </strong>
                                               {participantNames}
                                           </p>
                                       )
                                   }
                                   {
                                       technicalGroupNames && !technicalGroupNames.startsWith(' ') && (
                                           <p>
                                               <strong>Техническая группа: </strong>
                                               {technicalGroupNames}
                                           </p>
                                       )
                                   }
                                   {
                                       record.applicationStatusId === 3 && (
                                           <p>
                                               <strong>Причина отклоенения заявки: </strong>
                                               {record.application_comments[0]?.status || ''}
                                           </p>
                                       )
                                   }
                               </>
                           )
                       }
                   }}
                   pagination={false}
            />
        );
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
            title: 'Телефон',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Телеграм',
            dataIndex: 'telegramLink',
            key: 'telegramLink',
            render: (text) => <NavLink to={text}>{text}</NavLink>
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Button style={{
                    backgroundColor: 'blue',
                    color: 'white'
                }} onClick={() => {
                    createDocument(record.id, user.id).then(() => {
                        Swal.fire({
                            title: 'Внимание!',
                            text: 'Документ участника успешно сформирован. Вы можете посмотреть его в разделе "Сформированные документы"!',
                            icon: 'success'
                        });
                    }).catch(error => {
                        Swal.fire({
                            title: 'Ошибка!',
                            text: 'Не удалось сформировать документ!',
                            icon: 'error'
                        });
                        console.error('Ошибка при создании документа:', error);
                    });
                }}>
                    Сформировать документ
                </Button>
            )
        }
    ];

    return (
        <>
            <Table
                dataSource={profiles}
                columns={columns}
                rowKey="id"
                expandable={{
                    expandedRowRender: expandedRowRender,
                }}
                pagination={{
                    defaultPageSize: 5,
                    showSizeChanger: false,
                }}
            />
            <Modal
                title="Укажите причину отклонения"
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => {
                        getAllApplication().then((data) => {
                            setAllProfiles(data);
                        });
                        setModalVisible(false)
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
        </>
    );
};

export default Applications;
