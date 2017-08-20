'use strict';

const axios = require('axios');
const config = require('Config');

var httpClient = axios.create({
  baseURL: `${config.backendUrl}/tasks`,
  timeout: 1000,
    auth: {
    username: config.basic.user,
    password: config.basic.pass
  },
  headers: {
      "content-type"  : "application/json"
  }
});

function createTask(task) {

    return httpClient.post(``, task);
}


function updateTask(id, task) {

    return httpClient.put(`/${id}`, task);
}

function deleteTask(id) {

    return httpClient.delete(`/${id}`)
}

function getSingleTask(id) {

    return httpClient.get(`/${id}`)
}

function getTasks() {
    return httpClient.get(``).then( resp => resp.data);
}

module.exports.createTask = createTask;
module.exports.deleteTask = deleteTask;
module.exports.getSingleTask = getSingleTask;
module.exports.getTasks = getTasks;
module.exports.updateTask = updateTask;