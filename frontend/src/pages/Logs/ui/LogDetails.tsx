import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DeleteOutlined, DownloadOutlined, LeftOutlined, SendOutlined } from '@ant-design/icons'
import { __ } from '@common/helpers/i18nwrap'
import useDeleteLog from '@pages/Logs/data/useDeleteLog'
import useFetchLog from '@pages/Logs/data/useFetchLog'
import useResendLog from '@pages/Logs/data/useResendLog'
import { Button, Card, Space, Tabs, Typography, notification } from 'antd'
// eslint-disable-next-line import/no-extraneous-dependencies
import dompurify from 'dompurify'

const { Title, Text } = Typography

export default function LogDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const logId = Number(id)

  const { log, isLoading } = useFetchLog(logId)
  const { deleteLog, isLogDeleting } = useDeleteLog()
  const { resendLog, isResending } = useResendLog()

  const handleDelete = async () => {
    if (!log) return
    try {
      const res = await deleteLog([log.id])
      if (res.code === 'SUCCESS') {
        notification.success({ message: res.message || __('Log deleted') })
        navigate(-1)
      } else {
        notification.error({ message: res.message || __('Failed to delete log') })
      }
    } catch (e) {
      notification.error({ message: __('Failed to delete log') })
    }
  }

  const handleResend = async () => {
    if (!log) return
    try {
      const res = await resendLog(log.id)
      if (res?.code === 'SUCCESS') {
        notification.success({ message: res.message || __('Mail resent') })
      } else {
        notification.error({ message: res?.message || __('Failed to resend mail') })
      }
    } catch (e) {
      notification.error({ message: __('Failed to resend mail') })
    }
  }

  const handleExport = () => {
    if (!log) return
    const blob = new Blob([JSON.stringify(log, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `log-${log.id}.json`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const mailBodyHtml = useMemo(() => dompurify.sanitize((log as any)?.details?.message || ''), [log])

  const localSentAt = useMemo(() => {
    if (!log?.created_at) return ''
    try {
      const d = new Date(log.created_at)
      return d.toLocaleString()
    } catch (e) {
      return log.created_at
    }
  }, [log])

  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Button type="link" icon={<LeftOutlined />} onClick={() => navigate('/logs')}>
            Back
          </Button>
          <Title level={4} style={{ margin: 0 }}>
            Log Details #{id}
          </Title>
        </div>
      }
      extra={
        <Space>
          <Button icon={<DownloadOutlined />} onClick={handleExport} />
          <Button icon={<SendOutlined />} onClick={handleResend} loading={isResending} />
          <Button danger icon={<DeleteOutlined />} onClick={handleDelete} loading={isLogDeleting} />
        </Space>
      }
    >
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Email Details" key="1">
          {isLoading || !log ? (
            <Text>Loading...</Text>
          ) : (
            <div>
              <Text strong>Sent At: </Text>
              <Text>{localSentAt}</Text>
              <br />
              <Text strong>From: </Text>
              <Text>{(log as any).from_addr}</Text>
              <br />
              <Text strong>To: </Text>
              <Text>{(log as any).to_addr}</Text>
              <br />
              <Text strong>Subject: </Text>
              <Text>{(log as any).subject}</Text>
            </div>
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Mail Body" key="2">
          <div dangerouslySetInnerHTML={{ __html: mailBodyHtml }} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Debug Output" key="3">
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {JSON.stringify((log as any)?.details?.debug_output, null, 2)}
          </pre>
        </Tabs.TabPane>
      </Tabs>
    </Card>
  )
}
