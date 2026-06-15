import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  /** Rendered instead of children if a render error is thrown. */
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

/**
 * Catches render-time errors in its subtree so a single failing component
 * (e.g. the WebGL chair canvas on a device without WebGL support) can't take
 * the whole page down with a blank screen. The rest of the site keeps working.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Keep a console trace for debugging without surfacing anything to visitors.
    console.error('ErrorBoundary caught an error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null
    }
    return this.props.children
  }
}
