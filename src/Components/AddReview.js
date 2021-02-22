import React, { Component } from "react";

class AddReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userReview: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChange(e) {
    this.setState({
      userReview: e.target.value,
      [e.target.name]: e.target.value
    });
    this.props.setInfoWindowName(e.target.name);
  }

  submitForm(e) {
    e.preventDefault();
    this.setState({
      userReview: ""
    });
    this.props.setQuery(this.state.userReview);
    console.log("submitted");
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <textarea
            style={{ padding: "1rem", borderRadius: "3px" }}
            value={this.state.userReview}
            name={this.props.name}
            placeholder="Add a Review..."
            onChange={this.handleChange}
          />
          <button className="submit-button" type="submit">
            submit
          </button>
        </form>
      </div>
    );
  }
}

export default AddReview;
