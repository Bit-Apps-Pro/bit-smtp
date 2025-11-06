import { notification } from 'antd'

// Helper to show notification, usage: notify.success('Message')
const notify = {
  success: (message: string, description?: string) =>
    notification.success({ message, description, placement: 'bottomRight', duration: 3 }),
  error: (message: string, description?: string) =>
    notification.error({ message, description, placement: 'bottomRight', duration: 3 }),
  info: (message: string, description?: string) =>
    notification.info({ message, description, placement: 'bottomRight', duration: 3 }),
  warning: (message: string, description?: string) =>
    notification.warning({ message, description, placement: 'bottomRight', duration: 3 })
}

export default notify
