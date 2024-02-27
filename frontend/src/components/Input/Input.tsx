import cls from './Input.module.css'

type inputProps = {
  type?: string
  name: string
  value?: any
  placeHolder?: string
  className?: string
  title?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  width?: string
}

const Input = ({
  type = 'text',
  name,
  placeHolder,
  className,
  title,
  onChange,
  required = true,
  value,
  width
}: inputProps) => {
  return (
    <>
      <div className="w-100">
        {title && <label className={cls.inputLabel}>{title}</label>}
        <input
          type={type}
          name={name}
          className={`${cls.input} ${className}`}
          placeholder={placeHolder}
          onChange={onChange}
          required={required}
          value={value}
          style={{ width: width }}
        />
      </div>
    </>
  )
}

export default Input
