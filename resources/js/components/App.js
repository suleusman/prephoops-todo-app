import axios from "axios";
import React, { Component } from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaCheckDouble, FaEdit } from "react-icons/fa";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            items: [],
            categories: [],
            category: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderItems = this.renderItems.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
        this.renderCategories = this.renderCategories.bind(this);
    }

    //handle change
    handleChange(e) {
        //one method to handle all the unchanged events in the form
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    //handle submit
    handleSubmit(e) {
        e.preventDefault();
        axios
            .post("/items", {
                category: this.state.category,
                content: this.state.content,
            })
            .then((response) => {
                this.setState({
                    items: [response.data, ...this.state.items],
                    content: " ",
                });
            });
    }
    //render items
    renderItems() {
        return this.state.items.map((item) => (
            <tr key={item.id}>
                <td
                    colSpan="8"
                    style={{
                        textDecoration: item.completed ? "line-through" : "",
                    }}
                >
                    {item.content}
                </td>
                <td className="text-center">{item.category_id}</td>
                <td>
                    <Link
                        to={`/${item.id}/edit`}
                        className="btn btn-sm btn-success float-right ml-2"
                    >
                        <FaEdit />
                    </Link>
                </td>
                <td>
                    <button
                        onClick={() => this.handleDelete(item.id)}
                        className="btn btn-sm btn-danger float-right"
                    >
                        <FaTrashAlt />
                    </button>
                </td>
                <td>
                    <button
                        onClick={() => this.handleComplete(item.id)}
                        className="btn btn-primary btn-sm float-right ml-2 toggle"
                    >
                        <FaCheckDouble />
                    </button>
                </td>
            </tr>
            // </div>
        ));
    }
    //Get all the items form the database
    getItems() {
        axios.get("/items").then((response) =>
            this.setState({
                items: [...response.data.items],
            })
        );
    }
    //fetch categories from the backend
    getCategories() {
        axios.get("/categories").then((response) =>
            this.setState({
                categories: [...response.data.categories],
            })
        );
    }

    //render categories
    renderCategories() {
        return this.state.categories.map((category) => (
            <option key={category.id} value={category.id}>
                {category.name}
            </option>
        ));
    }

    //lifecycle method
    UNSAFE_componentWillMount() {
        this.getCategories();

        this.getItems();
    }
    //handle delete event
    handleDelete(id) {
        //remove from local state
        const isNotId = (item) => item.id !== id;
        const updatedItems = this.state.items.filter(isNotId);
        this.setState({ items: updatedItems });
        //make delete request to the backend
        axios.delete(`/items/${id}`);
    }
    //handle mark item Completed
    handleComplete(id) {
        axios.put(`/toggleButton/${id}`);

        //call the getItems() method to refresh the page
        this.getItems();
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div>
                                <SearchBar />
                            </div>
                            <h3 className="card-header text-center">
                                Create Todo Item
                            </h3>

                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label className="form-label">
                                            Enter Todo Item
                                        </label>
                                        <textarea
                                            className="form-control"
                                            name="content"
                                            rows="1"
                                            maxLength="255"
                                            onChange={this.handleChange}
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">
                                            Category
                                        </label>
                                        <select
                                            name="category"
                                            onChange={this.handleChange}
                                            //value={this.state.category}
                                            className="form-control"
                                            required
                                        >
                                            <option>Select a category</option>
                                            {this.renderCategories()}
                                        </select>
                                    </div>
                                    <div className="text-right mb-3">
                                        <button
                                            type="submit"
                                            className="btn btn-primary "
                                        >
                                            Add Item
                                        </button>
                                    </div>
                                </form>
                                <hr />
                                <h3 className="text-center" id="item-title">
                                    List of Todos
                                </h3>

                                <div className="table-responsive">
                                    <table className="table table-striped ">
                                        <thead>
                                            <tr className="text-center">
                                                <th colSpan="8">Items</th>
                                                <th>Category</th>
                                                <th colSpan="3">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>{this.renderItems()}</tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
