import React from 'react';
import {
    Form,
    Input,
    Modal,
    Select,
    Upload,
    Button
} from "antd";
import PhoneInput from "react-phone-input-2";
import moment from "moment/moment";
import {UploadOutlined} from '@ant-design/icons';
import {useUser} from "../../../../stores/User";
import {create, update} from "../../../../http/participant";
import Swal from "sweetalert2";

const {Option} = Select;

const TeamModal = (props) => {
    const {
        open,
        oneParticipant,
        onClose,
        participantStatus
    } = props;

    const {user} = useUser();
    const [form] = Form.useForm();
    const [fileList, setFileList] = React.useState([]);

    React.useEffect(() => {
        if (open) {
            form.setFieldsValue({
                surname: oneParticipant?.surname || '',
                name: oneParticipant?.name || '',
                patronymic: oneParticipant?.patronymic || '',
                birthday: oneParticipant?.birthday ? moment(oneParticipant?.birthday).format('YYYY-MM-DD') : moment().startOf('day').format('YYYY-MM-DD'),
                gender: oneParticipant?.gender || 'Мужской',
                email: oneParticipant?.email || '',
                phone: oneParticipant?.phone || '',
                telegramLink: oneParticipant?.telegramLink || 'https://t.me/',
                placeOfStudyOfWork: oneParticipant?.placeOfStudyOfWork || '',
                specialization: oneParticipant?.specialization || '',
                positionOrStudyDocument: oneParticipant?.positionOrStudyDocument || '',
                participantStatusId: oneParticipant ? oneParticipant.participantStatusId : 1,
            })

            if (oneParticipant && oneParticipant.participantStatusId === 1 && oneParticipant.positionOrStudyDocument) {
                const fileUrl = process.env.REACT_APP_API_PATH + oneParticipant.positionOrStudyDocument
                const isJpg = fileUrl.endsWith('.jpg')

                setFileList(isJpg ? [{
                    uid: '-1',
                    name: 'document.jpg',
                    status: 'done',
                    url: fileUrl,
                }] : [])
            } else {
                setFileList([])
            }
        }
    }, [oneParticipant, form, open])

    const handleOk = () => {
        form.validateFields().then((values) => {
            const participant = new FormData();
            for (const key in values) {
                if (key === 'positionOrStudyDocument' && values.participantStatusId === 1 && fileList.length > 0) {
                    participant.append(key, fileList[0].originFileObj || fileList[0].url)
                } else {
                    participant.append(key, values[key])
                }
            }
            participant.append('profileId', user.id)

            if (oneParticipant) {
                update(oneParticipant.id, participant).then(() => {
                    handleCancel();
                    return Swal.fire({
                        icon: "success",
                        title: 'Внимание',
                        text: 'Поздравляем с успешным обновлением данных участника!'
                    })
                }).catch((error) => {
                    return Swal.fire({
                        icon: "error",
                        title: 'Внимание',
                        text: error.response.data.message
                    })
                });
            } else {
                create(participant).then(() => {
                    handleCancel()
                    return Swal.fire({
                        icon: "success",
                        title: 'Внимание',
                        text: 'Поздравляем с успешным добавлением участника!'
                    })
                }).catch((error) => {
                    return Swal.fire({
                        icon: "error",
                        title: 'Внимание',
                        text: error.response.data.message
                    })
                })
            }
        }).catch((error) => {
            console.error('Validation failed:', error);
        })
    }

    const handleCancel = () => {
        form.resetFields()
        setFileList([])
        onClose()
    }

    const handleFileChange = ({fileList}) => {
        setFileList(fileList)
        form.validateFields(['positionOrStudyDocument'])
        return false
    }

    const beforeUpload = (file) => {
        const isJpg = file.type === 'image/jpeg'
        if (!isJpg) {
            console.error('You can only upload JPG files!')
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            console.error('Image must smaller than 2MB!')
        }
        return isJpg && isLt2M
    };

    const customUpload = ({onSuccess}) => {
        setTimeout(() => {
            onSuccess("ok")
        }, 0)
    }

    return (
        <>
            <Modal open={open}
                   title={oneParticipant ? 'Обновить участника' : 'Добавить участника'}
                   okText={oneParticipant ? 'Обновить' : 'Добавить'}
                   cancelText="Отмена"
                   onCancel={handleCancel}
                   onOk={handleOk}>
                <Form form={form}
                      layout="vertical"
                      initialValues={oneParticipant}>
                    <Form.Item name="participantStatusId"
                               label="Статус участника"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Выберите статус участника'
                                   }
                               ]}>
                        <Select>
                            {
                                participantStatus.map((status) => (
                                    <Option key={status.id}
                                            value={status.id}>
                                        {status.status}
                                    </Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="surname"
                               label="Фамилия"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Введите фамилию'
                                   }
                               ]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="name"
                               label="Имя"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Введите имя'
                                   }
                               ]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="patronymic"
                               label="Отчество">
                        <Input/>
                    </Form.Item>
                    <Form.Item name="birthday"
                               label="Дата рождения"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Пожалуйста, выберите дату',
                                   }
                               ]}>
                        <input type="date"
                               style={{
                                   width: '100%',
                                   background: '#FFF',
                                   height: '31.6px',
                                   borderWidth: '1px',
                                   borderStyle: 'solid',
                                   borderColor: '#d9d9d9',
                                   borderRadius: '7px',
                                   paddingLeft: '.5rem'
                               }}/>
                    </Form.Item>
                    <Form.Item name="gender"
                               label="Пол"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Выберите пол'
                                   }
                               ]}>
                        <Select>
                            <Option value="Мужской">
                                Мужской
                            </Option>
                            <Option value="Женский">
                                Женский
                            </Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="email"
                               label="Email"
                               rules={[
                                   {
                                       required: true,
                                       type: 'email',
                                       message: 'Введите корректный email'
                                   }
                               ]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="phone"
                               label="Телефон"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Введите телефон'
                                   }
                               ]}>
                        <PhoneInput country={'ru'}
                                    placeholder="+7 (123) 456-78-90"/>
                    </Form.Item>
                    <Form.Item name="telegramLink"
                               label="Ссылка на Telegram"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Введите ссылку на Telegram'
                                   }
                               ]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="placeOfStudyOfWork"
                               label="Место учебы/работы">
                        <Input/>
                    </Form.Item>
                    <Form.Item name="specialization"
                               label="Специализация">
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        shouldUpdate={(prevValues, currentValues) => prevValues.participantStatusId !== currentValues.participantStatusId}>
                        {
                            ({getFieldValue}) => {
                                const participantStatusId = getFieldValue('participantStatusId');
                                return (
                                    <Form.Item name="positionOrStudyDocument"
                                               label="Документ о должности/учебе"
                                               rules={[
                                                   {
                                                       required: participantStatusId === 1,
                                                       message: 'Загрузите документ'
                                                   }
                                               ]}>
                                        {
                                            participantStatusId === 1 ? (
                                                <Upload fileList={fileList}
                                                        onChange={handleFileChange}
                                                        customRequest={customUpload}
                                                        beforeUpload={beforeUpload}
                                                        listType="picture"
                                                        maxCount={1}
                                                        accept=".jpg, .png, .jpeg">
                                                    <Button icon={<UploadOutlined/>}>
                                                        Нажмите для загрузки
                                                    </Button>
                                                </Upload>
                                            ) : (
                                                <Input/>
                                            )}
                                    </Form.Item>
                                )
                            }
                        }
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default TeamModal;