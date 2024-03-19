import { type ReactNode } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Button, Spin } from 'antd'

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset'
  isLoading?: boolean
  children: ReactNode
}

function AntBtn({ type = 'button', isLoading = false, children }: ButtonProps) {
  const btnCustomStyle = {
    borderRadius: '8px',
    width: '120px',
    height: '34px',
    border: 'none',
    marginTop: '5px',
    cursor: 'pointer',
    backgroundColor: '#2c2940',
    color: '#fff',
    transition: '0.3s',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.32)'
  }

  return (
    <Button
      htmlType={type}
      disabled={isLoading}
      style={btnCustomStyle}
      icon={
        isLoading && (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 20, color: 'white' }} spin />} />
        )
      }
    >
      {children}
    </Button>
  )
}

export default AntBtn
