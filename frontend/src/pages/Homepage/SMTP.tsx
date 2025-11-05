/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react'
import { __ } from '@common/helpers/i18nwrap'
import request from '@common/helpers/request'
import TelemetryPopup from '@components/TelemetryPopup/TelemetryPopup'
import { Button, Card, Form, Input, Space, Switch, message } from 'antd'

export default function SMTP() {
  interface ValuesTypes {
    [key: string]: any
    status: string
    form_email_address: string
    form_name: string
    re_email_address?: string
    smtp_host: string
    encryption: string
    port: string
    smtp_auth: string
    smtp_debug: string
    smtp_user_name: string
    smtp_password: string
  }
  const [isLoading, setIsLoading] = useState(true)
  const [isTelemetryModalOpen, setIsTelemetryModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [values, setValues] = useState<ValuesTypes>({
    status: '0',
    form_email_address: '',
    form_name: '',
    re_email_address: '',
    smtp_host: '',
    encryption: 'ssl',
    port: '465',
    smtp_auth: '1',
    smtp_debug: '0',
    smtp_user_name: '',
    smtp_password: ''
  })

  const [form] = Form.useForm()

  const onValuesChange = (_changedValues: any, allValues: any) => {
    // Convert switch values to expected format
    const formattedValues = {
      ...allValues,
      encryption: allValues.encryption ? 'tls' : 'ssl',
      smtp_auth: allValues.smtp_auth ? '1' : '0',
      smtp_debug: allValues.smtp_debug ? '1' : '0'
    }
    setValues(formattedValues)
  }

  const onFinish = (formValues: any) => {
    setIsSubmitting(true)
    const data = new FormData()
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const key in formValues) {
      // Ensure null/undefined become empty strings
      data.append(key, formValues[key] ?? '')
    }

    request({ action: 'save_mail_config', data })
      .then(res => {
        if (res?.status !== 'error') {
          message.success(res.data as string)
        } else {
          Object.entries(res?.data as Array<string>).forEach((item: any) => {
            item[1].forEach((rule: string) => {
              message.error(rule)
            })
          })
        }
      })
      .catch(() => {
        message.error('SMTP config saving failed')
      })
      .finally(() => setIsSubmitting(false))
  }

  useEffect(() => {
    const hide = message.loading('Loading...', 0)
    request({ action: 'get_mail_config', method: 'GET' })
      .then((res: any) => {
        setIsLoading(false)
        if (res?.status === 'success') {
          if (res.data.mailConfig) {
            setValues(res?.data?.mailConfig)
            form.setFieldsValue(res?.data?.mailConfig)
          }
          message.success('SMTP config fetched successfully!')
          return
        }
        message.error('Error Occurred')
      })
      .catch(err => {
        message.error(String(err))
      })
      .finally(() => hide())
  }, [form])

  useEffect(() => {
    request({ action: 'telemetry_popup_disable_check', method: 'GET' }).then((res: any) => {
      setIsTelemetryModalOpen(!res.data)
    })
  }, [])

  return (
    <Card
      title={__('SMTP Configuration')}
      style={{
        margin: '20px',
        position: 'relative'
      }}
      styles={{
        header: {
          position: 'sticky',
          top: 0,
          zIndex: 1,
          borderBottom: '1px solid #f0f0f0',
          padding: '16px 24px'
        }
      }}
      extra={
        <Button type="primary" onClick={() => form.submit()} loading={isSubmitting}>
          Save Changes
        </Button>
      }
    >
      <Form
        form={form}
        initialValues={values}
        onValuesChange={onValuesChange}
        onFinish={onFinish}
        layout="vertical"
      >
        <Space direction="vertical" size="middle" style={{ padding: '15px', width: 'fit-content' }}>
          <Form.Item name="status" label={__('Enable Mail')}>
            <Switch defaultChecked={values?.status === '1'} />
          </Form.Item>

          {!isLoading && values?.status && (
            <>
              <Space size="middle" style={{ width: '100%' }}>
                <Form.Item
                  name="form_email_address"
                  rules={[{ required: true, type: 'email' }]}
                  label={__('From Email Address')}
                  style={{ flex: 1, marginBottom: 0 }}
                >
                  <Input placeholder="From Email Address" />
                </Form.Item>

                <Form.Item
                  name="form_name"
                  rules={[{ required: true }]}
                  label={__('From Name')}
                  style={{ flex: 1, marginBottom: 0 }}
                >
                  <Input placeholder="From Name" />
                </Form.Item>
              </Space>

              <Form.Item
                name="re_email_address"
                rules={[{ type: 'email' }]}
                label={__('Reply-To Email Address')}
              >
                <Input placeholder="Reply-To Email Address" />
              </Form.Item>

              <Space size="middle" style={{ width: '100%' }}>
                <Form.Item
                  name="smtp_host"
                  rules={[{ required: true }]}
                  label={__('SMTP Host')}
                  style={{ flex: 2, marginBottom: 0 }}
                >
                  <Input placeholder="SMTP Host" />
                </Form.Item>

                <Form.Item name="port" label={__('SMTP Port')} style={{ flex: 1, marginBottom: 0 }}>
                  <Input placeholder="Port" />
                </Form.Item>
              </Space>

              <Space size="middle" style={{ width: '100%' }}>
                <Form.Item
                  name="encryption"
                  label={__('Use TLS Encryption')}
                  valuePropName="checked"
                  style={{ flex: 1, marginBottom: 0 }}
                >
                  <Switch
                    checkedChildren="TLS"
                    unCheckedChildren="SSL"
                    defaultChecked={values.encryption === 'tls'}
                  />
                </Form.Item>

                <Form.Item
                  name="smtp_auth"
                  label={__('SMTP Authentication')}
                  valuePropName="checked"
                  style={{ flex: 1, marginBottom: 0 }}
                >
                  <Switch defaultChecked={values.smtp_auth === '1'} />
                </Form.Item>

                <Form.Item
                  name="smtp_debug"
                  label={__('SMTP Debug')}
                  valuePropName="checked"
                  style={{ flex: 1, marginBottom: 0 }}
                >
                  <Switch defaultChecked={values.smtp_debug === '1'} />
                </Form.Item>
              </Space>

              <Form.Item
                name="smtp_user_name"
                rules={[
                  {
                    required: values.smtp_auth === '1',
                    message: 'Username is required when authentication is enabled'
                  }
                ]}
                label={__('SMTP Username')}
                hidden={values.smtp_auth !== '1'}
              >
                <Input placeholder="SMTP Username" />
              </Form.Item>

              <Form.Item
                name="smtp_password"
                rules={[
                  {
                    required: values.smtp_auth === '1',
                    message: 'Password is required when authentication is enabled'
                  }
                ]}
                label={__('SMTP Password')}
                hidden={values.smtp_auth !== '1'}
              >
                <Input.Password placeholder="SMTP Password" />
              </Form.Item>
            </>
          )}
        </Space>
      </Form>

      {isTelemetryModalOpen ? (
        <TelemetryPopup
          isTelemetryModalOpen={isTelemetryModalOpen}
          setIsTelemetryModalOpen={setIsTelemetryModalOpen}
        />
      ) : (
        ''
      )}
    </Card>
  )
}
