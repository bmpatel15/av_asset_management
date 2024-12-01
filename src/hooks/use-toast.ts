"use client"

import * as React from "react"
import type { ToastProps } from "@/components/ui/toast"

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactElement
}

const TOAST_LIMIT = 1
// const TOAST_REMOVE_DELAY = 1000

let count = 0
function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

interface State {
  toasts: ToasterToast[]
}

let memoryState: State = { toasts: [] }
const listeners: Array<(state: State) => void> = []

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    toasts: state.toasts,
    toast: (props: Omit<ToasterToast, "id">) => {
      const id = genId()
      const toast = { ...props, id, open: true }
      memoryState = { toasts: [toast, ...memoryState.toasts].slice(0, TOAST_LIMIT) }
      listeners.forEach((listener) => listener(memoryState))
      return id
    },
  }
}

export { useToast }
