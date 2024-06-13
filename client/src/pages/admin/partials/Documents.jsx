import React from 'react';
import {useUser} from "../../../stores/User";

import { Table} from "antd";
import {NavLink} from "react-router-dom";
import {getDocument} from "../../../http/admin";
const {
    inclineFirstname,
    inclineLastname,
    inclineMiddlename
} = require('lvovich')

const Documents = () => {
    const {user} = useUser()
    const [document, setDocument] = React.useState([])

    React.useEffect(() => {
        user && getDocument(user?.id).then((data) => {
            setDocument(data)
        })
    }, [user?.id])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => index + 1
        },
        {
            title: 'Document Name',
            dataIndex: 'documentName',
            key: 'documentName',
            render: (text, record, index) => (
                <NavLink to={`${process.env.REACT_APP_API_PATH + record.document}`}>
                    Документ об участии от {record.profile && inclineLastname(record?.profile?.surname, 'genitive')} {record.profile && inclineFirstname(record?.profile?.name, 'genitive')} {record.profile && inclineMiddlename(record?.profile?.patronymic, 'genitive')}
                </NavLink>
            ),
        },
    ];

    return (
        <Table columns={columns}
               dataSource={document}
               rowKey="id"
               pagination={false}
        />
    );
};

export default Documents;

