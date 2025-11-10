import { __ } from '@common/helpers/i18nwrap'
import DebugOutput from '@components/DebugOutput/DebugOutput'
import config from '@config/config'
import { Button, Card, Form, Input } from 'antd'
import useTestMailSend from './data/useTestMailSend'

const { TextArea } = Input

export default function MailSendTest() {
  const [form] = Form.useForm()
  const { mutate: sendTestMail, isPending, data: { data: debugInfo } = {} } = useTestMailSend()

  const onFinish = (values: Record<string, string>) => {
    sendTestMail(values, {
      onSuccess: res => {
        if (res.code === 'SUCCESS') {
          form.resetFields()
        }
      }
    })
  }

  return (
    <Card
      title={__('Test Your Mail')}
      style={{ margin: '20px', width: 'max-content', alignSelf: 'center' }}
      extra={
        <Button type="primary" onClick={() => form.submit()} loading={isPending}>
          {__('Send Test Email')}
        </Button>
      }
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          to: config.SEND_TO,
          subject: config.SUBJECT
        }}
      >
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
          rules={[{ message: 'Please enter email message' }]}
        >
          <TextArea
            placeholder="Write your message"
            style={{
              resize: 'both',
              minHeight: '100px',
              minWidth: '100%',
              maxWidth: '100%'
            }}
          />
        </Form.Item>
      </Form>
      {debugInfo?.length ? <DebugOutput log={debugInfo} /> : ''}
    </Card>
  )
}
