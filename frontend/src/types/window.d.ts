import { type Edge, type Node, type SetViewport, type Viewport } from 'reactdoc'

interface AppStateType {
  docState: {
    edges: Edge[]
    nodes: Node[]
    viewport: Viewport
    setViewport: SetViewport
  }
}

declare global {
  interface Window {
    appState: AppStateType
  }
}

export {}
