import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("NutriScan Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 gap-6 max-w-md mx-auto" role="alert">
          <div className="bg-red-soft/20 rounded-full p-4">
            <span className="text-4xl">⚠️</span>
          </div>
          <h2 className="text-xl font-bold text-text-dark text-center">
            Algo salió mal
          </h2>
          <p className="text-text-gray text-sm text-center">
            Ha ocurrido un error inesperado. Por favor, intenta de nuevo.
          </p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
            className="bg-green-primary text-white font-semibold py-3 px-8 rounded-2xl hover:bg-green-dark transition-colors"
          >
            Reintentar
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
