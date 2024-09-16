import { Modal as AntModal, Button } from 'antd'
import cls from './Modal.module.css'

type ModalProps = {
  handleSubmit?: (e: React.MouseEvent<HTMLElement>) => void
  isModalOpen: boolean
  handleCancel?: (e: React.MouseEvent<HTMLElement>) => void
}

function Modal({ isModalOpen, handleSubmit, handleCancel }: ModalProps) {
  return (
    <AntModal
      title={
        <div style={{ textAlign: 'center', fontSize: '20px', marginBottom: '20px' }}>Latest Updates</div>
      }
      open={isModalOpen}
      closable={false}
      width="400px"
      centered
      className={cls.telemetryModal}
      footer={[
        <div className={cls.btnFooter}>
          <Button key="skip" onClick={handleCancel} className={cls.skipBtn}>
            Skip
          </Button>
          <Button key="submit" type="primary" onClick={handleSubmit} className={cls.okBtn}>
            Accept & Continue
          </Button>
        </div>
      ]}
    >
      <div className={cls.modalContent}>
        <span>New Improvements</span>
        <div className={cls.improvements}>
          <span>1.SMTP debug enable/disable option added</span>
          <span>2.UI modified and minor issue fixed</span>
        </div>
        <h3 style={{ marginTop: '20px' }}>Make Bit SMTP Better</h3>
        <p>
          Accept and continue to share non-sensitive diagnostic data to help us improve your experience,
          <a href="https://bitapps.pro/terms-of-service/"> Terms & Conditions.</a>
        </p>
      </div>
    </AntModal>
  )
}

export default Modal
