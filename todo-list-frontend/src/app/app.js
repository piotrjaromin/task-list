'use strict';

require('../../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../styles/main.scss');
require('../../node_modules/react-treeview/react-treeview.css');


const React = window.React = require('react'),
    ReactDOM = require("react-dom"),
    Footer = require("./ui/Footer"),
    Content = require("./ui/Content"),
    Navigation = require("./ui/Navigation"),
    mountNode = document.getElementById("app");

const Route = require("react-router/lib/Route");
const Router = require("react-router/lib/Router");
const IndexRoute = require("react-router/lib/IndexRoute");
const hashHistory = require("react-router/lib/hashHistory");


class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <Navigation/>
            <div>
                {this.props.children}
                <Footer/>
            </div>
        </div>
    }
}

class Container extends React.Component {

    render() {
        return <div className="container">
            {this.props.children}
        </div>
    }
}

ReactDOM.render(<Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Content}/>
        </Route>
    </Router>,
    mountNode);
