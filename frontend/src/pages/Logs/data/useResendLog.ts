import request from '@common/helpers/request'
import { useMutation } from '@tanstack/react-query'

export default function useResendLog() {
  const { mutateAsync, isPending } = useMutation(async (id: number) =>
    request({ action: 'mail/resend', data: { id } })
  )

  return {
    resendLog: (id: number) => mutateAsync(id),
    isResending: isPending
  }
}
