'use strict';

const React = require('react');
const Alert = require('react-bootstrap').Alert;
const Row = require('react-bootstrap').Row;
const PropTypes = require('prop-types');

class ErrorAlert extends React.Component {

    render() {

        if ( !this.props.msg || this.props.msg.length === 0) {
            return null;
        }

        return <Row>
            <Alert bsStyle="danger" className="text-center">
                {this.props.msg}
            </Alert>
        </Row>
    }
}

ErrorAlert.propTypes = {
    msg: PropTypes.string
};

module.exports = ErrorAlert;
