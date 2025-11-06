import request from '@common/helpers/request'
import { useMutation } from '@tanstack/react-query'

export default function useResendLogs() {
  const { mutateAsync, isPending } = useMutation(async (ids: Array<number>) =>
    request({ action: 'mail/resend', data: { ids } })
  )

  return {
    resendLogs: (ids: Array<number>) => mutateAsync(ids),
    isResending: isPending
  }
}
