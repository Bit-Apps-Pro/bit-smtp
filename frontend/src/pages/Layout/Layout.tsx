/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, Outlet } from 'react-router-dom'
import Logo from '@resource/img/bitSmtpLogo.svg'
import { Layout as AntLayout } from 'antd'
import cls from './Layout.module.css'

function Header() {
  const navItems = [
    { label: 'Mail Configuration', path: '/' },
    { label: 'Test Mail', path: '/test-mail' },
    { label: 'Others', path: '/others' }
  ]

  const navItemStyle = ({ isActive }: any) => ({
    color: isActive ? '#fff' : ''
  })

  return (
    <div className={cls.layout}>
      <div className={cls.topbar}>
        <img src={Logo} alt="Bit SMTP logo" />
        <div className={cls.reviewLink}>
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
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}

function Layout() {
  return (
    <AntLayout>
      <Header />
      <Outlet />
    </AntLayout>
  )
}

export default Layout
