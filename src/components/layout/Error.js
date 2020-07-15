import React from 'react';

const Error = ({message, clearError}) =>{

    return(
        <div className="errorMessage">
            <span> {message} </span>
            <button onClick={clearError}>✕</button>
        </div>

    );
}

export default Error;