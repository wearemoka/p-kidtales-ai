import * as React from 'react'

interface InputProps {
  placeHolder : string,
  name : string,
  className ?: string,
  label ?: string,
  disabled?:boolean
  value : string
  type : string
  onChange : (value:string, name:string) => void
  id?:string
}

export const CustomInput: React.FC<InputProps> = (props) => {
  const {
    type,
    name,
    label,
    placeHolder,
    value,
    disabled,
    onChange
  } = props

  const handlerChange = (e: React.BaseSyntheticEvent) => {
    onChange(e.target.value, e.target.name)
  }

  return (
    <>
      <label htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeHolder || ''}
        value={value}
        disabled={disabled}
        name={name || ''}
        autoComplete='off'
        id={name || ''}
        onChange={handlerChange}
      />

    </>
  )
}
