import { useState } from 'react'
import toast from 'react-hot-toast'
import request from '@common/helpers/request'
import Button from '@components/Button/Index'
import Toaster from '@components/Toaster/Toaster'
import cls from './MailSendTest.module.css'
import TextArea from 'antd/es/input/TextArea'
import { Input, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

export default function MailSendTest() {
  interface values {
    [key: string]: any
    to: string
    subject: string
    message: string
  }

  const [isLoading, setIsLoading] = useState(false)
  const [values, setValues] = useState<values>({
    to: '',
    subject: '',
    message: '',
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    const tmpValues = { ...values }
    tmpValues[name] = value
    setValues(tmpValues)
  }

  const handleSubmit = (e: any) => {
    setIsLoading(true);
    e.preventDefault()
    const data = new FormData()
    for (let key in values) {
      data.append(key, values[key])
    }

    request('send_test_mail', data)
      .then(res => {
        setIsLoading(false)
        if (res?.status !== 'error') {
          toast.success(res.data)
        } else {
          Object.entries(res.data).forEach((item: any) => {
            item[1].forEach((rule: string) => {
              toast.error(rule)
            })
          })
        }
      })
      .catch(() => {
        toast.error('Mail send testing failed')
      })
  }

  return (
    <div className={cls.mailTest}>
      <h2>Test Your Mail:</h2>
      <form className={cls.form} onSubmit={handleSubmit}>
        <div className={cls.inputSection}>
          <label className={cls.label}>To:</label>
          <div className={cls.inputField}>
            <Input
              name="to"
              placeholder="Enter Email Address"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className={cls.inputSection}>
          <label className={cls.label}>Subject:</label>
          <div className={cls.inputField}>

            <Input
              name="subject"
              placeholder="From Subject Here"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className={cls.inputSection}>
          <label className={cls.label}>Message:</label>
          <div className={cls.inputField}>
            <TextArea
              name="message"
              onChange={handleChange}
              placeholder="Write your message"
              maxLength={50}
              required
              style={{
                height: 150,
                resize: 'none',
              }}
            />
          </div>
        </div>

        <Button type="submit">Send Test {isLoading && <Spin indicator={<LoadingOutlined style={{ fontSize: 20, color:'white' }} spin />}/>}</Button>
        <Toaster />
      </form>
    </div>
  )
}
