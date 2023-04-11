import * as React from 'react'

interface TextAreaProps {
  placeHolder : string,
  name : string,
  className ?: string,
  label ?: string,
  col?: number,
  row?: number,
  value : string
  onChange : (value:string, name:string) => void
  id?:string
}

export const TextArea: React.FC<TextAreaProps> = (props) => {
  const {
    name,
    label,
    placeHolder,
    value,
    col,
    row,
    onChange
  } = props

  const handlerChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value, name)
  }

  return (
    <>
      <label htmlFor={name}>
        {label + ' '}
      </label>
      <textarea
        style={{ marginTop: '8px' }}
        placeholder={placeHolder || ''}
        value={value}
        cols={col || 40}
        rows={row || 3}
        name={name || ''}
        id={name || ''}
        onChange={(e) => handlerChange(e)}
      />
    </>
  )
}
