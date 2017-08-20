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
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.toNode = this.toNode.bind(this);
        this.id = this.id.bind(this);
        this.treeNodeId = 0;
    }

    doneHandler(data) {
        return () => {
            data.done = !data.done;
            this.updateTask();
            this.props.emitter.emit("updatedTasks");
        }
    }



    handleKeyPress(data) {
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

    toNode(data) {

        const subTasks = (data.subTasks || []);
        subTasks.sort(utils.sortByDone);
        const subTaskNodes = subTasks.map(this.toNode);

        const checked = data.done ? "checked" : "";

        const style = data.done ? {"textDecoration":"line-through"} : null;
        const label = <span style={style}>{data.text}</span>

        return <TreeView defaultCollapsed={false} nodeLabel={label} key={this.id()}>
            <Checkbox checked={checked} onChange={this.doneHandler(data)}>
                Done
            </Checkbox>
            <FormControl type="text" onKeyPress={this.handleKeyPress(data)} onChange={this.handleTextChange(data)}/>
            {subTaskNodes}
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
