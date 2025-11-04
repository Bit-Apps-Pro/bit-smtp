import request from '@common/helpers/request'
import { useQuery } from '@tanstack/react-query'

export interface LogQueryType {
  searchKeyValue?: string
  pageNo: number
  limit: number
}

export type LogType = {
  id: number
  status: string
  message: string
  created_at: string
  details: string
}

type FetchLogsType = {
  logs: Array<LogType>
  count: number
  current: number
  pages: number
}

export default function useFetchLogs(searchData: LogQueryType) {
  const queryId = `logs-${searchData.pageNo}`

  const { data, isLoading, isFetching, refetch } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['all_logs', queryId],
    queryFn: async () => request<FetchLogsType>({ action: 'logs/all', data: searchData })
  })
  return {
    isLoading,
    refetch,
    isLogsFetching: isFetching,
    logs: data?.data?.logs ?? [],
    total: data?.data?.count ?? 0,
    current: data?.data?.current ?? 0,
    pages: data?.data?.pages ?? 0
  }
}
