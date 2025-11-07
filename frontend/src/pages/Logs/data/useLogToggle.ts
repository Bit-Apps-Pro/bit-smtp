import request from '@common/helpers/request'
import { useMutation, useQuery } from '@tanstack/react-query'

export default function useLogToggle() {
  const { data, isLoading } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['logs', 'is_enabled'],
    queryFn: async () => request<{ enabled: boolean }>({ action: 'logs/is_enabled', method: 'GET' })
  })

  const mutation = useMutation(async (enabled: boolean) =>
    request({ action: 'logs/toggle', data: { enabled } })
  )

  return {
    isLoading,
    enabled: data?.data?.enabled ?? false,
    toggle: (value: boolean) => mutation.mutate(value),
    toggleAsync: (value: boolean) => mutation.mutateAsync(value),
    isToggling: mutation.isPending
  }
}
