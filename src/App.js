import React, { Component } from "react";

import { setApp } from "./Global";
import "./App.css";

import Login from "./Login";
import LinkList from "./LinkList";

class App extends Component {
    state = {
        user: null
    };

    componentWillMount() {
        this.onLogin = this.onLogin.bind(this);
        this.logout = this.logout.bind(this);

        setApp(this);

        this.setState({
            user: this.getUser()
        });
    }

    getUser() {
        let user;
        const fromStorage = localStorage.getItem("user");
        if (fromStorage) {
            user = JSON.parse(fromStorage);
        }
        else {
            user = null;
        }
        return user;
    }

    onLogin(user) {
        this.setState({ user });
        localStorage.setItem("user", JSON.stringify(user));
    }

    logout() {
        this.setState({ user: null });
        localStorage.removeItem("user");
    }

    render() {
        return (
            <div className="App">

                {this.state.user ?
                    <div className="slide bg bg-dark text-light">
                        <div className="container">
                            <h1>Welcome, {this.state.user.name}!</h1>

                            <button type="button" className="btn blink lg" onClick={this.logout}>Logout</button>

                            <LinkList />
                        </div>
                    </div>
                    :
                    <Login onLogin={this.onLogin} />
                }
            </div>
        );
    }
}

export default App;
