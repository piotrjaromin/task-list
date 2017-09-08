"use strict";

const React = require('react');
const taskDal = require('../task-dal');
const ErrorAlert = require("./alerts/ErrorAlert");
const Checkbox = require('react-bootstrap').Checkbox;
const utils = require('./utils');

const routingUtils = require('../utils/routing');
const TreeView = require('react-treeview');

const FormControl = require('react-bootstrap').FormControl;

const logger = require('../logger');

class Task extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.props.data;
        this.updateTask = this.updateTask.bind(this);
        this.handleCreateSub = this.handleCreateSub.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.toNode = this.toNode.bind(this);
        this.id = this.id.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.submitEdit = this.submitEdit.bind(this);
        this.treeNodeId = 0;
    }

    doneHandler(data) {
        return () => {
            data.done = !data.done;
            this.updateTask();
            this.props.emitter.emit("updatedTasks");
        }
    }

    handleCreateSub(data) {
        return target => {
            if(target.charCode==13){
                console.log(data.tempTask);

                data.subTasks = data.subTasks || [];
                data.subTasks.push( { text : data.tempTask});
                delete data.tempTask;

                this.updateTask();
            }
        }
    }

    handleCreate(e) {
        e.preventDefault();
        this.createTask();
    }

    updateTask() {
        return taskDal.updateTask(this.state._id, this.state)
            .then( () => {
                logger.debug("task updated");
                this.setState(this.state);
            })
            .catch( err => {
                logger.error("Could not update task. ", err);
                routingUtils.toMainWithError(this, "Could not update task");
            })
    }

    handleTextChange(data) {
        return (e) => {
            e.preventDefault();
            data.tempTask = e.target.value;
        };
    }

    deleteTask( id ) {
        return () => {
            if ( this.state._id == id) {
                return taskDal.deleteTask(id)
                    .then( () => this.props.emitter.emit("updatedTasks"))
                    .catch( err => {
                        logger.error("Could not delete task. ", err);
                        routingUtils.toMainWithError(this, "Could not delete task");
                    });
            }

            this.removeSubTask(id, this.state);
            this.updateTask();
        }
    }

    removeSubTask(id, task) {
        task.subTasks = task.subTasks.filter( t => t._id != id);
        if ( task.subTasks.length > 0 ) {
            task.subTasks.forEach( t => removeSubTask(id, t));
        }
    }


    handleEdit(data) {
        return (e) => {
            e.preventDefault();
            data.text = e.target.value;
            this.setState(this.state);
        }
    }

    submitEdit(target) {
        if(target.charCode==13){
            logger.debug("submit edit task");
            this.updateTask();
        }
    }

    toNode(data) {

        const subTasks = (data.subTasks || []);
        subTasks.sort(utils.sortByDone);
        data._id = data._id || this.id();
        const subTaskNodes = subTasks.map(this.toNode);

        const checked = data.done ? "checked" : "";

        const style = data.done ? {"textDecoration":"line-through"} : null;
        const label = (
            <span style={style}> <FormControl type="text" value={data.text} onKeyPress={this.submitEdit} onChange={this.handleEdit(data)}/>
            </span>
        )

        return <TreeView defaultCollapsed={false} nodeLabel={label}>
            <Checkbox checked={checked} onChange={this.doneHandler(data)} inline>
                Done
            </Checkbox>
            &nbsp;<a href="#" onClick={this.deleteTask(data._id)}>delete</a>
            {subTaskNodes}

            <hr/>
            <FormControl type="text" placeholder="Create sub task" onKeyPress={this.handleCreateSub(data)} onChange={this.handleTextChange(data)}/>
        </TreeView>
    }


    id() {
        this.treeNodeId++;
        return this.treeNodeId;
    }

    render() {
        return <div className="row">     
            {this.toNode(this.state)}
        </div>
    }
}

module.exports = routingUtils.enableRouting(Task);
