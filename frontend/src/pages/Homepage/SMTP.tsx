/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react'
import { __ } from '@common/helpers/i18nwrap'
import request from '@common/helpers/request'
import TelemetryPopup from '@components/TelemetryPopup/TelemetryPopup'
import { AutoComplete, Button, Card, Form, Input, Radio, Space, Switch, theme } from 'antd'
import { type SmtpConfig, useSmtpConfig, useUpdateSmtpConfig } from './data/useSmtpConfig'

export default function SMTP() {
  const [isTelemetryModalOpen, setIsTelemetryModalOpen] = useState(false)
  const { data: values, isLoading } = useSmtpConfig()
  const updateConfig = useUpdateSmtpConfig()

  // Check telemetry popup state
  useEffect(() => {
    request({ action: 'telemetry_popup_disable_check', method: 'GET' })
      .then(res => {
        setIsTelemetryModalOpen(!res.data)
      })
      .catch(() => {
        // Ignore errors
      })
  }, [])

  const { useToken } = theme
  const { token } = useToken()
  const [form] = Form.useForm()
  const smtpAuth = Form.useWatch('smtp_auth', form)
  const [status, setStatus] = useState<boolean>(values?.status === true)

  const onFinish = (formValues: SmtpConfig) => {
    // Convert boolean/switch values to expected string format
    const config = {
      ...formValues,
      smtp_auth: formValues.smtp_auth,
      smtp_debug: formValues.smtp_debug,
      status
    }

    updateConfig.mutate(config)
  }

  useEffect(() => {
    if (values) {
      form.setFieldsValue({
        ...values,
        smtp_auth: values.smtp_auth,
        smtp_debug: values.smtp_debug
      })
      setStatus(values?.status === true)
    }
  }, [form, values])
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
          backgroundColor: token.colorBgContainer,
          padding: '16px 24px'
        }
      }}
      extra={
        <Button type="primary" onClick={() => form.submit()} loading={updateConfig.isPending}>
          Save Changes
        </Button>
      }
    >
      <Form.Item name="status" label={__('Enable Mail')}>
        <Switch
          checkedChildren="On"
          unCheckedChildren="Off"
          onChange={() => setStatus(!status)}
          checked={status}
          defaultChecked={status}
        />
      </Form.Item>
      <Form
        form={form}
        initialValues={values}
        onFinish={onFinish}
        layout="vertical"
        disabled={!status || isLoading || updateConfig.isPending}
      >
        <Space direction="vertical" size="middle" style={{ padding: '15px', width: 'fit-content' }}>
          <Space size="middle" style={{ width: '100%' }}>
            <Form.Item
              name="from_email_address"
              rules={[{ required: true, type: 'email' }]}
              label={__('From Email Address')}
              style={{ flex: 1, marginBottom: 0 }}
            >
              <Input placeholder="From Email Address" />
            </Form.Item>

            <Form.Item
              name="from_name"
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
              <AutoComplete options={[{ value: 25 }, { value: 465 }, { value: 587 }]}>
                <Input placeholder="Port" type="number" />
              </AutoComplete>
            </Form.Item>
          </Space>

          <Space size="middle" style={{ width: '100%', display: 'flex' }}>
            <Form.Item name="encryption" label={__('Encryption')} style={{ flex: 1, marginBottom: 0 }}>
              <Radio.Group>
                <Radio.Button value="tls">TLS</Radio.Button>
                <Radio.Button value="ssl">SSL</Radio.Button>
                <Radio.Button value="none">None</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="smtp_auth"
              label={__('SMTP Authentication')}
              valuePropName="checked"
              style={{ flex: 1, marginBottom: 0 }}
            >
              <Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked={values?.smtp_auth} />
            </Form.Item>

            <Form.Item
              name="smtp_debug"
              label={__('SMTP Debug')}
              valuePropName="checked"
              style={{ flex: 1, marginBottom: 0 }}
            >
              <Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked={values?.smtp_debug} />
            </Form.Item>
          </Space>

          <Form.Item
            name="smtp_user_name"
            rules={[
              {
                required: smtpAuth,
                message: 'Username is required when authentication is enabled'
              }
            ]}
            label={__('SMTP Username')}
            hidden={!smtpAuth}
          >
            <Input placeholder="SMTP Username" />
          </Form.Item>

          <Form.Item
            name="smtp_password"
            rules={[
              {
                required: smtpAuth,
                message: 'Password is required when authentication is enabled'
              }
            ]}
            label={__('SMTP Password')}
            hidden={!smtpAuth}
          >
            <Input.Password placeholder="SMTP Password" />
          </Form.Item>
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
