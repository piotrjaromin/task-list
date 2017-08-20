"use strict";

const React = require('react');
const taskDal = require('../task-dal');
const ErrorAlert = require("./alerts/ErrorAlert");

const Task = require('./Task');
const utils = require('./utils'); 
const logger = require('../logger');


class TaskList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { tasks : []};
        this.fetchTasks = this.fetchTasks.bind(this);
        this.props.emitter.addListener('updatedTasks', () => {
            this.fetchTasks();
        })
    }

    fetchTasks() {
        logger.debug("loaded tasks");
        
        taskDal.getTasks()
            .then( tasks =>{ 
                tasks.sort(utils.sortByDone);
                this.setState({tasks});
        });
    }

    componentDidMount() {
        logger.debug("mounted task list");
        this.fetchTasks();
    }

    render() {

        const tasks = this.state.tasks.map( t => <Task data={t} key={t._id} emitter={this.props.emitter}/>)
        return <div className="row">
              {tasks} 
        </div>
    }
}

module.exports = TaskList;
