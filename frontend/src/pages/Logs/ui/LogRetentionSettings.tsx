import { useState } from 'react'
import { SettingOutlined } from '@ant-design/icons'
import { __ } from '@common/helpers/i18nwrap'
import useLogRetention from '@pages/Logs/data/useLogRetention'
import { Button, Flex, Form, Input, Popover, notification } from 'antd'

interface LogRetentionSettingsProps {
  onSuccess?: () => void
}

export default function LogRetentionSettings({ onSuccess }: LogRetentionSettingsProps) {
  const [retentionDays, setRetentionDays] = useState<number>(30)
  const { updateLogRetention, isUpdatingRetention } = useLogRetention()

  const handleRetentionSave = async () => {
    if (Number.isNaN(retentionDays) || retentionDays < 1) {
      notification.error({ message: 'Please enter a valid number of days' })
      return
    }

    try {
      const response = await updateLogRetention(retentionDays)
      if (response.code === 'SUCCESS') {
        notification.success({
          message: response.message || __('Log retention period updated successfully')
        })
        onSuccess?.()
      } else {
        notification.error({ message: response.message || __('Failed to update log retention period') })
      }
    } catch (error) {
      notification.error({ message: __('Failed to update log retention period') })
    }
  }

  const retentionContent = (
    <Flex vertical gap="small">
      <Form.Item
        label={__('Days')}
        tooltip={__('Number of days to retain logs before automatic deletion.')}
      >
        <Input
          type="number"
          min={1}
          value={retentionDays}
          onChange={e => setRetentionDays(parseInt(e.target.value, 10))}
          placeholder="Enter days"
          style={{ width: 200 }}
        />
      </Form.Item>

      <Button type="primary" onClick={handleRetentionSave} loading={isUpdatingRetention}>
        Save
      </Button>
    </Flex>
  )

  return (
    <Popover
      content={retentionContent}
      title={__('Log Retention Settings')}
      trigger="click"
      placement="bottomRight"
    >
      <Button icon={<SettingOutlined />} />
    </Popover>
  )
}
