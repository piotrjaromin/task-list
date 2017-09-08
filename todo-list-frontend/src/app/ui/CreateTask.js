"use strict";

const React = require('react');
const taskDal = require('../task-dal');
const ErrorAlert = require("./alerts/ErrorAlert");
const routingUtils = require('../utils/routing');
const FormControl = require('react-bootstrap').FormControl;
const logger = require('../logger');

class CreateTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = { text : ""};
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.createTask = this.createTask.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(target) {
        if(target.charCode==13){
            this.createTask();
        }
    }

    handleCreate(e) {
        e.preventDefault();
        this.createTask();
    }

    createTask() {
        const state = this.state;

        if ( !state.text || state.text.length === 0 ) {
            return this.setState({
                mainErrorMsg: "Text field cannot be empty"
            });
        }
        
        this.setState({mainErrorMsg: null});

        taskDal.createTask(this.state)
            .then( () => {
                this.setState({text : ""});
                routingUtils.toMainWithSuccess(this, "Created task");
                this.props.emitter.emit("updatedTasks");
            })
            .catch( err => { 
                logger.error("Could not create task ", err);
                routingUtils.toMainWithError(this, "Task could not be created");
            });
    }

    handleTextChange(e) {
        const text = e.target.value;
        this.setState({text});
    }

    render() {
        const errors = this.state.errors || {};

        return <div className="row">
                <form>
                    <ErrorAlert msg={this.state.mainErrorMsg}/>

                    <FormControl 
                        type="text" onKeyPress={this.handleKeyPress} 
                        value={this.state.text} 
                        id="text" 
                        onChange={this.handleTextChange}
                    />

                    <div className="form-group">
                        <button onClick={this.handleCreate} type="button" className="btn btn-success pull-right">
                            <span className="glyphicon glyphicon-plus"/>
                            Add Task
                        </button>
                    </div>
                </form>
        </div>
    }
}

module.exports = routingUtils.enableRouting(CreateTask);
