import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import ErrorPage from './ErrorPage';
import AdminPanel from './TabComponent';
import InputComponent from './InputComponent.js'
import Formsy, { validationRules } from 'formsy-react';
import RaisedButton from 'material-ui/RaisedButton';
import Observable from './Observable'





import '../CSS/Admin.css';

export default class Admin extends Component {

    static propTypes = {
        serverLink: PropTypes.string.isRequired
    };

    constructor() {
        super();
        this.response = {};
        this.state = {
            status: 0,
            username: '',
            password: '',
        };

    }
    componentDidMount() {
        // let loginInfo = Observable.getLogedinInfo()
        // if (loginInfo) {
        //     this.setState()
        //     this.submit()
        // }
    }

    submit = (e) => {
        this.setState(Object.assign({}, this.state, { status: 1 }));
        const xhr = new XMLHttpRequest();
        xhr.open('Post', `${this.props.serverLink}login`, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // this.response = JSON.parse(xhr.response);
                    Observable.setLogedinInfo({
                        username: this.state.username,
                        password: this.state.password
                    });
                    Observable.setAdminresponse(JSON.parse(xhr.response))
                    Observable.notify("logIn")
                }
                this.setState(Object.assign({}, this.state, { status: xhr.status }))
            }
        };
        xhr.send(JSON.stringify({
            username: this.state.username,
            password: this.state.password
        }));
    }
    onFieldChange = (fieldName, value) => {
        let CurrentState = this.state;
        CurrentState[fieldName] = value
        this.setState({ CurrentState });
    }

    render() {
        if (this.state.status === 0 && !Observable.getLogedinInfo()) {
            return <div style={{ width: '100%' }} >
                <Formsy className="addNewOrg" >
                    <InputComponent
                        name="username"
                        title="Enter Your Username"
                        type="text"
                        value={this.state.username}
                        onChange={this.onFieldChange}
                        required />
                    <InputComponent
                        name="password"
                        title="Enter Your Password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onFieldChange}
                        required />
                    <RaisedButton
                        label="login"
                        primary={true}
                        onClick={(e) => {this.submit(e) }}
                        disabled={(this.state.username!==""&&this.state.password!=="")?false:true}
                    />
                </Formsy>
            </div>;
        }
        else if (this.state.status === 1) {
            return <Loading />;
        }
        if (this.state.status === 401 || this.state.status === 404 || this.state.status === 500) {
            return <ErrorPage status={this.state.status} />;
        }
        else if (this.state.status === 200 || Observable.getLogedinInfo()) {
            return <AdminPanel response={Observable.getAdminResponse()} serverLink={this.props.serverLink} />;
        }
    }
}