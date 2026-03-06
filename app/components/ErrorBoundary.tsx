"use client"

import { Component, type ReactNode } from "react"

interface ErrorBoundaryProps {
    children: ReactNode
    fallback?: ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
    error?: Error
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback
            }

            return (
                <div className="min-h-screen flex items-center justify-center bg-background px-4">
                    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                        <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                            <span className="text-4xl">⚠️</span>
                        </div>
                        <h1 className="text-2xl font-bold text-foreground mb-3">
                            Oops! Something went wrong
                        </h1>
                        <p className="text-muted mb-6">
                            We encountered an unexpected error. Please try refreshing the page.
                        </p>
                        {process.env.NODE_ENV === "development" && this.state.error && (
                            <details className="text-left mb-6 p-4 bg-red-50 rounded-lg">
                                <summary className="cursor-pointer text-sm font-semibold text-red-700 mb-2">
                                    Error Details (Dev Mode)
                                </summary>
                                <pre className="text-xs text-red-600 overflow-auto">
                                    {this.state.error.toString()}
                                </pre>
                            </details>
                        )}
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full px-6 py-3 bg-primary text-background rounded-xl font-semibold hover:bg-primary-light transition-all transform hover:scale-105"
                        >
                            Refresh Page
                        </button>
                        <a
                            href="/"
                            className="block mt-3 text-accent hover:text-accent-light font-semibold transition-colors"
                        >
                            Go to Homepage
                        </a>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}
