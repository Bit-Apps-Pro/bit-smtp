/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import request from '@common/helpers/request'
import { useTheme } from '@config/themes/theme.provider'
import Logo from '@resource/img/bitSmtpLogo.svg'
import exclusiveEarlyBirdOffer from '@resource/img/exclusiveEarlyBirdOffer.png'
import { Layout as AntLayout, Button, Modal, theme } from 'antd'
// eslint-disable-next-line import/no-extraneous-dependencies
import confetti from 'canvas-confetti'
import cls from './Layout.module.css'

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hideNewProductBtn, setHideNewProductBtn] = useState(true)
  const { isDark, toggleTheme } = useTheme()

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

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const navItems = [
    { label: 'Mail Configuration', path: '/' },
    { label: 'Test Mail', path: '/test-mail' },
    { label: 'Logs', path: '/logs' },
    { label: 'Others', path: '/others' }
  ]

  const navItemStyle = ({ isActive }: any) => ({
    color: isActive ? '#fff' : ''
  })

  useEffect(() => {
    request({ action: 'new_product_nav_btn_visible_check', method: 'GET' }).then((res: any) => {
      if (!res.data) {
        setHideNewProductBtn(false)
      }
    })
  }, [])

  const handleNewProductNavBtn = () => {
    request({ action: 'hide_new_product_nav_btn' })
    setHideNewProductBtn(true)
    setIsModalOpen(false)
  }

  return (
    <div className={cls.layout}>
      <div className={cls.topbar}>
        <img src={Logo} alt="Bit SMTP logo" />
        <div className={cls.reviewLink}>
          <Button
            type="text"
            icon={isDark ? <SunOutlined /> : <MoonOutlined />}
            onClick={toggleTheme}
            className={cls.themeToggle}
          />
          <span>Share Your Product Experience!</span>
          <a href="https://wordpress.org/support/plugin/bit-smtp/reviews/">Review us</a>
        </div>
      </div>
      <div className={cls.navBar}>
        <div className={cls.navItems}>
          {navItems.map(link => (
            <NavLink
              to={link.path}
              className={({ isActive }) => (isActive ? `${cls.menu} ${cls.menuActive}` : `${cls.menu}`)}
              style={navItemStyle}
              key={Math.random()}
            >
              {/* {link.path === '/others' && <div className={cls.otherUpdates}>New</div>} */}
              {link.label}
            </NavLink>
          ))}
        </div>
        {!hideNewProductBtn ? (
          <div className={cls.bitSocialMenu}>
            <button type="button" onClick={() => showModal()} className={cls.btn}>
              New Product Launch
              <span className={cls.star} />
              <span className={cls.star} />
              <span className={cls.star} />
              <span className={cls.star} />
            </button>
          </div>
        ) : (
          ''
        )}
      </div>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
        className="bit-social-release-modal"
      >
        <a
          href="https://bit-flows.com/?utm_source=bit-smtp&utm_medium=inside-plugin&utm_campaign=bit_flows_early_bird"
          target="_blank"
          rel="noreferrer"
        >
          <img src={exclusiveEarlyBirdOffer} alt="Bit Social Release Promotional Banner" width="100%" />
        </a>
        <div className={cls.footerBtn}>
          {/* <a
            href="https://bit-social.com/?utm_source=bit-smtp&utm_medium=inside-plugin&utm_campaign=early-bird-offer"
            target="_blank"
            rel="noreferrer"
          >
            {`Grab It Before It's Gone!`}
          </a> */}
          <button
            type="button"
            className={cls.skipNewProductBtn}
            onClick={() => handleNewProductNavBtn()}
          >
            Don&apos;t show it again
          </button>
        </div>
      </Modal>
    </div>
  )
}

function Layout() {
  const { isDark } = useTheme()
  const { useToken } = theme
  const antConfig = useToken()
  return (
    <AntLayout
      color-scheme={isDark ? 'dark' : 'light'}
      style={{
        backgroundColor: antConfig.token.colorBgContainer,
        borderRadius: antConfig.token.borderRadius,
        border: `1px solid ${antConfig.token.controlOutline}`
      }}
    >
      <Header />
      <Outlet />
    </AntLayout>
  )
}

export default Layout
