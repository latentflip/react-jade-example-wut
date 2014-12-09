var React = require('react');
var jade = require('react-jade');
var extend = require('amp-extend');


var JadeMixin = {
    renderTemplate: function (locals) {
        locals = extend({}, locals, this.components || {});
        return this.template(locals);
    }
};


var MyComponent2 = React.createClass({
    mixins: [JadeMixin],
    template: jade.compileFile(__dirname + '/template2.jade'),

    getInitialState: function () {
        return { time: 0 };
    },

    componentWillMount: function () {
        setInterval(function () {
            this.setState({ time: Date.now() });
        }.bind(this), 100);
    },

    render: function () {
        return this.renderTemplate({
            time: this.state.time
        });
    }
});



var MyComponent = React.createClass({
    mixins: [JadeMixin],
    template: jade.compileFile(__dirname + '/template.jade'),
    components: {
        MyComponent2: MyComponent2
    },

    render: function () {
        return this.renderTemplate({
            title: 'It is a title'
        });
    }
});



React.renderComponent(MyComponent({}), document.body);
