import './Modal.css'

const Modal = ({title, children, imgSrc, altText, onClose}) => {
    return (
        <div className="modal-bg" onClick={onClose}>
            <div className="modal-container" onClick={e => e.stopPropagation()}>
                <img src={imgSrc} alt={altText}></img>
                <h2>{title}</h2>
                <div className='modal-body'>{children}</div>
                <button onClick={onClose}><strong>Close</strong></button>
            </div>
        </div>
    )
}

export default Modal