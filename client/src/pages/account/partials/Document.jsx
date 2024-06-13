import React from 'react';
import {useUser} from "../../../stores/User";
import {getAll} from "../../../http/document";
import { Table} from "antd";
import {NavLink} from "react-router-dom";

const Document = () => {
    const {user} = useUser()
    const [document, setDocument] = React.useState([])

    React.useEffect(() => {
        user && getAll(user.id).then((data) => {
            setDocument(data)
        })
    }, [user?.id])

    const columns = [
        {
            title: '№ р/п',
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => index + 1
        },
        {
            title: 'Название документа',
            dataIndex: 'documentName',
            key: 'documentName',
            render: (text, record, index) => (
                <NavLink to={`${process.env.REACT_APP_API_PATH + record.documentName}`}>
                    Документ об участии №{index + 1}
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

export default Document;
