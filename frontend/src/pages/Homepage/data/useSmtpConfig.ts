import request from '@common/helpers/request'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'

export interface SmtpConfig {
  status: boolean
  from_email_address: string
  from_name: string
  re_email_address?: string
  smtp_host: string
  encryption: 'tls' | 'ssl' | 'none'
  port: string
  smtp_auth: boolean
  smtp_debug: boolean
  smtp_user_name: string
  smtp_password: string
}

const defaultConfig: SmtpConfig = {
  status: false,
  from_email_address: '',
  from_name: '',
  re_email_address: '',
  smtp_host: '',
  encryption: 'ssl',
  port: '465',
  smtp_auth: false,
  smtp_debug: false,
  smtp_user_name: '',
  smtp_password: ''
}

export const useSmtpConfig = () =>
  useQuery({
    queryKey: ['smtp-config'],
    refetchOnWindowFocus: false,
    staleTime: -Infinity,
    queryFn: async () => {
      const response = await request<{ mailConfig: SmtpConfig }>({
        action: 'get_mail_config',
        method: 'GET'
      })

      if (response?.status === 'error') {
        throw new Error('Failed to fetch SMTP configuration')
      }
      return response?.data?.mailConfig || defaultConfig
    }
  })

export const useUpdateSmtpConfig = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (config: SmtpConfig) => {
      const data = new FormData()
      Object.entries(config).forEach(([key, value]) => {
        data.append(key, value ?? '')
      })

      const response = await request({ action: 'save_mail_config', data })
      if (response?.status === 'error') {
        const errors = response?.data as Record<string, string[]>
        Object.values(errors).forEach(rules => {
          rules.forEach(rule => message.error(rule))
        })
        throw new Error('Failed to update SMTP configuration')
      }
      return response.data
    },
    onSuccess: data => {
      message.success(data as string)
      queryClient.invalidateQueries({ queryKey: ['smtp-config'] })
    },
    onError: () => {
      message.error('SMTP config saving failed')
    }
  })
}
