/* eslint-disable import/no-relative-parent-imports */

/* eslint-disable no-nested-ternary */
import type React from 'react'
import { useState } from 'react'
import request from '@common/helpers/request'
import { Modal as AntModal, Button, Steps } from 'antd'
import changeLogs from '../../changeLogs'
import cls from './TelemetryPopup.module.css'

type TelemetryPopupProps = {
  isTelemetryModalOpen: boolean
  setIsTelemetryModalOpen: (value: boolean) => void
}

function TelemetryPopup({ isTelemetryModalOpen, setIsTelemetryModalOpen }: TelemetryPopupProps) {
  const [current, setCurrent] = useState(0)
  const [isDataNoticeShow, setIsDataNoticeShow] = useState(false)

  const handleTelemetryAccess = () => {
    request('telemetry_permission_handle', { isChecked: true })
    setIsTelemetryModalOpen(false)
  }

  const handleTelemetryModalSkip = () => {
    setIsTelemetryModalOpen(false)
    request('telemetry_permission_handle', { isChecked: false })
  }

  const steps = [
    {
      title: '',
      content: (
        <>
          <span className={cls.improvementsTitle}>New Improvements</span>
          <div className={cls.improvements}>
            <ul>
              {changeLogs.improvements.map(item => (
                <li>{item}</li>
              ))}
            </ul>
          </div>
          <span className={cls.fixedTitle}>Fixed</span>
          <div className={cls.fixed}>
            <ul>
              {changeLogs.fixed.map(item => (
                <li>{item}</li>
              ))}
            </ul>
          </div>
          <div className={cls.telemetryContent}>
            <h3>
              <b>Build a better Bit SMTP</b>
            </h3>
            <span>
              Accept and complete to share non-sensitive diagnostic data to help us improve your
              experience.
            </span>
            <button type="button" onClick={() => setIsDataNoticeShow(true)}>
              What we collect?
            </button>
            {isDataNoticeShow && (
              <>
                <br />
                <span>
                  Server details (PHP, MySQL, server, WordPress versions), plugin usage
                  (active/inactive), site name and URL, your name and email. No sensitive data is
                  tracked.{' '}
                  <a href="https://bitapps.pro/terms-of-service/" target="_blank" rel="noreferrer">
                    {' '}
                    Terms & Conditions.
                  </a>
                </span>
              </>
            )}
          </div>
        </>
      )
    }
  ]

  const next = () => {
    setCurrent(current + 1)
  }
  const footerBtnStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    // flexFlow: current !== 1 ? 'row-reverse' : 'initial',
    marginTop: '30px'
  }

  return (
    <AntModal
      title={
        <div style={{ textAlign: 'center', fontSize: '20px', marginBottom: '20px' }}>
          Bit SMTP 2024 Updates
        </div>
      }
      open={isTelemetryModalOpen}
      closable={false}
      width="450px"
      centered
      className="telemetry-popup"
      footer={null}
    >
      <>
        <Steps current={current} items={steps} />
        <div className={cls.popupContent}>{steps[current].content}</div>
        <div style={footerBtnStyle}>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          <Button className={cls.skipBtn} onClick={handleTelemetryModalSkip}>
            Skip
          </Button>
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => handleTelemetryAccess()}>
              Accept & Complete
            </Button>
          )}
        </div>
      </>
    </AntModal>
  )
}

export default TelemetryPopup
