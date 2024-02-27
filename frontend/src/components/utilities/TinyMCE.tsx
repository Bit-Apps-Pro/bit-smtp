/* eslint-disable object-shorthand */

/* eslint-disable no-undef */
import { useEffect, useState } from 'react'
import { loadScript } from '../../Utils/globalHelpers'

// import { loadScript } from '../../Utils/globalHelpers'

interface TinyMCEProps {
  id: string
  value: string
  onChangeHandler: (e: any) => void
  toolbarMnu?: string
  menubar?: string
  height?: string | number
  width?: string | number
  disabled?: boolean
  plugins?: string
  init?: any
  get?: any
  remove?: any
}

declare global {
  interface Window {
    tinymce: TinyMCEProps
  }
}

export default function TinyMCE({
  id,
  value,
  onChangeHandler,
  toolbarMnu,
  menubar,
  height,
  width,
  disabled,
  plugins
}: TinyMCEProps) {
  const [loaded, setLoaded] = useState(0)

  const loadTinyMceScript = async () => {
    if (typeof window.tinymce === 'undefined') {
      const res = await loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.9.11/tinymce.min.js',
        'sha256-SnRzknLClR3GaNw9oN4offMGFiPbXQTP7q0yFLPPwgY=',
        'tinymceCDN'
      )
      if (!res) {
        console.warn('Is your internet working properly to load script?')
      }
      setLoaded(1)
    }
  }

  useEffect(() => {
    loadTinyMceScript()
  }, [])

  useEffect(() => {
    if (typeof TinyMCE === 'undefined' || disabled) {
      const el = document.getElementById(`${id}-settings`)
      if (el instanceof HTMLInputElement) {
        el.value = value || ''
      }
    } else {
      window.tinymce?.remove(`textarea#${id}-settings`)
      timyMceInit()
      window.tinymce?.get(`${id}-settings`)?.setContent(value || '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, disabled, loaded])

  const timyMceInit = () => {
    if (typeof TinyMCE !== 'undefined') {
      // eslint-disable-next-line no-undef

      if (window && window?.tinymce) {
        window.tinymce.init({
          selector: `textarea#${id}-settings`,
          menubar,
          height: height || 150,
          width: width || '100%',
          branding: false,
          resize: 'verticle',
          convert_urls: false,
          theme: 'modern',
          plugins:
            plugins ||
            `directionality fullscreen image link media charmap hr lists textcolor colorpicker ${
              !loaded ? 'wordpress' : ''
            }`,
          toolbar:
            toolbarMnu ||
            'formatselect | fontsizeselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat toogleCode wp_code',
          image_advtab: true,
          default_link_target: '_blank',
          setup(editor: any) {
            editor.on('Paste Change input Undo Redo', () => {
              onChangeHandler(editor.getContent())
            })
            editor.addButton('toogleCode', {
              text: '</>',
              tooltip: 'Toggle preview',
              icon: false,
              onclick(e: any) {
                const { $ } = e.control
                const myTextarea = $(`#${id}-settings`)
                const myIframe = $(editor.iframeElement)
                myTextarea.value = editor.getContent({ source_view: true })
                myIframe.toggleClass('btcd-mce-tinymce-hidden')
                myTextarea.toggleClass('btcd-mce-tinymce-visible')
                if ($('iframe.btcd-mce-tinymce-hidden').length > 0) {
                  myTextarea.prependTo('.mce-edit-area')
                } else {
                  // editor.setContent(document.getElementById(`${id}-settings`).value)
                  const el = document.getElementById(`${id}-settings`)
                  if (el instanceof HTMLInputElement) {
                    editor.setContent(el.value)
                  }
                }
              }
            })
          }
        })
      }
    }
  }

  return (
    <textarea
      id={`${id}-settings`}
      className="btcd-paper-inp mt-1 w-10"
      rows={5}
      value={value}
      onChange={ev => onChangeHandler(ev.target.value)}
      style={{ width: '95.5%', height: 'auto' }}
      disabled={disabled}
    />
  )
}
