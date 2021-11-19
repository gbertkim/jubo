import React from 'react'

const DateInput = React.forwardRef((props, ref) => {
    return (
        <div className='field'>
        <label className='fieldTitle' htmlFor={props.inputLabels}>
            {props.inputTitle}
        </label>
        <input
            type='date' 
            name={props.inputLabels}
            min="2000-01-01"
            max="3000-12-31"
            aria-label={props.inputLabels}
            aria-required='true'
            ref={ref}
            defaultValue={props.value}
        />
    </div>
    )
})
export default DateInput
