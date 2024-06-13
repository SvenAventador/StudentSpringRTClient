import React from 'react';
import {
    deleteAll,
    getAllApplication,
    updateStatus
} from "../../../http/application";
import {useUser} from "../../../stores/User";
import Vocal from "./component/table/Vocal";
import Instrumental from "./component/table/Instrumental";
import Dances from "./component/table/Dances";
import Theatre from "./component/table/Threatre";
import OriginalGenre from "./component/table/OriginalGenre";
import Fashion from "./component/table/Fashion";
import Media from "./component/table/Media";
import Video from "./component/table/Video";
import Art from "./component/table/Art";
import {
    Button,
    Popconfirm,
    Space
} from "antd";
import ApplicationModal from "./modal/ApplicationModal";
import Swal from "sweetalert2";
import {createDocument} from "../../../http/document";

const Application = () => {
    const {user} = useUser();

    const [allVocal, setAllVocal] = React.useState([]);
    const [allInstrumental, setAllInstrumental] = React.useState([]);
    const [allDances, setAllDances] = React.useState([]);
    const [allTheatre, setAllTheatre] = React.useState([]);
    const [allOriginalGenre, setAllOriginalGenre] = React.useState([]);
    const [allFashion, setAllFashion] = React.useState([]);
    const [allMedia, setAllMedia] = React.useState([]);
    const [allVideo, setAllVideo] = React.useState([]);
    const [allArt, setAllArt] = React.useState([]);

    React.useEffect(() => {
        user && getAllApplication(user?.id).then((data) => {
            setAllVocal(data.allVocal);
            setAllInstrumental(data.allInstrumental);
            setAllDances(data.allDances);
            setAllTheatre(data.allTheatre);
            setAllOriginalGenre(data.allOriginalGenre);
            setAllFashion(data.allFashion);
            setAllMedia(data.allMedia);
            setAllVideo(data.allVideo);
            setAllArt(data.allArt);
        });
    }, [user?.id]);

    const [isActive, setIsActive] = React.useState(false);
    const showModal = () => {
        setIsActive(true);
    };

    const onOk = () => {
        setIsActive(false);
        getAllApplication(user.id).then((data) => {
            setAllVocal(data.allVocal);
            setAllInstrumental(data.allInstrumental);
            setAllDances(data.allDances);
            setAllTheatre(data.allTheatre);
            setAllOriginalGenre(data.allOriginalGenre);
            setAllFashion(data.allFashion);
            setAllMedia(data.allMedia);
            setAllVideo(data.allVideo);
            setAllArt(data.allArt);
        });
    };

    const closeModal = () => {
        setIsActive(false);
        getAllApplication(user.id).then((data) => {
            setAllVocal(data.allVocal);
            setAllInstrumental(data.allInstrumental);
            setAllDances(data.allDances);
            setAllTheatre(data.allTheatre);
            setAllOriginalGenre(data.allOriginalGenre);
            setAllFashion(data.allFashion);
            setAllMedia(data.allMedia);
            setAllVideo(data.allVideo);
            setAllArt(data.allArt);
        });
    };

    return (
        <>
            <Space size={"large"}
                   style={{
                       marginBottom: '1rem',
                       marginTop: '1rem'
                   }}>
                <Button style={{
                    backgroundColor: 'green',
                    color: 'white'
                }}
                        onClick={showModal}>
                    Добавить
                </Button>
                <Popconfirm title="Вы действительно хотите удалить все Ваши номера?"
                            onConfirm={() => {
                                deleteAll(user.id).then(() => {
                                    return getAllApplication(user.id);
                                }).then((data) => {
                                    setAllVocal(data.allVocal);
                                    setAllInstrumental(data.allInstrumental);
                                    setAllDances(data.allDances);
                                    setAllTheatre(data.allTheatre);
                                    setAllOriginalGenre(data.allOriginalGenre);
                                    setAllFashion(data.allFashion);
                                    setAllMedia(data.allMedia);
                                    setAllVideo(data.allVideo);
                                    setAllArt(data.allArt);

                                    return Swal.fire({
                                        title: 'Внимание!',
                                        text: 'Все номера успешно удалены!',
                                    });
                                }).catch((error) => {
                                    return Swal.fire({
                                        title: 'Внимание!',
                                        text: error.response.data.message,
                                    });
                                });
                            }}>
                    <Button style={{
                        backgroundColor: 'red',
                        color: 'white'
                    }}>
                        Удалить все номера
                    </Button>
                </Popconfirm>
                <Popconfirm
                    title="Вы уверены, что хотите сохранить номера? После принятия данного действия, его нельзя будет отменить!"
                    onConfirm={() => {
                        updateStatus(user.id).then(() => {
                            Swal.fire({
                                title: 'Внимание!',
                                text: 'Поздравляем с успешным сохранением номеров!',
                            }).then(() => {
                                onOk();
                            });
                        });
                    }}>
                    <Button style={{
                        backgroundColor: 'orange',
                        color: 'white'
                    }}>
                        Сохранить все номера
                    </Button>
                </Popconfirm>
                <Button style={{
                    backgroundColor: 'blue',
                    color: 'white'
                }}
                        onClick={() => {
                            createDocument(user?.id).then(() => {
                                return Swal.fire({
                                    title: 'Внимание!',
                                    text: 'Документ успешно сформирован!'
                                })
                            })
                        }}>
                    Сформировать документ
                </Button>
            </Space>

            <Vocal allVocal={allVocal}
                   onOk={onOk}/>
            <Instrumental allInstrumental={allInstrumental}
                          onOk={onOk}/>
            <Dances allDances={allDances}
                    onOk={onOk}/>
            <Theatre allTheatre={allTheatre}
                     onOk={onOk}/>
            <OriginalGenre allOriginalGenre={allOriginalGenre}
                           onOk={onOk}/>
            <Fashion allFashion={allFashion}
                     onOk={onOk}/>
            <Media allMedia={allMedia}
                   onOk={onOk}/>
            <Video allVideo={allVideo}
                   onOk={onOk}/>
            <Art allArt={allArt}
                 onOk={onOk}/>

            <ApplicationModal open={isActive}
                              onCancel={closeModal}
                              onOk={onOk}/>
        </>
    );
};

export default Application;
