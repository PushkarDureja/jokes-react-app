import React, { Component } from "react";

import "./joke.css";

class Joke extends Component {
  constructor(props) {
    super(props);
    this.handleUp = this.handleUp.bind(this);
    this.handleDown = this.handleDown.bind(this);
  }

  handleUp() {
    this.props.upVote(this.props.id);
  }
  handleDown() {
    this.props.downVote(this.props.id);
  }
  render() {
    let a = (
      <i className="em em-smiley" aria-label="SMILING FACE WITH OPEN MOUTH" />
    );
    if (this.props.votes >= 1 && this.props.votes <= 5)
      a = (
        <i className="em em-smiley" aria-label="SMILING FACE WITH OPEN MOUTH" />
      );
    else if (this.props.votes > 5)
      a = (
        <i
          className="em em-rolling_on_the_floor_laughing"
          aria-label="ROLLING ON THE FLOOR LAUGHING"
        />
      );
    else a = <i className="em em-angry" aria-label="ANGRY FACE" />;
    return (
      <div className="joke">
        <div className="rating">
          <i className="fas fa-arrow-up" onClick={this.handleUp} />
          <span className="votes">{this.props.votes}</span>
          <i className="fas fa-arrow-down" onClick={this.handleDown} />
        </div>
        <p className="para">{this.props.text}</p>
        <span class="emoji">{a}</span>
      </div>
    );
  }
}
export default Joke;
