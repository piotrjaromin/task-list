'use strict';

const axios = require('axios');
const config = require('Config');

let backendUrl = config.backendUrl;
//workaround when no backendurl is provided 
//assume that backend is runing on the same host as frontend and on port 3000
//help when someone uses docker-machine instead of native one
if ( !backendUrl ) {
    backendUrl = `${location.protocol}//${window.location.hostname}:3000`;
}

const httpClient = axios.create({
  baseURL: `${backendUrl}/tasks`,
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