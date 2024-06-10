import React from 'react';
import Title from "antd/es/typography/Title";
import {
    Button,
    Form,
    Input,
    Radio,
    Upload
} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {getOne, settingProfile} from "../../../http/profile";
import {useUser} from "../../../stores/User";
import moment from "moment";
import Swal from "sweetalert2";

const Profile = () => {
    const [form] = Form.useForm()
    const [studyOrWork, setStudyOrWork] = React.useState('учится')

    const {user} = useUser()
    React.useEffect(() => {
        getOne(user.id).then((data) => {
            const positionOrStudyDocument = data?.positionOrStudyDocument;
            const isStudent = positionOrStudyDocument && positionOrStudyDocument.includes('.jpg');

            setStudyOrWork(isStudent ? 'учится' : 'работает');

            form.setFieldsValue({
                surname: data?.surname || '',
                name: data?.name || '',
                patronymic: data?.patronymic || '',
                birthday: data?.birthday ? moment(data?.birthday).format('YYYY-MM-DD') : moment().startOf('day').format('YYYY-MM-DD'),
                gender: data?.gender || 'Мужской',
                phone: data?.phone || '',
                telegramLink: data?.telegramLink ? data?.telegramLink.replace('https://t.me/', '') : '',
                studyOrWork: isStudent ? 'учится' : 'работает',
                placeOfStudyOfWork: data?.placeOfStudyOfWork || '',
                positionDocument: isStudent ? [{
                    uid: '-1',
                    name: positionOrStudyDocument,
                    status: 'done',
                    url: `${process.env.REACT_APP_API_PATH}${positionOrStudyDocument}`
                }] : [],
                position: isStudent ? '' : data?.positionOrStudyDocument
            });
        })
    }, [user.id, form])

    const onFinish = (values) => {
        const profile = new FormData()
        profile.append('id', user.id)
        profile.append('surname', values.surname)
        profile.append('name', values.name)
        profile.append('patronymic', values.patronymic)
        const formattedBirthday = moment(values.birthday, 'YYYY-MM-DD').format('YYYY-MM-DD');
        profile.append('birthday', formattedBirthday);
        profile.append('gender', values.gender)
        profile.append('phone', values.phone)
        profile.append('telegramLink', 'https://t.me/' + values.telegramLink)
        profile.append('placeOfStudyOfWork', values.placeOfStudyOfWork)
        if (values.studyOrWork === 'учится') {
            profile.append('positionOrStudyDocument', values.positionDocument[0].originFileObj)
        } else {
            profile.append('positionOrStudyDocument', values.position)
        }
        profile.append('userId', user.id)

        settingProfile(profile).then(() => {
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

    const handleStudyOrWorkChange = e => {
        setStudyOrWork(e.target.value)
    }

    return (
        <div>
            <Title style={{
                color: '#FFF'
            }}>
                Профиль участника
            </Title>

            <Form form={form}
                  name="profileForm"
                  onFinish={onFinish}
                  initialValues={{
                      gender: 'Мужской'
                  }}
                  layout="vertical">
                <Form.Item
                    name="surname"
                    label="Фамилия"
                    className={'white-label'}
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите фамилию!'
                        }
                    ]}>
                    <Input/>
                </Form.Item>

                <Form.Item name="name"
                           label="Имя"
                           className={'white-label'}
                           rules={[
                               {
                                   required: true,
                                   message: 'Пожалуйста, введите имя!'
                               }
                           ]}>
                    <Input/>
                </Form.Item>

                <Form.Item name="patronymic"
                           label="Отчество"
                           className={'white-label'}>
                    <Input/>
                </Form.Item>

                <Form.Item name="birthday"
                           label="Дата рождения"
                           className={'white-label'}
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
                    }} />
                </Form.Item>

                <Form.Item name="gender"
                           label="Пол"
                           className={'white-label'}
                           rules={[
                               {
                                   required: true,
                                   message: 'Пожалуйста, выберите пол!'
                               }
                           ]}>
                    <Radio.Group>
                        <Radio value="Мужской"
                               style={{
                                   color: 'white'
                               }}>
                            Мужской
                        </Radio>
                        <Radio value="Женский"
                               style={{
                                   color: 'white'
                               }}>
                            Женский
                        </Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item name="phone"
                           label="Телефон"
                           className={'white-label'}
                           rules={[
                               {
                                   required: true,
                                   message: 'Пожалуйста, введите номер телефона!'
                               }
                           ]}>
                    <PhoneInput country={'ru'}
                                placeholder="+7 (123) 456-78-90"/>
                </Form.Item>

                <Form.Item name="telegramLink"
                           label="Ссылка на Telegram"
                           className={'white-label'}
                           rules={[{
                               required: true,
                               message: 'Пожалуйста, введите ссылку на аккаунт в Telegram!',
                           }]}>
                    <Input prefix="https:/t.me/"/>
                </Form.Item>

                <Form.Item name="placeOfStudyOfWork"
                           label="Место работы или учебы"
                           className={'white-label'}
                           rules={[
                               {
                                   required: true,
                                   message: 'Пожалуйста, введите место работы или учебы!'
                               }
                           ]}>
                    <Input/>
                </Form.Item>

                <Form.Item name="studyOrWork"
                           label="Учится или работает"
                           className={'white-label'}
                           rules={[
                               {
                                   required: true,
                                   message: 'Пожалуйста, выберите один вариант!'
                               }
                           ]}>
                    <Radio.Group value={studyOrWork} onChange={handleStudyOrWorkChange}>
                        <Radio value="учится"
                               style={{
                                   color: 'white'
                               }}>
                            Учится
                        </Radio>
                        <Radio value="работает"
                               style={{
                                   color: 'white'
                               }}>
                            Работает
                        </Radio>
                    </Radio.Group>
                </Form.Item>

                {
                    studyOrWork === 'учится' && (
                        <Form.Item name="positionDocument"
                                   label="Документ о месте учебы"
                                   valuePropName="fileList"
                                   className={'white-label'}
                                   getValueFromEvent={e => Array.isArray(e) ? e : e && e.fileList}
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Пожалуйста, загрузите документ!'
                                       }
                                   ]}>
                            <Upload name="positionOrStudyDocument"
                                    action="/upload"
                                    listType="picture"
                                    beforeUpload={() => false}>
                                <Button icon={<UploadOutlined/>}>
                                    Загрузить
                                </Button>
                            </Upload>
                        </Form.Item>
                    )
                }

                {
                    studyOrWork === 'работает' && (
                        <Form.Item name="position"
                                   label="Должность"
                                   className={'white-label'}
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Пожалуйста, введите должность!'
                                       }
                                   ]}>
                            <Input/>
                        </Form.Item>
                    )
                }

                <Form.Item>
                    <Button type="primary"
                            htmlType="submit"
                            style={{
                                width: '100%'
                            }}>
                        Отправить
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Profile;