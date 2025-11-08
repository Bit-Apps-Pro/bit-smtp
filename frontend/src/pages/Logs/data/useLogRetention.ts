import request from '@common/helpers/request'
import { useMutation } from '@tanstack/react-query'

interface LogRetentionResponse {
  code: string
  message: string
}

export default function useLogRetention() {
  const { mutateAsync: updateLogRetention, isPending: isUpdatingRetention } = useMutation({
    mutationFn: async (period: number) => {
      const response = await request({
        action: 'logs/update_retention',
        data: { period }
      })
      return response as LogRetentionResponse
    }
  })

  return {
    updateLogRetention,
    isUpdatingRetention
  }
}
