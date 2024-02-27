import { useState } from 'react'
import toast from 'react-hot-toast'
import request from '@common/helpers/request'
import Button from '@components/Button/Index'
import Toaster from '@components/Toaster/Toaster'
import cls from './MailSendTest.module.css'
import TextArea from 'antd/es/input/TextArea'
import { Input } from 'antd'

export default function MailSendTest() {
  interface values {
    [key: string]: any
    to: string
    subject: string
    message: string
  }

  const [values, setValues] = useState<values>({
    to: '',
    subject: '',
    message: '',
  })

  const handleChange = (e: any) => {
    const { name, value, checked } = e.target
    const tmpValues = { ...values }
    tmpValues[name] = value
    setValues(tmpValues)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const data = new FormData()
    for (let key in values) {
      data.append(key, values[key])
    }
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

        <Button type="submit">Send Test</Button>
        <Toaster />
      </form>
    </div>
  )
}
