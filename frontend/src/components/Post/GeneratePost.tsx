import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { LoadingOutlined } from '@ant-design/icons'
import request from '@common/helpers/request'
import LucideIcn from '@utilities/icons/LucideIcn'
// import LucideIcn from '@utilities/icons/LucideIcn'
import { Button, Select } from 'antd'
import cls from './../../pages/Homepage/AddIntegration.module.css'

interface postInterface {
  category: string
}

export default function GeneratePost() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [categories, setCategories] = useState<any>([])

  const [postInfo, setPostInfo] = useState<postInterface>({
    category: ''
  })

  const handleChange = (name: string, value: string) => {
    setPostInfo({ ...postInfo, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    request('generate-all-platform-post', '', { category: postInfo.category }, 'GET')
      .then(res => {
        console.log(res.data)
        if (res?.status !== 'error') {
          setPostInfo({ category: '' })
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
        console.log(res.data, 'categories')
      }
    })
  }, [])

  return (
    <div className={cls.addIntegration}>
      <form className={cls.form} onSubmit={handleSubmit}>
        <label className={cls.label}>Post Categories</label>

        <Select
          key="category"
          defaultValue={postInfo.category}
          style={{ width: 400 }}
          onChange={val => handleChange('category', val)}
          options={categories}
          aria-required="true"
        />

        <Button
          htmlType="submit"
          type="primary"
          disabled={isLoading}
          icon={isLoading ? <LoadingOutlined size={16} /> : <LucideIcn name="Save" size={16} />}
          size="large"
          style={{ width: 120 }}
        >
          Generate
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
