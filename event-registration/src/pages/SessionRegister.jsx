import React, { useState } from 'react'
import './SessionRegister.css'
import InputField from '../components/InputField/InputField'

const SessionRegister = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        jobTitle: ''
    })
    const [formError, setFormError] = useState({})

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
            errors.firstName = "First name is required."
        }
        else if (!textRegex.test(data.firstName)) {
            errors.firstName = "First name should contain letters."
        }

        if (!data.lastName.trim()) {
            errors.lastName = "Last name is required."
        }
        else if (!textRegex.test(data.lastName)) {
            errors.lastName = "Last name should contain letters."
        }

        if (!data.email.trim()) {
            errors.email = "Email is required."
        }
        else if (!emailRegex.test(data.email)) {
            errors.email = "Email should be in valid form."
        }

        if (data.jobTitle && (!textRegex.test(data.jobTitle))) {
            errors.jobTitle = "Job title should contain letters."
        }

        return errors
    }

    const submitForm = (e) => {
        e.preventDefault()
        const errors = validateForm(formData)
        setFormError(errors)

        if (Object.keys(formError).length === 0) {
            console.log(formData)
        }
        else {
            console.log("Errors in form validation!")
        }
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
                    <p>Please select the sessions that you want to join:</p>
                </div>
                <button>Submit</button>
            </form>
        </>
    )
}

export default SessionRegister