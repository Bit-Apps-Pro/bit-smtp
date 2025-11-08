import request from '@common/helpers/request'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export default function useLogToggle() {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['logs', 'is_enabled'],
    queryFn: async () => request<{ enabled: boolean }>({ action: 'logs/is_enabled', method: 'GET' })
  })

  const mutation = useMutation({
    mutationFn: async (enabled: boolean) => request({ action: 'logs/toggle', data: { enabled } }),
    onSuccess: toggledResponse => queryClient.setQueryData(['logs', 'is_enabled'], toggledResponse)
  })

  return {
    isLoading,
    enabled: data?.data?.enabled ?? false,
    toggle: (value: boolean) => mutation.mutate(value),
    toggleAsync: (value: boolean) => mutation.mutateAsync(value),
    isToggling: mutation.isPending
  }
}
