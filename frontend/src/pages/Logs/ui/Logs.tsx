import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { __ } from '@common/helpers/i18nwrap'
import useDeleteLog from '@pages/Logs/data/useDeleteLog'
import { type LogQueryType, type LogType } from '@pages/Logs/data/useFetchLogs'
import useFetchLogs from '@pages/Logs/data/useFetchLogs'
import useResendLogs from '@pages/Logs/data/useResendLogs'
import {
  Badge,
  Button,
  Flex,
  type TableColumnsType,
  type TableProps,
  Typography,
  notification
} from 'antd'
import { Table } from 'antd'
import LogRetentionSettings from './LogRetentionSettings'

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection']

const columns: TableColumnsType<LogType> = [
  {
    title: __('Status'),
    dataIndex: 'status',
    key: 'status',
    render: status => <Badge status={status ? 'success' : 'error'} text={status ? 'Sent' : 'Failed'} />
  },
  { title: __('Subject'), dataIndex: 'subject', key: 'subject' },
  { title: __('To'), dataIndex: 'to_addr', key: 'to_addr' },
  { title: __('From'), dataIndex: 'from_addr', key: 'from_addr' },
  { title: __('Retry'), dataIndex: 'retry_count', key: 'retry_count' },
  { title: __('Sent At'), dataIndex: 'created_at', key: 'created_at' }
]

export default function Logs() {
  const [pagination, setPagination] = useState<LogQueryType>({
    pageNo: 1,
    limit: 20
  } as LogQueryType)
  const { isLoading, isLogsFetching, logs, total, refetch } = useFetchLogs(pagination)
  const { isLogDeleting, deleteLog } = useDeleteLog()
  const { isResending, resendLogs } = useResendLogs()
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const navigate = useNavigate()

  const handleDelete = () => {
    deleteLog(selectedRowKeys as number[]).then(res => {
      if (res.code === 'SUCCESS') {
        setSelectedRowKeys([])
        refetch()
        notification.success({ message: res?.message || 'Log deleted successfully' })
      } else {
        notification.error({ message: res?.message || 'Failed to delete logs' })
      }
    })
  }

  const handleResend = () => {
    resendLogs(selectedRowKeys as number[]).then(res => {
      if (res.code === 'SUCCESS') {
        setSelectedRowKeys([])
      } else {
        notification.error({ message: res?.message || 'Failed to resend' })
      }
    })
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection: TableRowSelection<LogType> = {
    selectedRowKeys,
    onChange: onSelectChange
  }

  const hasSelected = selectedRowKeys.length > 0
  const onChange = (page: number, pageSize: number) => {
    setPagination({ pageNo: page, limit: pageSize })
  }

  const onRowClick = (record: LogType) => ({
    onClick: () => navigate(`/logs/${record.id}`),
    style: { cursor: 'pointer' }
  })

  return (
    <Flex gap="middle" vertical>
      <Flex align="center" gap="middle" justify="space-between">
        <Flex gap="middle" align="center">
          <Button type="primary" onClick={handleDelete} disabled={!hasSelected} loading={isLogDeleting}>
            Delete
          </Button>
          <Button type="primary" onClick={handleResend} disabled={!hasSelected} loading={isResending}>
            Resend
          </Button>
          {hasSelected ? <Typography>Selected {selectedRowKeys.length} items</Typography> : null}
        </Flex>
        <LogRetentionSettings />
      </Flex>
      <Table
        rowKey="id"
        columns={columns}
        rowSelection={rowSelection}
        dataSource={logs}
        onRow={onRowClick}
        loading={isLoading || isLogsFetching}
        pagination={{
          current: pagination.pageNo,
          total,
          pageSize: pagination.limit,
          onChange,
          position: ['bottomRight', 'topLeft']
        }}
      />
    </Flex>
  )
}
