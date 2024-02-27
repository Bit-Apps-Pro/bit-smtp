import { NavLink, Outlet } from 'react-router-dom'
import { Layout as AntLayout } from 'antd'
import cls from './Layout.module.css'
import Logo from "../../resource/img/bitSmtpLogo.svg"

const Header = () => {
  const navItems = [
    { label: 'Mail Configuration', path: '/' },
    { label: 'Test Mail', path: '/test-mail' },
    { label: 'Others', path: '/others' },
  ]

  const navItemStyle = ({ isActive }: any) => {
    return {
      color: isActive ? '#fff' : ''
    }
  }

  return (
    <div className={cls.layout}>
      <div className={cls.topbar}>
        <img src={Logo} alt="Bit SMTP logo" />
        <div className={cls.reviewLink}>
          <span>Share Your Product Experience!</span>
          <a href="">Review us</a>
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

const Layout = () => {
  return (
    <AntLayout>
      <Header />
      <Outlet />
    </AntLayout>
  )
}

export default Layout
