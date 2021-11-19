import React from 'react'

const TextInput = React.forwardRef((props, ref) => {
    return (
        <div className='field'>
            <label className='fieldTitle' htmlFor={`${props.inputLabel}`}>
                {props.inputTitle}
            </label>
            <textarea
                className={props.size}
                type='text-area' 
                id={`${props.inputLabel}`}
                name={`${props.inputLabel}`}
                placeholder={`${props.inputPlaceholder}`}
                aria-label={`${props.inputLabel}`}
                ref={ref}
                defaultValue={props.value}
            />
        </div>
    )
})

export default TextInput
