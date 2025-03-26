import './sessionCard.css'
import CheckIcon from '../../assets/check.svg'

const SessionCard = ({sessionName, date, startTime, endTime, description, isSelected}) => {
    return (
        <>
            {isSelected ? (
                <div className="selected">
                    <div className='selected-card'>
                        <h3>{sessionName}</h3>
                        <span>{date}</span>
                        <span>{startTime} - {endTime}</span>
                        <span>{description}</span>
                    </div>
                    <div className='selected-text'>
                        <p>Selected</p>
                        <img src={CheckIcon} alt='Check Icon'/>
                    </div>
                </div>
            ) : (
                <div className="session-card">
                    <h3>{sessionName}</h3>
                    <span>{date}</span>
                    <span>{startTime} - {endTime}</span>
                    <span>{description}</span>
                </div>
            )}
        </>
    )
}

export default SessionCard