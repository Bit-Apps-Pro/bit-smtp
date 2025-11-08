import DebugOutput from '@components/DebugOutput/DebugOutput'
import { type LogType } from '@pages/Logs/data/useFetchLogs'

interface DebugOutputTabProps {
  log: LogType
}

export default function DebugOutputTab({ log }: DebugOutputTabProps) {
  return Array.isArray(log?.debug_info) && log.debug_info.length ? (
    <DebugOutput log={log.debug_info} />
  ) : (
    ''
  )
}
