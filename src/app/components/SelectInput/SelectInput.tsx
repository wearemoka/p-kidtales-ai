'use client'
import React from 'react'
interface SelectInputProps {
    classes?:string
    value: string,
    label :string
    name: string
    options: string[],
    onChangeHandler: (value: string, name: string) => void
}

const SelectInput:React.FC<SelectInputProps> = ({
  classes,
  value,
  name,
  label,
  options,
  onChangeHandler
}) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select
        className={classes}
        value={value}
        onChange={(e) => {
          onChangeHandler(e.target.value, name)
        }}
      >
        {options.map(e => <option key={`opt-adventure-${e}`} value={e}>{e.toLowerCase()}</option>)}
      </select>
    </>
  )
}

export default SelectInput
