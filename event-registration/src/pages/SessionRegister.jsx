import React, { useState } from 'react'
import './SessionRegister.css'
import InputField from '../components/InputField/InputField'
import SessionCard from '../components/SessionCard/SessionCard'
import Modal from '../components/Modal/Modal'
import SuccessIcon from '../assets/alert-success.svg'
import ErrorIcon from '../assets/process-error.svg'

const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: ''
}

const sessionInfo = [
    { id: 1, title: "Intro to React", date: "May 10th, 2025", start: "09:00 AM", end: "1:00 PM", description: "Get started into the fundamentals of React." },
    { id: 2, title: "Advanced React Patterns", date: "May 10th, 2025", start: "09:30 AM", end: "10:30 AM", description: "Dive deeps into React advanced concepts and patterns." },
    { id: 3, title: "UX Best Practices", date: "May 10th, 2025", start: "10:15 AM", end: "11:00 AM", description: "Explore practices and case studies demonstrating positive user experience." },
    { id: 4, title: "Building Scalable APIs", date: "May 11th, 2025", start: "11:00 AM", end: "12:00 PM", description: "Get started into Behind The Scene of web applications." },
]

const convertTime = (input) => {
    const [time, meridiem] = input.split(" ")
    const [hours, minutes] = time.split(":")
    let numHour = parseInt(hours)

    if (meridiem === "AM" && numHour === 12) {
        numHour = 0
    }
    if (meridiem === "PM" && numHour !== 12) {
        numHour += 12
    }
    return numHour * 60 + parseInt(minutes)
}
  
const SessionRegister = () => {
    const [formData, setFormData] = useState(initialFormData)
    const [formError, setFormError] = useState({})

    const [selectedSession, setSelectedSession] = useState([])
    const [overlapSessions, setOverlapSessions] = useState([])

    const [isOverlapModalOpen, setOverlapModalOpen] = useState(false)
    const [isEmptySessionModalOpen, setEmptySessionModalOpen] = useState(false)
    const [isSubmittedModalOpen, setSubmittedModalOpen] = useState(false)

    const saveFormData = (e) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const validateForm = (data) => {
        const errors = {}
        const textRegex = /^[A-Za-z]+$/
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        
        if (!data.firstName.trim()) {
            errors.firstName = "First name is required"
        }
        else if (!textRegex.test(data.firstName)) {
            errors.firstName = "First name should contain letters"
        }

        if (!data.lastName.trim()) {
            errors.lastName = "Last name is required"
        }
        else if (!textRegex.test(data.lastName)) {
            errors.lastName = "Last name should contain letters"
        }

        if (!data.email.trim()) {
            errors.email = "Email is required"
        }
        else if (!emailRegex.test(data.email)) {
            errors.email = "Email should be in valid form"
        }

        if (data.jobTitle && (!textRegex.test(data.jobTitle))) {
            errors.jobTitle = "Job title should contain letters"
        }

        return errors
    }

    const checkOverlap = (session) => {
        const overlap = []

        const startTime = convertTime(session.start)
        const endTime = convertTime(session.end)

        selectedSession.forEach((selected) => {
            const selectedStartTime = convertTime(selected.start)
            const selectedEndTime = convertTime(selected.end)

            if (selected.date === session.date) {
                if (startTime < selectedEndTime && selectedStartTime < endTime) {
                    overlap.push(selected)
                }
            }
        })
        
        return overlap
    }

    const checkSelected = (sessionArr, session) => {
        const isSelected = sessionArr.some((selected) => selected.id === session.id)
        return isSelected
    }

    const toggleSelect = (session) => {
        setSelectedSession((prevSelectedSessions) => {
            let updatedSessions = prevSelectedSessions
            let isSelected = checkSelected(prevSelectedSessions, session)

            if (isSelected) {
                updatedSessions = prevSelectedSessions.filter((element) => element.id !== session.id)
            }
            else {
                let overlaps = checkOverlap(session)

                if (overlaps.length > 0) {
                    setOverlapSessions(overlaps)
                    setOverlapModalOpen(true)
                }
                else {
                    updatedSessions = [
                        ...prevSelectedSessions,
                        session
                    ]
                }
            }

            return updatedSessions
        })
    }

    const submitForm = (e) => {
        e.preventDefault()
        const errors = validateForm(formData)
        setFormError(errors)

        if (Object.keys(errors).length !== 0) {
            console.log("Errors in form validation!")
        }
        else if (selectedSession.length == 0) {
            setEmptySessionModalOpen(true)    
        }
        else {
            setSubmittedModalOpen(true)
        }
    }

    const closeSubmittedModal = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            jobTitle: ''
        })

        setSelectedSession([])
        setOverlapSessions([])
        setSubmittedModalOpen(false)
    }

    return (
        <>
            <h1>Session Registration</h1>
            <form onSubmit={submitForm}>
                <div className='form-component'>
                    <h2>Attendee Information</h2>
                    <div className='name-field'>
                        <InputField 
                            fieldTitle="First Name"
                            fieldType="text"
                            fieldName="firstName"
                            fieldValue={formData.firstName}
                            onChangeValue={saveFormData}
                            fieldError={formError.firstName}
                            required
                        />
                        <InputField 
                            fieldTitle="Last Name"
                            fieldType="text"
                            fieldName="lastName"
                            fieldValue={formData.lastName}
                            onChangeValue={saveFormData}
                            fieldError={formError.lastName}
                            required
                        />
                    </div>
                    <InputField 
                        fieldTitle="Email Address"
                        fieldType="email"
                        fieldName="email"
                        placeholder="example@mycompany.com"
                        fieldValue={formData.email}
                        onChangeValue={saveFormData}
                        fieldError={formError.email}
                        required
                    />
                    <InputField 
                        fieldTitle="Job Title"
                        fieldType="text"
                        fieldName="jobTitle"
                        fieldValue={formData.jobTitle}
                        onChangeValue={saveFormData}
                        fieldError={formError.jobTitle}
                    />
                </div>

                <div className='form-component'>
                    <h2>Sessions Selection</h2>
                    <p>Please select the sessions you would like to attend (without overlap in time) <span id='required-field'>*</span></p>
                    <div className='session-selection'>
                        {sessionInfo.map((session) => (
                            <div key={session.id} onClick={() => toggleSelect(session)}>
                                <SessionCard 
                                    sessionName={session.title}
                                    date={session.date}
                                    startTime={session.start}
                                    endTime={session.end}
                                    description={session.description}
                                    isSelected={checkSelected(selectedSession, session)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <button><strong>Submit</strong></button>
            </form>

            {isOverlapModalOpen && (
                <Modal title="Error" imgSrc={ErrorIcon} altText="Error Icon" onClose={() => setOverlapModalOpen(false)}>
                    <p>You cannot select this session because it overlaps with: </p>
                    {overlapSessions.map((session) => (
                        <p><strong>{session.title} - {session.start} to {session.end}</strong></p>
                    ))}
                    <p>Please revise your session selection again.</p>
                </Modal>
            )}

            {isEmptySessionModalOpen && (
                <Modal title="Error" imgSrc={ErrorIcon} altText="Error Icon" onClose={() => setEmptySessionModalOpen(false)}>
                    <p>You have not selected any session. Please select at least one session to proceed.</p>
                </Modal>
            )}

            {isSubmittedModalOpen && (
                <Modal title="Success" imgSrc={SuccessIcon} altText="Success Icon" onClose={closeSubmittedModal}>
                    <p>You have registered successfully! Here is the summary information</p>
                    <p>Attendee: <strong>{formData.firstName} {formData.lastName}</strong></p>
                    <p>Email: <strong>{formData.email}</strong></p>
                    <p>Selected sessions:</p>
                    {selectedSession.map((session) => (
                        <p key={session.id}><strong>{session.title} - {session.start} to {session.end}</strong></p>
                    ))}
                    <p>An email confirmation has been sent to you with further details. Enjoy the conference!</p>
                </Modal>
            )}
        </>
    )
}

export default SessionRegister