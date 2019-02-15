class Contador extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return React.createElement('h1', null, 'Mi Sitio - ' + this.props.title, React.createElement('br'), React.createElement('br'), 'Actual count: ' + this.props.count, React.createElement('button', {
      'onClick': this.props.onIncrementar,
      'ref': function (el) {
        if (el) {
          console.log('button exist');
        } else {
          console.log('button do not exist');
        }
      }
    }, 'increment'), React.createElement('button', {
      'onClick': this.props.onDecrementar
    }, 'decrement'), this.props.children);
  }

}

Contador.propTypes = {
  count: PropTypes.number.isRequired
};
module.exports = Contador;