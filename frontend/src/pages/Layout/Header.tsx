/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { __ } from '@common/helpers/i18nwrap'
import request from '@common/helpers/request'
import { useTheme } from '@config/themes/theme.provider'
import LogoIcon from '@icons/LogoIcon'
import LogoText from '@icons/LogoText'
import exclusiveEarlyBirdOffer from '@resource/img/exclusiveEarlyBirdOffer.png'
import { Layout as AntLayout, Button, Col, Menu, Modal, Row, Space, Typography } from 'antd'
import confetti from 'canvas-confetti'
import cls from './Layout.module.css'

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hideNewProductBtn, setHideNewProductBtn] = useState(true)
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()
  const { Text } = Typography

  const navItems = [
    { label: __('Configuration'), path: '/' },
    { label: __('Test'), path: '/test-mail' },
    { label: __('Logs'), path: '/logs' },
    { label: __('Others'), path: '/others' }
  ]

  useEffect(() => {
    request({ action: 'new_product_nav_btn_visible_check', method: 'GET' }).then((res: any) => {
      if (!res.data) {
        setHideNewProductBtn(false)
      }
    })
  }, [])

  const handleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      zIndex: 1000
    })
  }
  const showModal = () => {
    setIsModalOpen(true)
    handleConfetti()
  }
  const handleOk = () => setIsModalOpen(false)
  const handleCancel = () => setIsModalOpen(false)
  const handleNewProductNavBtn = () => {
    request({ action: 'hide_new_product_nav_btn' })
    setHideNewProductBtn(true)
    setIsModalOpen(false)
  }

  return (
    <>
      <AntLayout.Header style={{ background: 'none', padding: 0, marginBottom: 8 }}>
        <Row align="middle" justify="space-between" wrap={false} style={{ width: '100%' }}>
          <Col flex="none">
            <Space align="center" size="large">
              <Space align="center" size="middle" style={{ paddingLeft: 10, paddingTop: 10 }}>
                <LogoIcon size={44} />
                <LogoText h={44} w={120} />
              </Space>
              <Menu
                mode="horizontal"
                selectedKeys={[navItems.find(item => item.path === location.pathname)?.path || '/']}
                items={navItems.map(item => ({
                  key: item.path,
                  label: (
                    <NavLink to={item.path} className="link">
                      {item.label}
                    </NavLink>
                  )
                }))}
                style={{ border: 'none', background: 'none', fontWeight: 500 }}
              />
            </Space>
          </Col>
          <Col flex="auto" style={{ textAlign: 'right' }}>
            <Space align="center" size="middle">
              <Text style={{ fontSize: 14 }}>Share Your Product Experience!</Text>
              <a
                href="https://wordpress.org/support/plugin/bit-smtp/reviews/"
                target="_blank"
                rel="noreferrer"
              >
                Review us
              </a>
              <Button
                type="text"
                icon={isDark ? <SunOutlined /> : <MoonOutlined />}
                onClick={toggleTheme}
                style={{ fontSize: 18 }}
              />
            </Space>
          </Col>
          {!hideNewProductBtn && (
            <div
              className={cls.bitSocialMenu}
              style={{
                position: 'fixed',
                top: 35,
                left: '60%',
                zIndex: 1001,
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}
            >
              <button type="button" onClick={showModal} className={cls.btn}>
                New Product Launch
                <span className={cls.star} />
                <span className={cls.star} />
                <span className={cls.star} />
                <span className={cls.star} />
              </button>
            </div>
          )}
        </Row>
      </AntLayout.Header>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
        width={400}
      >
        <a
          href="https://bit-flows.com/?utm_source=bit-smtp&utm_medium=inside-plugin&utm_campaign=bit_flows_early_bird"
          target="_blank"
          rel="noreferrer"
        >
          <img src={exclusiveEarlyBirdOffer} alt="Bit Social Release Promotional Banner" width="100%" />
        </a>
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Button type="text" onClick={handleNewProductNavBtn} style={{ color: '#888' }}>
            Don&apos;t show it again
          </Button>
        </div>
      </Modal>
    </>
  )
}
