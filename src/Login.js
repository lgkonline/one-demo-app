import React from "react";
import PropTypes from "prop-types";

import { _ } from "./Global";
import "./Login.css";

class Login extends React.Component {
    static propTypes = {
        onLogin: PropTypes.func
    };

    state = {
        user: "",
        password: ""
    };

    componentWillMount() {
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange({ target }) {
        let state = this.state;
        state[target.name] = target.value;
        this.setState(state);
    }

    onSubmit(event) {
        event.preventDefault();

        fetch(_ + "/api/cockpit/authUser?token=3756c4b4f17f87b4e752afe3feab99", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.state)
        })
            .then(user => user.json())
            .then(user => {
                this.props.onLogin(user);
            })
            .catch(reason => console.error(reason));
    }

    render() {
        return (
            <div className="Login slide bg bg-primary py-5">
                <div className="container">
                    <form onSubmit={this.onSubmit}>
                        <label className="Login-label mb-3">
                            <span>Username</span>
                            <input name="user" className="Login-input form-control" type="text" value={this.state.user} onChange={this.onChange} />
                        </label>

                        <label className="Login-label mb-3">
                            <span>Password</span>
                            <input name="password" className="Login-input form-control" type="password" value={this.state.password} onChange={this.onChange} />
                        </label>

                        <button type="submit" className="btn lg btn-dark">Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;