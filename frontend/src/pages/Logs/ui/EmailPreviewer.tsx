import type React from 'react'
import { useEffect, useRef } from 'react'

interface EmailPreviewerProps {
  html: string
  style?: React.CSSProperties
}

function EmailPreviewer({ html, style }: EmailPreviewerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = html
    }
  }, [html])

  return (
    <iframe
      ref={iframeRef}
      title="Email Preview"
      style={{ width: '100%', minHeight: '100vh', ...style }}
      sandbox="allow-scripts allow-same-origin"
    />
  )
}

export default EmailPreviewer
