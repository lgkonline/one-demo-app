import React from "react";
import PropTypes from "prop-types";

import { _, getUserApiKey } from "./Global";

class LinkList extends React.Component {
    static propTypes = {};

    state = {
        entries: []
    };

    componentDidMount() {
        this.getLinks();
    }

    getLinks() {
        fetch(_ + "/api/collections/get/links?token=" + getUserApiKey())
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({
                    entries: res.entries
                });
            });
    }

    render() {
        return (
            <div>
                {this.state.entries.map((entry, index) =>
                    <div key={index}>
                        <h3>
                            <a href={entry.url}>{entry.label}</a>
                        </h3>
                    </div>
                )}
            </div>
        );
    }
}

export default LinkList;