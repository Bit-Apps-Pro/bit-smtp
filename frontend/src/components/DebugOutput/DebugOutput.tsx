import cls from './DebugOutput.module.css'

type Props = {
  log: string[]
  className?: string
}

function DebugOutput({ log = [], className = '' }: Props) {
  return (
    <div className={`${cls.terminal} ${className}`.trim()}>
      <div className={cls.header}>
        <div className={cls.title}>Debug Output</div>
      </div>

      <div className={cls.content} role="log" aria-live="polite">
        {(!Array.isArray(log) || log.length === 0) && <div className={cls.empty}>No logs</div>}
        {Array.isArray(log) && log.length > 0 && (
          <pre className={cls.pre}>
            {log.map(line => (
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
