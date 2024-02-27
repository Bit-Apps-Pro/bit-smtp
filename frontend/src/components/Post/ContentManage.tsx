import { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import request from '@common/helpers/request'
import Button from '@components/Button/Index'
import TinyMCE from '@utilities/TinyMCE'
import { produce } from 'immer'
import {
  actionStep,
  actionUseCase,
  conclusion,
  installProcess,
  introduction,
  triggerStep,
  triggerUseCase
} from '../../Utils/StaticData/PostContentTemplate'
import cls from './ContentManageCss.module.css'

interface contentInterface {
  introduction: string
  installation_process: string
  trigger_step: string
  action_step: string
  conclusion: string
  trigger_use_case: string
  action_use_case: string
}

interface contentInterface {
  [key: string]: any // Assuming any value can be stored under any key
}

export default function ContentManage() {
  const escapeBackslashPattern = (str: string) => str.replace(/\$_bmi_\$/g, '')

  const [content, setContent] = useState<contentInterface>({
    introduction: introduction || '',
    installation_process: installProcess || '',
    trigger_step: triggerStep || '',
    action_step: actionStep || '',
    conclusion: conclusion || '',
    trigger_use_case: triggerUseCase || '',
    action_use_case: actionUseCase || ''
  })

  const handleBody = (id: any, val: any) => {
    setContent(prevState =>
      produce(prevState, draft => {
        draft[id] = escapeBackslashPattern(val)
      })
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const data = new FormData()
    for (const [key, value] of Object.entries(content)) {
      data.append(key, value)
    }

    request('save-global-content', data, null, 'POST').then(res => {
      if (res?.status !== 'error') {
        toast.success(res.data)
      } else {
        toast.error(res.data)
      }
    })
  }

  useEffect(() => {
    request('get-global-content', '', {}, 'GET').then(res => {
      if (res?.status !== 'error') {
        setContent(res.data)
      }
    })
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await request('get-global-content', '', {}, 'GET')
        console.log(res, 'res')
        if (res?.status !== 'error') {
          setContent(res.data)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className={cls.main}>
      {content && Object.keys(content).length !== 0 && (
        <form className={cls.form} onSubmit={handleSubmit}>
          <div className={cls.row}>
            <div className={cls.col}>
              <label className={cls.textareaLabel}>Introduction</label>
              <TinyMCE
                id={`introduction`}
                value={escapeBackslashPattern(content?.introduction)}
                onChangeHandler={val => handleBody('introduction', val)}
                width="100%"
              />
            </div>
            <div className={cls.col}>
              <label className={cls.textareaLabel}>Installation Process </label>
              <TinyMCE
                id={`installation_process`}
                value={content.installation_process}
                onChangeHandler={val => handleBody('installation_process', val)}
                width="100%"
              />
            </div>
          </div>

          <div className={cls.row}>
            <div className={cls.col}>
              <label className={cls.textareaLabel}>Trigger Step </label>
              <TinyMCE
                id={`trigger_step`}
                value={content.trigger_step}
                onChangeHandler={val => handleBody('trigger_step', val)}
                width="100%"
              />
            </div>

            <div className={cls.col}>
              <label className={cls.textareaLabel}>Action Step </label>
              <TinyMCE
                id={`action_step`}
                value={content.action_step}
                onChangeHandler={val => handleBody('action_step', val)}
                width="100%"
              />
            </div>
          </div>

          <div className={cls.row}>
            <div className={cls.col}>
              <label className={cls.textareaLabel}>Trigger Use Case</label>
              <TinyMCE
                id={`trigger_use_case`}
                value={content.trigger_use_case}
                onChangeHandler={val => handleBody('trigger_use_case', val)}
                width="100%"
              />
            </div>

            <div className={cls.col}>
              <label className={cls.textareaLabel}>Action Use Case</label>
              <TinyMCE
                id={`action_use_case`}
                value={content.action_use_case}
                onChangeHandler={val => handleBody('action_use_case', val)}
                width="100%"
              />
            </div>
          </div>

          <div className={cls.row}>
            <div className={cls.col}>
              <label className={cls.textareaLabel}>Conclusion</label>

              <TinyMCE
                id={`conclusion`}
                value={content.conclusion}
                onChangeHandler={val => handleBody('conclusion', val)}
                width="100%"
              />
            </div>
          </div>

          <Button type="submit">Save</Button>
        </form>
      )}

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
    </div>
  )
}
