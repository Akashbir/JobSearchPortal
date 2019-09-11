import React from 'react'
import ReactDOM from 'react-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Login from './containers/Login'
import HomePage from './containers/HomePage'

ReactDOM.render(
    <div className="container-fluid">
        <HomePage/>
    </div>,
    document.getElementById("root")
);
