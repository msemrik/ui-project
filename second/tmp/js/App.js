var Contador = require('./Contador');

class App extends React.Component {
  constructor(props) {
    super();
    var cuenta = 5;
    var storedCount = localStorage.getItem('myData');

    if (storedCount) {
      cuenta = parseInt(storedCount) + 1;
      localStorage.setItem('myData', cuenta);
    }

    this.state = {
      'count': cuenta
    };
  }

  render() {
    // return React.createElement('h1', null, 'aasdasdasdasd');
    var a = React.createElement('a', {
      'ref': function (el) {
        if (el) {
          this.esteEsMiA = el;
          console.log('a exist');
        } else {
          console.log('a do not exist');
        }
      }.bind(this)
    }, React.createElement(Contador, {
      'title': 'Hola mundo!',
      'count': this.state.count,
      'onIncrementar': this.getIncrementFunction(),
      'onDecrementar': this.getDecrementFunction() // ,'children': function (){ return React.createElement('h1', null, 'pppppppqqqqqq')}

    }, React.createElement('br'), React.createElement('br'), React.createElement('br'), React.createElement('br'), React.createElement('br'), React.createElement('br'), React.createElement('span', null, 'asdasd')));
    ;
    return a;
  }

  getIncrementFunction() {
    return function () {
      this.state.count = this.state.count + 1;
      this.setState({
        count: this.state.count
      });
      localStorage.setItem('myData', this.state.count);
    }.bind(this);
  }

  getDecrementFunction() {
    return function () {
      this.state.count = this.state.count - 1;
      this.setState({
        count: this.state.count
      });
      localStorage.setItem('myData', this.state.count);
    }.bind(this);
  }

}

module.exports = App;