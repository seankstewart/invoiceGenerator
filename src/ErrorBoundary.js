import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        //log the error to an error reporting service
        console.log({ error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="message" style={{visibility: 'visible'}}>
                    <h1>Oops, something went wrong.</h1>
                    <button onClick={() => window.location.reload()}>Refresh</button>
                </div>
            );
        }
        return this.props.children; 
    }
}

export default ErrorBoundary;