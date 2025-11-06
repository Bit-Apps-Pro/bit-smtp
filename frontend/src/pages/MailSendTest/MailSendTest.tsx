/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { __ } from '@common/helpers/i18nwrap'
import request from '@common/helpers/request'
import DebugOutput from '@components/DebugOutput/DebugOutput'
import { Button, Card, Form, Input, message } from 'antd'

const { TextArea } = Input

export default function MailSendTest() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [testConnectionLog, setTestConnectionLog] = useState([])
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    setIsSubmitting(true)
    const data = new FormData()
    Object.keys(values).forEach(key => {
      data.append(key, values[key])
    })

    request({ action: 'send_test_mail', data })
      .then(res => {
        if (res?.status !== 'error') {
          message.success(res.data as string)
          form.resetFields()
        } else {
          setTestConnectionLog(res.data as [])
        }
      })
      .catch(() => {
        message.error('Mail send testing failed')
      })
      .finally(() => setIsSubmitting(false))
  }

  return (
    <Card
      title={__('Test Your Mail')}
      style={{ margin: '20px' }}
      extra={
        <Button type="primary" onClick={() => form.submit()} loading={isSubmitting}>
          {__('Send Test Email')}
        </Button>
      }
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="to"
          label={__('To')}
          rules={[
            { required: true, message: 'Please enter recipient email' },
            { type: 'email', message: 'Please enter a valid email' },
            {
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Please enter a valid email address'
            },
            {
              max: 254,
              message: 'Email address is too long'
            }
          ]}
        >
          <Input placeholder="Enter Email Address" type="email" />
        </Form.Item>

        <Form.Item
          name="subject"
          label={__('Subject')}
          rules={[{ required: true, message: 'Please enter email subject' }]}
        >
          <Input placeholder="Email Subject" />
        </Form.Item>

        <Form.Item
          name="message"
          label={__('Message')}
          rules={[{ required: true, message: 'Please enter email message' }]}
        >
          <TextArea
            placeholder="Write your message"
            style={{
              height: 150,
              resize: 'block'
            }}
          />
        </Form.Item>
      </Form>
      {testConnectionLog.length ? <DebugOutput log={testConnectionLog} /> : ''}
    </Card>
  )
}
