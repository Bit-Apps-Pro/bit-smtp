export const loadScript = (src, integrity, type) =>
  new Promise(resolve => {
    const script = document.createElement('script')
    script.src = src
    script.integrity = integrity
    script.crossOrigin = 'anonymous'
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    script.id = type
    document.body.appendChild(script)
  })

export const select = selector => document.querySelector(selector)
