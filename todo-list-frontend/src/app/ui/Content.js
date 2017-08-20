'use strict';

const React = require('react');
const SuccessAlert = require('./alerts/SuccessAlert');
const ErrorAlert = require('./alerts/ErrorAlert');

const Col = require('react-bootstrap').Col;
const Row = require('react-bootstrap').Row;
const Jumbotron = require('react-bootstrap').Jumbotron;
const Button = require('react-bootstrap').Button;

const CreateTask = require('./CreateTask');
const TaskList = require('./TaskList');

const EventEmitter = require('fbemitter').EventEmitter;

class Content extends React.Component {

    constructor(params) {
        super(params);
        this.emitter = new EventEmitter();
    }

    render() {
        const successMsg = this.props.location.state && this.props.location.state.msg;
        const errorMsg = this.props.location.state && this.props.location.state.errorMsg;

        return <div>

            <SuccessAlert msg={successMsg}/>
            <ErrorAlert msg={errorMsg}/>

            <Jumbotron>
                <div className="container">
                    <Row>
                        <Col xs={12} md={3} lg={2}>
                            <h2>Task</h2>
                        </Col>
                        <Col xs={12} md={9} lg={19}>
                            <CreateTask emitter={this.emitter}/>
                        </Col>
                    </Row>
                </div>
            </Jumbotron>

            <div className="container">
                <Row>
                    <TaskList emitter={this.emitter}/>
                </Row>
            </div>
        </div>
    }
};

module.exports = Content;
