import React from 'react';

const Document = () => {
    return (
        <div className="page documents-page">
            <section>
                <div className="container documents-page__container">
                    <h1>Документы ОВОО</h1>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        "justifyContent": "space-between"
                    }}>
                    <h1 className='document-page__left box green'
                    style={{
                        marginRight: '5rem'
                    }}>
                        <p>
                            Положение
                        </p>
                        <p>
                            Студенческой
                        </p>
                        <p>
                            Весны РТ
                        </p>
                        <p>
                            ОВОО 2024
                        </p>
                    </h1>

                    <div class="blue"
                    style={{
                        display: "flex",
                        "flexFlow": "column",
                        alignItems: "center",
                        "justifyContent": "space-between"
                    }}>
                        <h1 style={{
                            backgroundColor: "#009688",
                            padding: "25px",
                            borderRadius: "10px"
                        }}>Приложение 2</h1>
                        <h1 style={{
                            backgroundColor: "#009688",
                            padding: "25px",
                            borderRadius: "10px"
                        }}>Приложение 2.1</h1>
                        <h1 style={{
                            backgroundColor: "#009688",
                            padding: "25px",
                            borderRadius: "10px"
                        }}>Приложение 2.2</h1>
                    </div>

                    <h1 class="box red"
                    style={{
                        marginLeft: '5rem'
                    }}>
                        <p>Регламент</p> <p>проведения</p> <p>Студенческой</p> Весны РТ ОБОО <p>2024</p>
                    </h1>
                    </div>

                    <h1>Документы ПОО</h1>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        "justifyContent": "space-between"
                    }}>
                    <h1 className='document-page__left box green'
                    style={{
                        marginRight: '5rem'
                    }}>
                        <p>
                            Положение
                        </p>
                        <p>
                            Студенческой
                        </p>
                        <p>
                            Весны РТ
                        </p>
                        <p>
                            ПОО 2024
                        </p>
                    </h1>

                    <div class="blue"
                    style={{
                        display: "flex",
                        "flexFlow": "column",
                        alignItems: "center",
                        "justifyContent": "space-between"
                    }}>
                        <h1 style={{
                            backgroundColor: "#009688",
                            padding: "25px",
                            borderRadius: "10px"
                        }}>Приложение 2</h1>
                        <h1 style={{
                            backgroundColor: "#009688",
                            padding: "25px",
                            borderRadius: "10px"
                        }}>Приложение 2.1</h1>
                        <h1 style={{
                            backgroundColor: "#009688",
                            padding: "25px",
                            borderRadius: "10px"
                        }}>Приложение 2.2</h1>
                    </div>

                    <h1 class="box red"
                    style={{
                        marginLeft: '5rem'
                    }}>
                        <p>Регламент</p> <p>проведения</p> <p>Студенческой</p> Весны РТ ПОО <p>2024</p>
                    </h1>
                    </div>
                </div>
            </section>
        </div>

    );
};

export default Document;
