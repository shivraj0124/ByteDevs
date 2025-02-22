import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in error boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center text-red-500 p-6">
          <h2>Something went wrong.</h2>
          <p>Please refresh or try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
