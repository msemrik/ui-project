var Contador = require('./Contador');
var createReactClass = require('create-react-class');
// var React = require('react');


var App2 = createReactClass({

    getInitialState: function () {
        // var query = window.location.search.substring(1);
        // var qs = this.parse_query_string(query);
        // alert(qs);

        var cuenta = 5;
        var storedCount = localStorage.getItem('myData');
        if (storedCount) {
            cuenta = parseInt(storedCount) + 1;
            localStorage.setItem('myData', cuenta);
        }
        return {
            count: cuenta
        }
    },


    render() {
        // return React.createElement('h1', null, 'aasdasdasdasd');
        var a =
            React.createElement('a', {
                    'ref': function (el) {
                        if (el) {
                            this.esteEsMiA = el;
                            console.log('a exist');
                        } else {
                            console.log('a do not exist');
                        }
                    }.bind(this)
                },
                React.createElement(Contador,
                    {

                        'title': 'Hola mundo!',
                        'count': this.state.count,
                        'onIncrementar': this.getIncrementFunction(),
                        'onDecrementar': this.getDecrementFunction()
                        // ,'children': function (){ return React.createElement('h1', null, 'pppppppqqqqqq')}
                    }
                    ,
                    React.createElement('br'),
                    React.createElement('br'),
                    React.createElement('br'),
                    React.createElement('br'),
                    React.createElement('br'),
                    React.createElement('br'),
                    React.createElement('span', null, 'asdasd'),
                ));
        ;
        return a;

    },

    getIncrementFunction() {
        return function () {
            this.state.count = this.state.count + 1;
            this.setState({count: this.state.count});
            localStorage.setItem('myData', this.state.count);
        }.bind(this)
    },

    getDecrementFunction() {
        return function () {
            this.state.count = this.state.count - 1;
            this.setState({count: this.state.count});
            localStorage.setItem('myData', this.state.count);
        }.bind(this)
    },

    parse_query_string(query)
{
    var vars = query.split("&");
    var query_string = {};
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        var key = decodeURIComponent(pair[0]);
        var value = decodeURIComponent(pair[1]);
        // If first entry with this name
        if (typeof query_string[key] === "undefined") {
            query_string[key] = decodeURIComponent(value);
            // If second entry with this name
        } else if (typeof query_string[key] === "string") {
            var arr = [query_string[key], decodeURIComponent(value)];
            query_string[key] = arr;
            // If third or later entry with this name
        } else {
            query_string[key].push(decodeURIComponent(value));
        }
    }
    return query_string;
}
})
;

module.exports = App2;