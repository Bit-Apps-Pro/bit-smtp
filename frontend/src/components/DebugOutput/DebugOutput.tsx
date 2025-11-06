import { useCallback } from 'react'
import { Button, message } from 'antd'
import cls from './DebugOutput.module.css'

type Props = {
  log: string[]
  className?: string
}

function DebugOutput({ log = [], className = '' }: Props) {
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText((log || []).join('\n'))
      message.success('Copied to clipboard')
    } catch (e) {
      message.error('Copy failed')
    }
  }, [log])

  // Use the line content as a key (avoid array index usage). If you expect
  // duplicate identical lines and need stable distinct keys, consider
  // enhancing the data shape to include an id per log entry.

  return (
    <div className={`${cls.terminal} ${className}`.trim()}>
      <div className={cls.header}>
        <div className={cls.title}>Debug Output</div>
        <div>
          <Button size="small" onClick={handleCopy}>
            Copy
          </Button>
        </div>
      </div>

      <div className={cls.content} role="log" aria-live="polite">
        {(!log || log.length === 0) && <div className={cls.empty}>No logs</div>}
        {log && log.length > 0 && (
          <pre className={cls.pre}>
            {log.map(line => (
              // preserve whitespace and line breaks
              <div key={String(line)} className={cls.line}>
                {line}
              </div>
            ))}
          </pre>
        )}
      </div>
    </div>
  )
}

export default DebugOutput
