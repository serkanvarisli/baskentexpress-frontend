import React from 'react';
import '../style.css';
import Header from './Header';
import Form from './Form';
import Darkmode from './darkmode';

function Container() {
    return (
        <>
            <div className="normal">
                <br />
            </div>
            <div className="container">
                <Darkmode />
                <Header />
                <Form />
            </div>
        </>
    );
}

export default Container;
