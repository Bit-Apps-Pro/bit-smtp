import { useId } from 'react'
import cls from './Input.module.css'

type InputProps = {
  type?: string
  name: string
  value?: string
  placeHolder?: string
  className?: string
  title?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  width?: string
}

function Input({
  type = 'text',
  name,
  placeHolder,
  className,
  title,
  onChange,
  required = true,
  value,
  width
}: InputProps) {
  const id = useId()
  return (
    <div className="w-100">
      {title && (
        <label htmlFor={id} className={cls.inputLabel}>
          {title}
        </label>
      )}
      <input
        type={type}
        name={name}
        className={`${cls.input} ${className}`}
        placeholder={placeHolder}
        onChange={onChange}
        required={required}
        value={value}
        style={{ width }}
        id={id}
      />
    </div>
  )
}

export default Input
