'use strict';

const withRouter = require('react-router/lib/withRouter');
const React = require('react');

module.exports.enableRouting = function (element) {
    element.propTypes = {
        router: React.PropTypes.shape({
            push: React.PropTypes.func.isRequired
        }).isRequired
    };

    return withRouter(element);
};


module.exports.toMainWithError = function (self, msg) {
    self.props.router.push({
        pathname: '/',
        state: {errorMsg: msg}
    })
};

module.exports.toMainWithSuccess = function (self, msg) {
    self.props.router.push({
        pathname: '/',
        state: {msg: msg}
    })
};

module.exports.toPathWithState = function (self,path,state) {
    self.props.router.push({
        pathname: path,
        state: state
    })
};