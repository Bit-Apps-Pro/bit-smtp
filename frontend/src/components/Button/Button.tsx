import cls from './Button.module.css'

type buttonProps = {
  type?: 'button' | 'submit' | 'reset'
  className?: string
  children: string
}

const Button = ({ type = 'button', className, children }: buttonProps) => {
  return (
    <button type={type} className={`${cls.button} ${className}`}>
      {children}
    </button>
  )
}

export default Button
