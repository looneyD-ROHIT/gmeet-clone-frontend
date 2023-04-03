const ErrorBoundaryFallback = ({ error }) => {
    const clickHandler = (e) => {
        e.preventDefault();
        window.location.href = '/';
    }

    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre style={{ color: "red" }}>{error.message}</pre>
            <button onClick={clickHandler}>Try again</button>
        </div>
    );
}
export default ErrorBoundaryFallback;