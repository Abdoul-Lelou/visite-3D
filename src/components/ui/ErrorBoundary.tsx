import React, { Component, type ErrorInfo, type ReactNode } from "react";

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Crash 3D:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>
          <h2>Oups ! La vue 3D a rencontré un problème.</h2>
          <button onClick={() => window.location.reload()}>Recharger la visite</button>
        </div>
      );
    }
    return this.props.children;
  }
}