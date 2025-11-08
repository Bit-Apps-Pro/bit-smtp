import request from '@common/helpers/request'
import { useQuery } from '@tanstack/react-query'
import { type LogType } from './useFetchLogs'

export default function useFetchLog(logId: number | string | undefined) {
  const id = Number(logId)

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['log', id],
    queryFn: async () => request<LogType>({ action: `logs/details/${id}` }),
    enabled: Boolean(id),
    refetchOnWindowFocus: false
  })

  return {
    log: data?.data ?? null,
    isLoading: isLoading || isFetching,
    refetch
  }
}
