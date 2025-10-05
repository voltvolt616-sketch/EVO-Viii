import React, { Component, ErrorInfo, ReactNode } from 'react';
import { LogoIcon } from './icons';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

// FIX: Removed 'public' access modifiers to prevent potential tooling errors.
class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-4 text-center">
            <div className="glass-pane rounded-xl p-8 sm:p-12 shadow-2xl shadow-red-500/20">
                <LogoIcon className="w-20 h-20 text-red-400 mx-auto" />
                <h1 className="text-3xl mt-6 sm:text-4xl font-bold text-red-300 font-orbitron tracking-wider">
                    حدث خطأ ما
                </h1>
                <p className="mt-4 text-lg text-gray-400 font-tech-mono">
                    عذراً، لقد واجه التطبيق مشكلة غير متوقعة.
                </p>
                <p className="mt-2 text-gray-500 font-tech-mono">
                    يرجى محاولة تحديث الصفحة.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="w-full max-w-xs mx-auto mt-8 py-3 px-6 bg-red-500 text-white text-lg font-bold rounded-lg hover:bg-red-600 transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:shadow-[0_0_25px_rgba(239,68,68,0.6)]"
                >
                    تحديث الصفحة
                </button>
            </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
