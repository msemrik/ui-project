var App = require('./App');
var App2 = require('./App2');


class AppPosta extends React.Component {

    render() {
        return <div><App ref={function (el) {
            if (el) {
                console.log('app posta exist');
            } else {
                console.log('app posta do not exist');
            }
        }}/>
            <App2 ref={function (el) {
                if (el) {
                    console.log('app posta exist');
                } else {
                    console.log('app posta do not exist');
                }
            }}/>;
            <App2 ref={function (el) {
                if (el) {
                    console.log('app posta exist');
                } else {
                    console.log('app posta do not exist');
                }
            }}/>;
        </div>
        // React.createElement(App, {'ref': function (el) {if(el){console.log('app posta exist');} else{console.log('app posta do not exist');}}});
    }
}


ReactDOM.render(React.createElement(AppPosta), document.getElementById('content'));