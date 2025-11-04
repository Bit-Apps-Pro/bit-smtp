import { Route, Routes } from 'react-router-dom'
import SMTP from '@pages/Homepage'
import Layout from '@pages/Layout'
import Logs from '@pages/Logs'
import MailSendTest from '@pages/MailSendTest/MailSendTest'
import Others from '@pages/Others/Others'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<SMTP />} />
        <Route path="/test-mail" element={<MailSendTest />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/others" element={<Others />} />
      </Route>
    </Routes>
  )
}
