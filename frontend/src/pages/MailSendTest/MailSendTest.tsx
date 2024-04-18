/* eslint-disable jsx-a11y/label-has-associated-control */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useId, useState } from 'react'
import toast from 'react-hot-toast'
import request from '@common/helpers/request'
import AntBtn from '@components/Button/Button'
import Toaster from '@components/Toaster/Toaster'
import { Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import cls from './MailSendTest.module.css'

export default function MailSendTest() {
  interface Values {
    [key: string]: any
    to: string
    subject: string
    message: string
  }

  const [isLoading, setIsLoading] = useState(false)
  const [values, setValues] = useState<Values>({
    to: '',
    subject: '',
    message: ''
  })

  const id = useId()
  const handleChange = (e: any) => {
    const { name, value } = e.target
    const tmpValues = { ...values }
    tmpValues[name] = value
    setValues(tmpValues)
  }

  const handleSubmit = (e: any) => {
    setIsLoading(true)
    e.preventDefault()
    const data = new FormData()
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const key in values) {
      data.append(key, values[key])
    }

    request('send_test_mail', data)
      .then(res => {
        setIsLoading(false)
        if (res?.status !== 'error') {
          toast.success(res.data as string)
        } else {
          Object.entries(res.data as Array<string>).forEach((item: any) => {
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
          <label htmlFor={id} className={cls.label}>
            To:
          </label>
          <div className={cls.inputField}>
            <Input
              type="email"
              name="to"
              placeholder="Enter Email Address"
              onChange={handleChange}
              id={id}
              required
            />
          </div>
        </div>
        <div className={cls.inputSection}>
          <label htmlFor={id} className={cls.label}>
            Subject:
          </label>
          <div className={cls.inputField}>
            <Input
              name="subject"
              placeholder="From Subject Here"
              onChange={handleChange}
              id={id}
              required
            />
          </div>
        </div>
        <div className={cls.inputSection}>
          <label htmlFor={id} className={cls.label}>
            Message:
          </label>
          <div className={cls.inputField}>
            <TextArea
              name="message"
              onChange={handleChange}
              placeholder="Write your message"
              maxLength={50}
              required
              style={{
                height: 150,
                resize: 'none'
              }}
            />
          </div>
        </div>

        <AntBtn type="submit" isLoading={isLoading}>
          Send Test
        </AntBtn>
        <Toaster />
      </form>
    </div>
  )
}
