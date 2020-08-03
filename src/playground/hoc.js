import React from 'react';
import ReactDOM from 'react-dom'

const Info = (props) => {
    return (
        <div>
            <h1>Info</h1>
            <p>The info is: {props.info}</p>
        </div>
    );
}

const widthAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is sensitive data. Please keep confidential!</p>}
            <WrappedComponent {...props} />
        </div>
    )
}

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            { props.isAuthenticated ? (<WrappedComponent {...props} />) : (<p>Please Authenticate!</p>)}
        </div>
    )
}

const AdminInfo = widthAdminWarning(Info)
const AuthInfo = requireAuthentication(Info)

ReactDOM.render(<AuthInfo isAuthenticated={true} info="These are the juicy details." />, document.getElementById('app'))