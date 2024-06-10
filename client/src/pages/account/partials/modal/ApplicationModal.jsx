import React from 'react';
import {
    Modal,
    Form,
    Input,
    Select,
    Button,
    TimePicker,
    Radio
} from 'antd';
import {
    getDirection,
    getForms,
    getNomination,
    getParticipant,
    getTechGroup
} from "../../../../http/applicationData";
import {useUser} from "../../../../stores/User";
import moment from "moment";
import PhoneInput from "react-phone-input-2";
import {create, update} from "../../../../http/application";
import Swal from "sweetalert2";

const {Option} = Select;

const ApplicationModal = (props) => {
    const {
        onCancel,
        onOk,
        open,
        oneApplication
    } = props

    const {user} = useUser()
    const [form] = Form.useForm()
    const [nominations, setNominations] = React.useState([])
    const [directions, setDirections] = React.useState([])
    const [teamMembers, setTeamMembers] = React.useState([])
    const [techGroups, setTechGroups] = React.useState([])
    const [formParticipation, setFormParticipation] = React.useState([])

    React.useEffect(() => {
        getParticipant(user.id).then((data) => {
            setTeamMembers(data)
        })
        getTechGroup(user.id).then((data) => {
            setTechGroups(data)
        })
        getDirection().then((data) => {
            setDirections(data)
        })
        getForms().then((data) => {
            setFormParticipation(data)
        })
    }, [user.id])

    React.useEffect(() => {
        if (oneApplication && oneApplication.directionId) {
            getNomination(oneApplication.directionId).then((data) => {
                setNominations(data);
                const teamIds = oneApplication.application_participants.map(participant => participant.participantId);
                const techIds = oneApplication.application_technical_groups.map(group => group.participantId);

                form.setFieldsValue({
                    ...oneApplication,
                    duration: moment(oneApplication.duration, 'mm:ss'),
                    team: teamIds,
                    tech: techIds,
                });
            }).catch(error => {
                console.error("Error fetching nomination:", error);
            });
        }
    }, [oneApplication, form]);

    const handleDirectionChange = (value) => {
        getNomination(value).then((data) => {
            setNominations(data)
            form.setFieldsValue({
                nominationId: null
            })
        })
    }

    const handleOk = () => {
        form.validateFields().then(values => {
            const application = new FormData()
            application.append('name', values.name)
            application.append('duration', values.duration.format('mm:ss'))
            application.append('category', values.category)
            application.append('googleCloudLink', values.googleCloudLink)
            application.append('contactPerson', values.contactPerson)
            application.append('phoneContactPerson', values.phoneContactPerson)
            application.append('telegramContactPerson', values.telegramContactPerson)
            application.append('fioDirector', values.fioDirector)
            application.append('teamName', values.teamName)
            application.append('profileId', user.id)
            application.append('directionId', values.directionId)
            application.append('nominationId', values.nominationId)
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
            } else {
                create(application).then(() => {
                    Swal.fire({
                        title: 'Внимание',
                        text: 'Поздравялем с успешным добавлением номера!',
                        icon: 'success'
                    }).then(() => {
                        onOk()
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

    const disabledMinutes = () => {
        let minutes = [];
        for (let i = 16; i < 60; i++) {
            minutes.push(i);
        }
        return minutes;
    }

    return (
        <Modal open={open}
               title="Создание номера"
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
               ]}>

            <Form form={form}
                  layout="vertical"
                  name="applicationForm"
                  initialValues={{
                      duration: moment('00:00', 'mm:ss')
                  }}>
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
                <Form.Item name="duration"
                           label="Длительность"
                           rules={[
                               {
                                   required: true,
                                   message: 'Пожалуйста, выберите длительность!'
                               }
                           ]}>
                    <TimePicker
                        format="mm:ss"
                        defaultOpenValue={moment('00:00', 'mm:ss')}
                        value={form.getFieldValue('duration')}
                        onChange={(time) => form.setFieldsValue({ duration: time })}
                        disabledHours={() => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]}
                        disabledMinutes={disabledMinutes}
                    />
                </Form.Item>
                <Form.Item name="category"
                           label="Категория выступления"
                           initialValue="Профильная"
                           rules={[
                               {
                                   required: true,
                                   message: 'Пожалуйста, выберите категорию выстулпения!'
                               }
                           ]}>
                    <Radio.Group>
                        <Radio value="Профильная">
                            Профильная
                        </Radio>
                        <Radio value="Непрофильная">
                            Непрофильная
                        </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="googleCloudLink"
                           label="Ссылка на GoogleCloud (Гугл диск)"
                           rules={[
                               {
                                   required: true,
                                   message: 'Пожалуйста, введите ссылку на GoogleCloud (Гугл диск)!'
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
                <Form.Item name="directionId"
                           label="Направление"
                           rules={[
                               {
                                   required: true,
                                   message: 'Пожалуйста, выберите направление выступления!'
                               }
                           ]}>
                    <Select placeholder="Выберите направление"
                            onChange={handleDirectionChange}>
                        {
                            directions.map((direction) => (
                                <Option key={direction.id}
                                        value={direction.id}>
                                    {direction.direction}
                                </Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item name="nominationId"
                           label="Номинация"
                           rules={[
                               {
                                   required: true,
                                   message: 'Пожалуйста, выберите номинацию!'
                               }
                           ]}>
                    <Select placeholder="Выберите номинацию">
                        {
                            nominations.map((nomination) => (
                                <Option key={nomination.id}
                                        value={nomination.id}>
                                    {nomination.nomination}
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
                                    {member.surname} {member.name} {member.patronymic}
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
                                    {group.surname} {group.name} {group.patronymic}
                                </Option>
                            ))
                        }
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ApplicationModal;
