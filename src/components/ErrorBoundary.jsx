import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-dark text-terminal font-mono flex items-center justify-center p-8">
          <div className="border border-red-400 p-6 max-w-lg">
            <p className="text-red-400 font-bold mb-2">SYSTEM CRASH</p>
            <p className="text-red-400/70 text-sm mb-4">UNEXPECTED ERROR</p>
            <p className="text-gray-400 text-xs break-all">{this.state.error?.message || 'Unknown error'}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 border border-terminal px-4 py-2 text-xs text-terminal hover:bg-terminal/10"
            >
              $ system_restart
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
