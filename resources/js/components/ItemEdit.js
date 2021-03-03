import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ItemEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: " ",
            item: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    //handle change
    handleChange(e) {
        this.setState({
            content: e.target.value,
        });
    }
    //handle submit
    handleSubmit(e) {
        e.preventDefault();
        axios
            .put(`/items/${this.props.match.params.id}`, {
                content: this.state.content,
            })
            .then((response) => {
                //console.log("from handle submit", response);
                this.props.history.push("/");
            });
    }

    //Get all the items form the database
    getItems() {
        axios
            .get(`/items/${this.props.match.params.id}/edit`)
            .then((response) =>
                this.setState({
                    item: response.data.item,
                    content: response.data.item.content,
                })
            );
    }

    //lifecycle method
    UNSAFE_componentWillMount() {
        this.getItems();
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header text-center">
                                Edit Todo Item
                            </div>

                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <textarea
                                            className="form-control"
                                            rows="2"
                                            maxLength="255"
                                            onChange={this.handleChange}
                                            value={this.state.content}
                                            required
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Update Item
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
