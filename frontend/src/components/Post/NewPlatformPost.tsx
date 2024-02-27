import { ChangeEvent, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { LoadingOutlined } from '@ant-design/icons'
import request from '@common/helpers/request'
import Input from '@components/Input/Index'
import LucideIcn from '@utilities/icons/LucideIcn'
import { Button, Select } from 'antd'
import cls from './../../pages/Homepage/AddIntegration.module.css'

export default function NewPlatformPost() {
  enum PlatformType {
    Trigger = 'trigger',
    Action = 'action'
  }

  enum Status {
    Publish = 'publish',
    Draft = 'draft',
    Pending = 'pending',
    Private = 'private'
  }

  interface valuesType {
    platform_type: PlatformType.Trigger | PlatformType.Action
    category: string
    app_name: string
    status: string
  }

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [categories, setCategories] = useState<any>([])

  const [values, setValues] = useState<valuesType>({
    platform_type: 'trigger' as PlatformType.Trigger | PlatformType.Action,
    app_name: '',
    category: '',
    status: Status.Publish || Status.Draft || Status.Pending || Status.Private
  })

  const handleSelectChange = (name: string, value: string) => {
    setValues({ ...values, [name]: value })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name: string = e.target.name
    const value: string = e.target.value
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const data = new FormData()

    for (const [key, value] of Object.entries(values)) {
      data.append(key, value)
    }

    request('generate-new-platform-post', data)
      .then(res => {
        console.log(res.data)
        if (res?.status !== 'error') {
          setValues({
            platform_type: 'trigger' as PlatformType.Trigger | PlatformType.Action,
            app_name: '',
            category: '',
            status: Status.Publish || Status.Draft || Status.Pending || Status.Private
          })
          toast.success(res.data)
        } else {
          if (typeof res.data === 'string') {
            toast.error(res.data)
          } else {
            Object.entries(res.data).forEach((item: any) => {
              item[1].forEach((rule: string) => {
                toast.error(rule)
              })
            })
          }
        }
        setIsLoading(false)
      })
      .catch(e => {
        setIsLoading(false)
        toast.error('Failed to create new platform post')
      })
  }

  useEffect(() => {
    request('post-categories', '', {}, 'GET').then(res => {
      if (res?.status !== 'error') {
        setCategories(res.data)
      }
    })
  }, [])

  return (
    <div className={cls.addIntegration}>
      <form className={cls.form} onSubmit={handleSubmit}>
        <label className={cls.label}>Platform Type</label>

        <Select
          defaultValue={values.platform_type}
          style={{ width: 400 }}
          onChange={val => handleSelectChange('platform_type', val)}
          options={[
            { value: 'trigger', label: 'Trigger' },
            { value: 'action', label: 'Action' }
          ]}
          aria-required="true"
        />

        <label className={cls.label}>Post Categories</label>

        <Select
          key="category"
          defaultValue={values.category}
          style={{ width: 400 }}
          onChange={val => handleSelectChange('category', val)}
          options={categories}
          aria-required="true"
        />

        <Input
          name="app_name"
          placeHolder="(e.g. SendGrid)"
          title="Name"
          onChange={handleChange}
          className={cls.input}
          required
        />

        <label className={cls.label}>Status</label>

        <Select
          defaultValue={values.status}
          style={{ width: 400 }}
          onChange={e => handleSelectChange(e, 'status')}
          options={[
            { value: 'publish', label: 'Publish' },
            { value: 'draft', label: 'Draft' },
            { value: 'pending', label: 'Pending' },
            { value: 'private', label: 'Private' }
          ]}
        />

        <Button
          htmlType="submit"
          type="primary"
          disabled={isLoading}
          icon={isLoading ? <LoadingOutlined size={16} /> : <LucideIcn name="Save" size={16} />}
          size="large"
          style={{ width: 100 }}
        >
          Submit
        </Button>

        <Toaster
          position="bottom-right"
          gutter={8}
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff'
            },
            success: {
              duration: 3000
              // theme: {
              //   primary: 'green',
              //   secondary: 'black'
              // }
            }
          }}
        />
      </form>
    </div>
  )
}
