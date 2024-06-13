import React from 'react';

const Modal = (
    {
        active,
        setActive,
        children
    }
) => {
    return (
        <div className={active ? "modal modal__active" : "modal"}
             onClick={() => setActive(false)}>
            <div className={active ? "modal__container modal__container--active" : "modal__container"}
                 onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal;
