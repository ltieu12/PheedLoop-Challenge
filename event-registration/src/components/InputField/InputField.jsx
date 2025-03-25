import React from 'react'
import './InputField.css'

const InputField = ({fieldTitle, fieldName, fieldType, fieldValue, placeholder, fieldError, onChangeValue, required}) => {
    return (
        <>
            {required ? (
                <div className='input-field'>
                    <label htmlFor={fieldName}>{fieldTitle} <span id='required-field'>*</span></label>
                    <input name={fieldName} type={fieldType} value={fieldValue} onChange={onChangeValue} placeholder={placeholder} required></input>
                    {fieldError && (
                        <span id='field-error'>{fieldError}</span>
                    )}
                </div>
            ) : (
                <div className='input-field'>
                    <label htmlFor={fieldName}>{fieldTitle}</label>
                    <input name={fieldName} type={fieldType} value={fieldValue} onChange={onChangeValue} placeholder={placeholder}></input>
                    {fieldError && (
                        <span id='field-error'>{fieldError}</span>
                    )}
                </div>
            )}
        </>
    )
}

export default InputField