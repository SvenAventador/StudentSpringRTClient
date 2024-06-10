import React from 'react';
import {Button, Form, Input, Modal, Select} from "antd";
import {getForms, getNomination, getParticipant, getTechGroup} from "../../../http/applicationData";

import PhoneInput from "react-phone-input-2";
import {update} from "../../../http/admin";

import Swal from "sweetalert2";

const {Option} = Select;

const EditApplication = (props) => {
    const {
        open,
        onCancel,
        onOk,
        oneApplication
    } = props
    const [form] = Form.useForm();
    const [teamMembers, setTeamMembers] = React.useState([])
    const [techGroups, setTechGroups] = React.useState([])
    const [formParticipation, setFormParticipation] = React.useState([])

    React.useEffect(() => {
        if (oneApplication && oneApplication?.profileId) {
            getParticipant(oneApplication?.profileId).then((data) => {
                setTeamMembers(data)
            })
            getTechGroup(oneApplication?.profileId).then((data) => {
                setTechGroups(data)
            })
            getForms().then((data) => {
                setFormParticipation(data)
            })
        }
    }, [oneApplication])

    React.useEffect(() => {
        if (oneApplication && oneApplication.directionId) {
            getNomination(oneApplication.directionId).then((data) => {
                const teamIds = oneApplication.application_participants.map(participant => participant.participantId);
                const techIds = oneApplication.application_technical_groups.map(group => group.participantId);

                form.setFieldsValue({
                    ...oneApplication,
                    team: teamIds,
                    tech: techIds,
                });
            }).catch(error => {
                console.error("Error fetching nomination:", error);
            });
        }
    }, [oneApplication, form]);

    const handleOk = () => {
        form.validateFields().then(values => {
            const application = new FormData()
            application.append('name', values.name)
            application.append('contactPerson', values.contactPerson)
            application.append('phoneContactPerson', values.phoneContactPerson)
            application.append('telegramContactPerson', values.telegramContactPerson)
            application.append('fioDirector', values.fioDirector)
            application.append('teamName', values.teamName)
            application.append('formParticipationId', values.formParticipationId)
            values.team.forEach(member => application.append('team', member));
            values.tech.forEach(group => application.append('tech', group));

            if (oneApplication) {
                update(oneApplication?.id, application).then(() => {
                    Swal.fire({
                        title: 'Внимание',
                        text: 'Поздравялем с успешным обновлением номера!',
                        icon: 'success'
                    }).then(() => {
                        onOk()
                        onCancel()
                        form.resetFields()
                    })
                }).catch((error) => {
                    return Swal.fire({
                        title: 'Внимание',
                        text: error.response.data.message,
                        icon: 'error'
                    })
                })
            }
        }).catch(info => {
            console.log('Validate Failed:', info)
        })
    }

    return (
        <Modal
            open={open}
            title="Изменить данные"
            onCancel={onCancel}
            footer={[
                <Button key="cancel"
                        style={{
                            backgroundColor: 'red',
                            color: "white"
                        }}
                        onClick={onCancel}>
                    Отмена
                </Button>,
                <Button key="submit"
                        style={{
                            backgroundColor: 'green',
                            color: "white"
                        }}
                        onClick={handleOk}>
                    Сохранить
                </Button>,
            ]}
        >
            <Form
                form={form}
                layout="vertical"
            >
                <Form.Item name="name"
                           label="Название номера"
                           rules={[
                               {
                                   required: true,
                                   message: 'Пожалуйста, введите название номера!'
                               }
                           ]}>
                    <Input/>
                </Form.Item>
                <Form.Item name="contactPerson"
                           label="ФИО контактного лица"
                           rules={[
                               {
                                   required: true,
                                   message: 'Пожалуйста, введите ФИО контактного лица!'
                               }
                           ]}>
                    <Input/>
                </Form.Item>
                <Form.Item name="phoneContactPerson"
                           label="Телефон контактного лица"
                           rules={[
                               {
                                   required: true,
                                   message: 'Пожалуйста, введите телефон контактного лица!'
                               }
                           ]}>
                    <PhoneInput country={'ru'}
                                placeholder="+7 (123) 456-78-90"/>
                </Form.Item>
                <Form.Item name="telegramContactPerson"
                           label="Телеграм контактного лица"
                           rules={[
                               {
                                   required: true,
                                   message: 'Пожалуйста, введите телефон контактного лица!'
                               }
                           ]}>
                    <Input/>
                </Form.Item>
                <Form.Item name="fioDirector"
                           label="ФИО руководителя коллектива"
                           rules={[
                               {
                                   required: true,
                                   message: 'Пожалуйста, введите ФИО директора!'
                               }
                           ]}>
                    <Input/>
                </Form.Item>
                <Form.Item name="formParticipationId"
                           label="Форма участия"
                           rules={[
                               {
                                   required: true,
                                   message: 'Пожалуйста, выберите форму участия!'
                               }
                           ]}>
                    <Select placeholder="Выберите форму участия">
                        {
                            formParticipation.map((form) => (
                                <Option key={form.id}
                                        value={form.id}>
                                    {form.form}
                                </Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item name="teamName"
                           label="Название коллектива"
                           rules={[
                               {
                                   required: true,
                                   message: 'Пожалуйста, введите название коллектива!'
                               }
                           ]}>
                    <Input/>
                </Form.Item>
                <Form.Item name="team"
                           label="Участники"
                           rules={[
                               {
                                   required: true,
                                   message: 'Выберите состав участников!'
                               }
                           ]}>
                    <Select mode="multiple"
                            placeholder="Выберите учатсников">
                        {
                            teamMembers.map((member) => (
                                <Option key={member.id}
                                        value={member.id}>
                                    {member?.surname || ''} {member?.name || ''} {member?.patronymic || ''}
                                </Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item name="tech"
                           label="Техническая группа"
                           rules={[
                               {
                                   required: true,
                                   message: 'Пожалуйста, выберите техническую группу!'
                               }
                           ]}>
                    <Select mode="multiple"
                            placeholder="Выберите техническую группу">
                        {
                            techGroups.map((group) => (
                                <Option key={group.id}
                                        value={group.id}>
                                    {group?.surname || ''} {group?.name || ''} {group?.patronymic || ''}
                                </Option>
                            ))
                        }
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
}
export default EditApplication;
