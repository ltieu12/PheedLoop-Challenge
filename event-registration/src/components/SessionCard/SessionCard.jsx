import './sessionCard.css'
import CheckIcon from '../../assets/check.svg'

const SessionCard = ({sessionName, date, startTime, endTime, description, isSelected}) => {
    return (
        <>
            {isSelected ? (
                <div className="selected">
                    <div className='selected-card'>
                        <h3>{sessionName}</h3>
                        <span>{date} | {startTime} - {endTime}</span>
                        <p className='session-description'><strong>Objective: </strong>{description}</p>
                    </div>
                    <div className='selected-text'>
                        <p>Selected</p>
                        <img src={CheckIcon} alt='Check Icon'/>
                    </div>
                </div>
            ) : (
                <div className="session-card">
                    <h3>{sessionName}</h3>
                    <span>{date} | {startTime} - {endTime}</span>
                    <p className='session-description'><strong>Objective: </strong>{description}</p>
                </div>
            )}
        </>
    )
}

export default SessionCard