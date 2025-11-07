import { __ } from '@common/helpers/i18nwrap'
import useLogToggle from '@pages/Logs/data/useLogToggle'
import { Flex, Switch, Tooltip, Typography, notification } from 'antd'

export default function LogToggle() {
  const { enabled, isLoading, toggleAsync, isToggling } = useLogToggle()
  const handleChange = async (checked: boolean) => {
    try {
      await toggleAsync(checked)
      notification.success({ message: checked ? __('Logging enabled') : __('Logging disabled') })
    } catch (e) {
      notification.error({ message: __('Failed to update logging setting') })
    }
  }

  return (
    <Tooltip title={__('Toggle logging')}>
      <Flex gap="small" align="center">
        <Switch checked={enabled} loading={isLoading || isToggling} onChange={handleChange} />
        <Typography.Text>{enabled ? __('Logging: ON') : __('Logging: OFF')}</Typography.Text>
      </Flex>
    </Tooltip>
  )
}
