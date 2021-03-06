// require('./AppPosta.jsx');
var Alert = require('react-bootstrap').Alert;
var Button = require('react-bootstrap').Button;
var ListGroup = require('react-bootstrap').ListGroup;
var ListGroupItem = require('react-bootstrap').ListGroupItem;
var Modal = require('react-bootstrap').Modal;
var VictoryBar = require('victory').VictoryBar;
var VictoryChart = require('victory').VictoryChart;
var React = require('react');
var ReactDOM = require('react-dom');
// alert('index works');

const data = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000},
    {quarter: 5, earnings: 19000},
    {quarter: 6, earnings: 19000}
];


class AlertDismissable extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleDismiss = this.handleDismiss.bind(this);
        this.handleShow = this.handleShow.bind(this);

        this.state = {
            show: true
        };
    }

    handleDismiss() {
        this.setState({show: false});
    }

    handleShow() {
        this.setState({show: true});
    }

    render() {
        if (this.state.show) {
            return (
                <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
                    <h4>Oh snap! You got an error!</h4>
                    <p>
                        Change this and that and try again. Duis mollis, est non commodo
                        luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                        Cras mattis consectetur purus sit amet fermentum.
                    </p>
                    <p>
                        <Button bsStyle="danger">Take this action</Button>
                        <span> or </span>
                        <Button onClick={this.handleDismiss}>Hide Alert</Button>
                    </p>
                </Alert>
            );
        }

        return <Button onClick={this.handleShow}>Show Alert</Button>;
    }
}


class Resultados extends React.Component {
    render() {
        return <div>
            {/*<AlertDismissable bsStyle="warning">*/}
            {/*<strong>Holy guacamole!</strong> Best check yo self, you're not looking too*/}
            {/*good.*/}
            {/*</AlertDismissable>*/}
            {/*<ul className="resultados-lista">*/}
            {/*{this.props.resultados.map(function (resultado) {*/}
            {/*return <Itemresultado key={resultado.id} resultado={resultado}></Itemresultado>;*/}
            {/*}.bind(this))}*/}
            {/*</ul>*/}
            <ListGroup>
                {this.props.mediciones.map(function (medicion) {
                    return <Itemmedicion key={medicion.id} id={medicion.id} medicion={medicion}></Itemmedicion>;
                }.bind(this))}
            </ListGroup>
        </div>;
    }
}




class OwnModal extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: props.showProperty
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({show: newProps.showProperty})
    }


    handleClose() {
        this.setState({show: false});
    }

    handleShow() {
        this.setState({show: true});
    }

    handleClick(e) {
        e.stopPropagation();
        e.preventDefault();
        alert('aa');
    };

    render() {
        return <Modal show={this.state.show} onHide={this.handleClose} onClick={this.handleClick} backdrop={true}>
            <Modal.Header closeButton>
                <Modal.Title>Medición</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{moment(this.props.medicion.fecha).format('d MMM YYYY')}</h4>
                <p>
                    {this.props.medicion.valores.temperatura}°
                    {this.props.medicion.valores.humedad}%
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    }
}


class Itemmedicion extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false
        };
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({open: true});
    };

    render() {
        var medicion = this.props.medicion;
        return <div>
            <ListGroupItem href="#" onClick={this.handleClick.bind(this)}>
                {moment(medicion.fecha).format('d MMM YYYY')}
                {medicion.valores.temperatura}°
                {medicion.valores.humedad}%

            </ListGroupItem>
            <OwnModal medicion={medicion} showProperty={this.state.open}></OwnModal>
        </div>
    }

}


class Itemresultado extends React.Component {
    render() {
        var resultado = this.props.resultado;
        return <li className="resultado">
            <h3>
                <a href={resultado.html_url} target="_blank">
                    {resultado.name}
                </a> {resultado.private && <span className={"resultado-privado"}>Privado</span>}
            </h3>
            <p className="resultado-info">
                {resultado.fork && <span className="resultado-fork">
                   <i className="fa fa-code-fork"/> Forkeado
               </span>}
            </p>
            <p className="resultado-description"> {resultado.description}</p>
            <p className="resultado-actualizado"> Actualizado {moment(resultado.updated_at).fromNow()} </p>
            <div className="resultado-stats">
               <span className="resultado-stat">
                   {resultado.language}
               </span>
            </div>
        </li>;
    }

}


class FormularioBusqueda extends React.Component {
    constructor(props) {
        super();
        this.state = {
            usuario: props.usuario,
            incluirMiembro: props.incluirMiembro
        };
    }


    handleSubmit(ev) {
        ev.preventDefault();
        console.log("handleSubmit");

        this.props.onBuscar({
            usuario: this.state.usuario,
            incluirMiembro: this.state.incluirMiembro
        })
    }


    handleUsuario(ev) {
        console.log("handleUsuario " + ev.target.value);
        this.setState({usuario: ev.target.value});
    }

    handleIncluirMiembro(ev) {
        console.log("handleIncluirMiembro " + ev.target.checked);
        console.log(this.state);
        this.setState({incluirMiembro: ev.target.checked});
        console.log(this.state);
    }


    render() {
        return < form className="formulario-busqueda" onSubmit={this.handleSubmit.bind(this)}>
            <input className="input-usuario"
                   type="text"
                   onChange={this.handleUsuario.bind(this)}
                   value={this.state.usuario}/>
            <button className="formulario-submit" type="submit">Buscar</button>
            <label className="check-miembro">
                <input type="checkbox"
                       onChange={this.handleIncluirMiembro.bind(this)}
                       checked={this.state.incluirMiembro}/>
                Incluir repositorios donde el usuario es miembro
            </label>
        </form>

    }

}

class App extends React.Component {
    constructor(props) {
        super();
        this.state = {
            resultados: resultados,
            mediciones: mediciones,
            usuario: "gaearon",
            incluirMiembro: false
        };
    }

    componentDidMount() {
        this.buscarResultados(this.state);
    }

    buscarResultados(params) {
        var url = 'https://api.github.com/users/' + params.usuario + '/repos?sort=updated&access_token=efd2602901c94d96c0955b6098f576167e9f021a';
        console.log(params.incluirMiembro);
        if (params.incluirMiembro) {
            url += '&type=all';
        }
        console.log(url);

        fetch(url).then(function (response) {
            if (response.ok) {
                response.json().then(function (body) {
                    this.setState({resultados: body});
                }.bind(this));
            } else {
                this.setState({resultados: []});
            }
        }.bind(this));
    }

    cambiarCriterioBusqueda(state) {
        this.setState(state);
        this.buscarResultados(state);
    }

    render() {
        return <div  className="app">
            <FormularioBusqueda
                usuario={this.state.usuario}
                incluirMiembro={this.state.incluirMiembro}
                onBuscar={this.cambiarCriterioBusqueda.bind(this)}/>

            <Resultados resultados={this.state.resultados} mediciones={this.state.mediciones}/>
            <div className={"chartCSS"}>
            <VictoryChart >
                <VictoryBar
                    // theme={VictoryTheme.material}
                    // className="chartCSS"
                    // style={divStyle}
                            data={data}
                            x={"quarter"}
                            y={"earnings"}
                />
            </VictoryChart>
            </div>
        </div>



    }


}

var divStyle = {
    'background-color': 'white',
    WebkitTransition: 'all', // note the capital 'W' here
    msTransition: 'all' // 'ms' is the only lowercase vendor prefix
};


var resultados = [];
var mediciones = [{"id": 1, "fecha": "2018-02-15", "valores": {"temperatura": 30, "humedad": 88}}, {
    "id": 2,
    "fecha": "2018-01-06",
    "valores": {"temperatura": 20, "humedad": 50}
}];

var resultados2 = [{
        "id": 46996317,
        "node_id": "MDEwOlJlcG9zaXRvcnk0Njk5NjMxNw==",
        "name": "CuantoEnQue",
        "full_name": "msemrik/CuantoEnQue",
        "private": false,
        "owner": {
            "login": "msemrik",
            "id": 16051243,
            "node_id": "MDQ6VXNlcjE2MDUxMjQz",
            "avatar_url": "https://avatars2.githubusercontent.com/u/16051243?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/msemrik",
            "html_url": "https://github.com/msemrik",
            "followers_url": "https://api.github.com/users/msemrik/followers",
            "following_url": "https://api.github.com/users/msemrik/following{/other_user}",
            "gists_url": "https://api.github.com/users/msemrik/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/msemrik/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/msemrik/subscriptions",
            "organizations_url": "https://api.github.com/users/msemrik/orgs",
            "repos_url": "https://api.github.com/users/msemrik/repos",
            "events_url": "https://api.github.com/users/msemrik/events{/privacy}",
            "received_events_url": "https://api.github.com/users/msemrik/received_events",
            "type": "User",
            "site_admin": false
        },
        "html_url": "https://github.com/msemrik/CuantoEnQue",
        "description": null,
        "fork": false,
        "url": "https://api.github.com/repos/msemrik/CuantoEnQue",
        "forks_url": "https://api.github.com/repos/msemrik/CuantoEnQue/forks",
        "keys_url": "https://api.github.com/repos/msemrik/CuantoEnQue/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/msemrik/CuantoEnQue/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/msemrik/CuantoEnQue/teams",
        "hooks_url": "https://api.github.com/repos/msemrik/CuantoEnQue/hooks",
        "issue_events_url": "https://api.github.com/repos/msemrik/CuantoEnQue/issues/events{/number}",
        "events_url": "https://api.github.com/repos/msemrik/CuantoEnQue/events",
        "assignees_url": "https://api.github.com/repos/msemrik/CuantoEnQue/assignees{/user}",
        "branches_url": "https://api.github.com/repos/msemrik/CuantoEnQue/branches{/branch}",
        "tags_url": "https://api.github.com/repos/msemrik/CuantoEnQue/tags",
        "blobs_url": "https://api.github.com/repos/msemrik/CuantoEnQue/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/msemrik/CuantoEnQue/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/msemrik/CuantoEnQue/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/msemrik/CuantoEnQue/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/msemrik/CuantoEnQue/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/msemrik/CuantoEnQue/languages",
        "stargazers_url": "https://api.github.com/repos/msemrik/CuantoEnQue/stargazers",
        "contributors_url": "https://api.github.com/repos/msemrik/CuantoEnQue/contributors",
        "subscribers_url": "https://api.github.com/repos/msemrik/CuantoEnQue/subscribers",
        "subscription_url": "https://api.github.com/repos/msemrik/CuantoEnQue/subscription",
        "commits_url": "https://api.github.com/repos/msemrik/CuantoEnQue/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/msemrik/CuantoEnQue/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/msemrik/CuantoEnQue/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/msemrik/CuantoEnQue/issues/comments{/number}",
        "contents_url": "https://api.github.com/repos/msemrik/CuantoEnQue/contents/{+path}",
        "compare_url": "https://api.github.com/repos/msemrik/CuantoEnQue/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/msemrik/CuantoEnQue/merges",
        "archive_url": "https://api.github.com/repos/msemrik/CuantoEnQue/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/msemrik/CuantoEnQue/downloads",
        "issues_url": "https://api.github.com/repos/msemrik/CuantoEnQue/issues{/number}",
        "pulls_url": "https://api.github.com/repos/msemrik/CuantoEnQue/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/msemrik/CuantoEnQue/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/msemrik/CuantoEnQue/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/msemrik/CuantoEnQue/labels{/name}",
        "releases_url": "https://api.github.com/repos/msemrik/CuantoEnQue/releases{/id}",
        "deployments_url": "https://api.github.com/repos/msemrik/CuantoEnQue/deployments",
        "created_at": "2015-11-27T19:28:10Z",
        "updated_at": "2015-12-05T20:28:26Z",
        "pushed_at": "2015-12-05T21:00:58Z",
        "git_url": "git://github.com/msemrik/CuantoEnQue.git",
        "ssh_url": "git@github.com:msemrik/CuantoEnQue.git",
        "clone_url": "https://github.com/msemrik/CuantoEnQue.git",
        "svn_url": "https://github.com/msemrik/CuantoEnQue",
        "homepage": null,
        "size": 4375,
        "stargazers_count": 0,
        "watchers_count": 0,
        "language": "JavaScript",
        "has_issues": true,
        "has_projects": true,
        "has_downloads": true,
        "has_wiki": true,
        "has_pages": false,
        "forks_count": 0,
        "mirror_url": null,
        "archived": false,
        "open_issues_count": 0,
        "license": null,
        "forks": 0,
        "open_issues": 0,
        "watchers": 0,
        "default_branch": "master"
    },
        {
            "id": 61420126,
            "node_id": "MDEwOlJlcG9zaXRvcnk2MTQyMDEyNg==",
            "name": "CustomizedSunshine",
            "full_name": "msemrik/CustomizedSunshine",
            "private": false,
            "owner": {
                "login": "msemrik",
                "id": 16051243,
                "node_id": "MDQ6VXNlcjE2MDUxMjQz",
                "avatar_url": "https://avatars2.githubusercontent.com/u/16051243?v=4",
                "gravatar_id": "",
                "url": "https://api.github.com/users/msemrik",
                "html_url": "https://github.com/msemrik",
                "followers_url": "https://api.github.com/users/msemrik/followers",
                "following_url": "https://api.github.com/users/msemrik/following{/other_user}",
                "gists_url": "https://api.github.com/users/msemrik/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/msemrik/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/msemrik/subscriptions",
                "organizations_url": "https://api.github.com/users/msemrik/orgs",
                "repos_url": "https://api.github.com/users/msemrik/repos",
                "events_url": "https://api.github.com/users/msemrik/events{/privacy}",
                "received_events_url": "https://api.github.com/users/msemrik/received_events",
                "type": "User",
                "site_admin": false
            },
            "html_url": "https://github.com/msemrik/CustomizedSunshine",
            "description": "android version with some tweaks",
            "fork": false,
            "url": "https://api.github.com/repos/msemrik/CustomizedSunshine",
            "forks_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/forks",
            "keys_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/keys{/key_id}",
            "collaborators_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/collaborators{/collaborator}",
            "teams_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/teams",
            "hooks_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/hooks",
            "issue_events_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/issues/events{/number}",
            "events_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/events",
            "assignees_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/assignees{/user}",
            "branches_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/branches{/branch}",
            "tags_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/tags",
            "blobs_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/git/blobs{/sha}",
            "git_tags_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/git/tags{/sha}",
            "git_refs_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/git/refs{/sha}",
            "trees_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/git/trees{/sha}",
            "statuses_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/statuses/{sha}",
            "languages_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/languages",
            "stargazers_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/stargazers",
            "contributors_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/contributors",
            "subscribers_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/subscribers",
            "subscription_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/subscription",
            "commits_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/commits{/sha}",
            "git_commits_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/git/commits{/sha}",
            "comments_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/comments{/number}",
            "issue_comment_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/issues/comments{/number}",
            "contents_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/contents/{+path}",
            "compare_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/compare/{base}...{head}",
            "merges_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/merges",
            "archive_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/{archive_format}{/ref}",
            "downloads_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/downloads",
            "issues_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/issues{/number}",
            "pulls_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/pulls{/number}",
            "milestones_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/milestones{/number}",
            "notifications_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/notifications{?since,all,participating}",
            "labels_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/labels{/name}",
            "releases_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/releases{/id}",
            "deployments_url": "https://api.github.com/repos/msemrik/CustomizedSunshine/deployments",
            "created_at": "2016-06-18T06:21:08Z",
            "updated_at": "2016-06-18T06:27:50Z",
            "pushed_at": "2016-06-18T06:27:49Z",
            "git_url": "git://github.com/msemrik/CustomizedSunshine.git",
            "ssh_url": "git@github.com:msemrik/CustomizedSunshine.git",
            "clone_url": "https://github.com/msemrik/CustomizedSunshine.git",
            "svn_url": "https://github.com/msemrik/CustomizedSunshine",
            "homepage": null,
            "size": 2091,
            "stargazers_count": 0,
            "watchers_count": 0,
            "language": "Java",
            "has_issues": true,
            "has_projects": true,
            "has_downloads": true,
            "has_wiki": true,
            "has_pages": false,
            "forks_count": 0,
            "mirror_url": null,
            "archived": false,
            "open_issues_count": 0,
            "license": {
                "key": "apache-2.0",
                "name": "Apache License 2.0",
                "spdx_id": "Apache-2.0",
                "url": "https://api.github.com/licenses/apache-2.0",
                "node_id": "MDc6TGljZW5zZTI="
            },
            "forks": 0,
            "open_issues": 0,
            "watchers": 0,
            "default_branch": "master"
        },
        {
            "id": 51326841,
            "node_id": "MDEwOlJlcG9zaXRvcnk1MTMyNjg0MQ==",
            "name": "HowMuchInWhat",
            "full_name": "msemrik/HowMuchInWhat",
            "private": false,
            "owner": {
                "login": "msemrik",
                "id": 16051243,
                "node_id": "MDQ6VXNlcjE2MDUxMjQz",
                "avatar_url": "https://avatars2.githubusercontent.com/u/16051243?v=4",
                "gravatar_id": "",
                "url": "https://api.github.com/users/msemrik",
                "html_url": "https://github.com/msemrik",
                "followers_url": "https://api.github.com/users/msemrik/followers",
                "following_url": "https://api.github.com/users/msemrik/following{/other_user}",
                "gists_url": "https://api.github.com/users/msemrik/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/msemrik/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/msemrik/subscriptions",
                "organizations_url": "https://api.github.com/users/msemrik/orgs",
                "repos_url": "https://api.github.com/users/msemrik/repos",
                "events_url": "https://api.github.com/users/msemrik/events{/privacy}",
                "received_events_url": "https://api.github.com/users/msemrik/received_events",
                "type": "User",
                "site_admin": false
            },
            "html_url": "https://github.com/msemrik/HowMuchInWhat",
            "description": "Server Repository",
            "fork": false,
            "url": "https://api.github.com/repos/msemrik/HowMuchInWhat",
            "forks_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/forks",
            "keys_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/keys{/key_id}",
            "collaborators_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/collaborators{/collaborator}",
            "teams_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/teams",
            "hooks_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/hooks",
            "issue_events_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/issues/events{/number}",
            "events_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/events",
            "assignees_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/assignees{/user}",
            "branches_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/branches{/branch}",
            "tags_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/tags",
            "blobs_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/git/blobs{/sha}",
            "git_tags_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/git/tags{/sha}",
            "git_refs_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/git/refs{/sha}",
            "trees_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/git/trees{/sha}",
            "statuses_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/statuses/{sha}",
            "languages_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/languages",
            "stargazers_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/stargazers",
            "contributors_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/contributors",
            "subscribers_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/subscribers",
            "subscription_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/subscription",
            "commits_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/commits{/sha}",
            "git_commits_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/git/commits{/sha}",
            "comments_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/comments{/number}",
            "issue_comment_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/issues/comments{/number}",
            "contents_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/contents/{+path}",
            "compare_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/compare/{base}...{head}",
            "merges_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/merges",
            "archive_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/{archive_format}{/ref}",
            "downloads_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/downloads",
            "issues_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/issues{/number}",
            "pulls_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/pulls{/number}",
            "milestones_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/milestones{/number}",
            "notifications_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/notifications{?since,all,participating}",
            "labels_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/labels{/name}",
            "releases_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/releases{/id}",
            "deployments_url": "https://api.github.com/repos/msemrik/HowMuchInWhat/deployments",
            "created_at": "2016-02-08T21:02:29Z",
            "updated_at": "2016-02-27T18:43:57Z",
            "pushed_at": "2016-02-28T23:56:50Z",
            "git_url": "git://github.com/msemrik/HowMuchInWhat.git",
            "ssh_url": "git@github.com:msemrik/HowMuchInWhat.git",
            "clone_url": "https://github.com/msemrik/HowMuchInWhat.git",
            "svn_url": "https://github.com/msemrik/HowMuchInWhat",
            "homepage": null,
            "size": 800,
            "stargazers_count": 0,
            "watchers_count": 0,
            "language": "Java",
            "has_issues": true,
            "has_projects": true,
            "has_downloads": true,
            "has_wiki": true,
            "has_pages": false,
            "forks_count": 0,
            "mirror_url": null,
            "archived": false,
            "open_issues_count": 0,
            "license": null,
            "forks": 0,
            "open_issues": 0,
            "watchers": 0,
            "default_branch": "master"
        },
        {
            "id": 51329749,
            "node_id": "MDEwOlJlcG9zaXRvcnk1MTMyOTc0OQ==",
            "name": "HowMuchInWhatWeb",
            "full_name": "msemrik/HowMuchInWhatWeb",
            "private": false,
            "owner": {
                "login": "msemrik",
                "id": 16051243,
                "node_id": "MDQ6VXNlcjE2MDUxMjQz",
                "avatar_url": "https://avatars2.githubusercontent.com/u/16051243?v=4",
                "gravatar_id": "",
                "url": "https://api.github.com/users/msemrik",
                "html_url": "https://github.com/msemrik",
                "followers_url": "https://api.github.com/users/msemrik/followers",
                "following_url": "https://api.github.com/users/msemrik/following{/other_user}",
                "gists_url": "https://api.github.com/users/msemrik/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/msemrik/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/msemrik/subscriptions",
                "organizations_url": "https://api.github.com/users/msemrik/orgs",
                "repos_url": "https://api.github.com/users/msemrik/repos",
                "events_url": "https://api.github.com/users/msemrik/events{/privacy}",
                "received_events_url": "https://api.github.com/users/msemrik/received_events",
                "type": "User",
                "site_admin": false
            },
            "html_url": "https://github.com/msemrik/HowMuchInWhatWeb",
            "description": "Web Server for HowMuchInWhatApplication",
            "fork": false,
            "url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb",
            "forks_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/forks",
            "keys_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/keys{/key_id}",
            "collaborators_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/collaborators{/collaborator}",
            "teams_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/teams",
            "hooks_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/hooks",
            "issue_events_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/issues/events{/number}",
            "events_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/events",
            "assignees_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/assignees{/user}",
            "branches_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/branches{/branch}",
            "tags_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/tags",
            "blobs_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/git/blobs{/sha}",
            "git_tags_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/git/tags{/sha}",
            "git_refs_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/git/refs{/sha}",
            "trees_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/git/trees{/sha}",
            "statuses_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/statuses/{sha}",
            "languages_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/languages",
            "stargazers_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/stargazers",
            "contributors_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/contributors",
            "subscribers_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/subscribers",
            "subscription_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/subscription",
            "commits_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/commits{/sha}",
            "git_commits_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/git/commits{/sha}",
            "comments_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/comments{/number}",
            "issue_comment_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/issues/comments{/number}",
            "contents_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/contents/{+path}",
            "compare_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/compare/{base}...{head}",
            "merges_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/merges",
            "archive_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/{archive_format}{/ref}",
            "downloads_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/downloads",
            "issues_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/issues{/number}",
            "pulls_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/pulls{/number}",
            "milestones_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/milestones{/number}",
            "notifications_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/notifications{?since,all,participating}",
            "labels_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/labels{/name}",
            "releases_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/releases{/id}",
            "deployments_url": "https://api.github.com/repos/msemrik/HowMuchInWhatWeb/deployments",
            "created_at": "2016-02-08T21:49:33Z",
            "updated_at": "2016-02-08T22:16:07Z",
            "pushed_at": "2016-02-28T23:59:49Z",
            "git_url": "git://github.com/msemrik/HowMuchInWhatWeb.git",
            "ssh_url": "git@github.com:msemrik/HowMuchInWhatWeb.git",
            "clone_url": "https://github.com/msemrik/HowMuchInWhatWeb.git",
            "svn_url": "https://github.com/msemrik/HowMuchInWhatWeb",
            "homepage": null,
            "size": 2641,
            "stargazers_count": 0,
            "watchers_count": 0,
            "language": "JavaScript",
            "has_issues": true,
            "has_projects": true,
            "has_downloads": true,
            "has_wiki": true,
            "has_pages": false,
            "forks_count": 0,
            "mirror_url": null,
            "archived": false,
            "open_issues_count": 0,
            "license": null,
            "forks": 0,
            "open_issues": 0,
            "watchers": 0,
            "default_branch": "master"
        },
        {
            "id": 58339513,
            "node_id": "MDEwOlJlcG9zaXRvcnk1ODMzOTUxMw==",
            "name": "MyFamilyApp",
            "full_name": "msemrik/MyFamilyApp",
            "private": false,
            "owner": {
                "login": "msemrik",
                "id": 16051243,
                "node_id": "MDQ6VXNlcjE2MDUxMjQz",
                "avatar_url": "https://avatars2.githubusercontent.com/u/16051243?v=4",
                "gravatar_id": "",
                "url": "https://api.github.com/users/msemrik",
                "html_url": "https://github.com/msemrik",
                "followers_url": "https://api.github.com/users/msemrik/followers",
                "following_url": "https://api.github.com/users/msemrik/following{/other_user}",
                "gists_url": "https://api.github.com/users/msemrik/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/msemrik/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/msemrik/subscriptions",
                "organizations_url": "https://api.github.com/users/msemrik/orgs",
                "repos_url": "https://api.github.com/users/msemrik/repos",
                "events_url": "https://api.github.com/users/msemrik/events{/privacy}",
                "received_events_url": "https://api.github.com/users/msemrik/received_events",
                "type": "User",
                "site_admin": false
            },
            "html_url": "https://github.com/msemrik/MyFamilyApp",
            "description": null,
            "fork": false,
            "url": "https://api.github.com/repos/msemrik/MyFamilyApp",
            "forks_url": "https://api.github.com/repos/msemrik/MyFamilyApp/forks",
            "keys_url": "https://api.github.com/repos/msemrik/MyFamilyApp/keys{/key_id}",
            "collaborators_url": "https://api.github.com/repos/msemrik/MyFamilyApp/collaborators{/collaborator}",
            "teams_url": "https://api.github.com/repos/msemrik/MyFamilyApp/teams",
            "hooks_url": "https://api.github.com/repos/msemrik/MyFamilyApp/hooks",
            "issue_events_url": "https://api.github.com/repos/msemrik/MyFamilyApp/issues/events{/number}",
            "events_url": "https://api.github.com/repos/msemrik/MyFamilyApp/events",
            "assignees_url": "https://api.github.com/repos/msemrik/MyFamilyApp/assignees{/user}",
            "branches_url": "https://api.github.com/repos/msemrik/MyFamilyApp/branches{/branch}",
            "tags_url": "https://api.github.com/repos/msemrik/MyFamilyApp/tags",
            "blobs_url": "https://api.github.com/repos/msemrik/MyFamilyApp/git/blobs{/sha}",
            "git_tags_url": "https://api.github.com/repos/msemrik/MyFamilyApp/git/tags{/sha}",
            "git_refs_url": "https://api.github.com/repos/msemrik/MyFamilyApp/git/refs{/sha}",
            "trees_url": "https://api.github.com/repos/msemrik/MyFamilyApp/git/trees{/sha}",
            "statuses_url": "https://api.github.com/repos/msemrik/MyFamilyApp/statuses/{sha}",
            "languages_url": "https://api.github.com/repos/msemrik/MyFamilyApp/languages",
            "stargazers_url": "https://api.github.com/repos/msemrik/MyFamilyApp/stargazers",
            "contributors_url": "https://api.github.com/repos/msemrik/MyFamilyApp/contributors",
            "subscribers_url": "https://api.github.com/repos/msemrik/MyFamilyApp/subscribers",
            "subscription_url": "https://api.github.com/repos/msemrik/MyFamilyApp/subscription",
            "commits_url": "https://api.github.com/repos/msemrik/MyFamilyApp/commits{/sha}",
            "git_commits_url": "https://api.github.com/repos/msemrik/MyFamilyApp/git/commits{/sha}",
            "comments_url": "https://api.github.com/repos/msemrik/MyFamilyApp/comments{/number}",
            "issue_comment_url": "https://api.github.com/repos/msemrik/MyFamilyApp/issues/comments{/number}",
            "contents_url": "https://api.github.com/repos/msemrik/MyFamilyApp/contents/{+path}",
            "compare_url": "https://api.github.com/repos/msemrik/MyFamilyApp/compare/{base}...{head}",
            "merges_url": "https://api.github.com/repos/msemrik/MyFamilyApp/merges",
            "archive_url": "https://api.github.com/repos/msemrik/MyFamilyApp/{archive_format}{/ref}",
            "downloads_url": "https://api.github.com/repos/msemrik/MyFamilyApp/downloads",
            "issues_url": "https://api.github.com/repos/msemrik/MyFamilyApp/issues{/number}",
            "pulls_url": "https://api.github.com/repos/msemrik/MyFamilyApp/pulls{/number}",
            "milestones_url": "https://api.github.com/repos/msemrik/MyFamilyApp/milestones{/number}",
            "notifications_url": "https://api.github.com/repos/msemrik/MyFamilyApp/notifications{?since,all,participating}",
            "labels_url": "https://api.github.com/repos/msemrik/MyFamilyApp/labels{/name}",
            "releases_url": "https://api.github.com/repos/msemrik/MyFamilyApp/releases{/id}",
            "deployments_url": "https://api.github.com/repos/msemrik/MyFamilyApp/deployments",
            "created_at": "2016-05-09T01:17:20Z",
            "updated_at": "2016-05-09T01:21:16Z",
            "pushed_at": "2016-05-09T01:21:15Z",
            "git_url": "git://github.com/msemrik/MyFamilyApp.git",
            "ssh_url": "git@github.com:msemrik/MyFamilyApp.git",
            "clone_url": "https://github.com/msemrik/MyFamilyApp.git",
            "svn_url": "https://github.com/msemrik/MyFamilyApp",
            "homepage": null,
            "size": 1900,
            "stargazers_count": 0,
            "watchers_count": 0,
            "language": "Java",
            "has_issues": true,
            "has_projects": true,
            "has_downloads": true,
            "has_wiki": true,
            "has_pages": false,
            "forks_count": 0,
            "mirror_url": null,
            "archived": false,
            "open_issues_count": 0,
            "license": null,
            "forks": 0,
            "open_issues": 0,
            "watchers": 0,
            "default_branch": "master"
        }
    ]
;

ReactDOM.render(<App/>, document.getElementById("content"));