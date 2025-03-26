import './Modal.css'

const Modal = ({title, children, onClose}) => {
    return (
        <div className="modal-bg">
            <div className="modal-container">
                <h2>{title}</h2>
                <div>{children}</div>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

export default Modal