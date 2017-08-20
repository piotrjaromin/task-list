'use strict';

let Link = require("react-router/lib/Link");
let React = require('react');

let Navigation = React.createClass({
    render() {
        return <nav className="navbar navbar-inverse navbar-static-top" role="navigation">
            <div className="container">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">Tasks</a>
                </div>
            </div>
        </nav>
    }
});

module.exports = Navigation;
