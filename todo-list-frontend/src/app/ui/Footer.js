'use strict';

const React = require('react');
const Col = require('react-bootstrap').Col;
const Row = require('react-bootstrap').Row;

const Footer = React.createClass({
    render() {
        return <footer>
            <hr/>
            <Col lg={12}>
                <p>Copyright &copy; 2017</p>
            </Col>
        </footer>
    }
});


module.exports = Footer;
