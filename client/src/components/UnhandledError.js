import React from 'react';

/**
 * Component to display unhandled errors aka 500 errors. 
 */
export default function UnhandledError() {
    return(
        <div className="bounds">
            <h1>Error</h1>
            <p>Sorry! We just encountered an unexpected error.</p>
        </div>
    );
}