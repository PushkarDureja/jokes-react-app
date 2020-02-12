import React, { Component } from "react";
import axios from "axios";
import Joke from "./joke";
import uuid from "uuid";
import "./jokes.css";
class Jokes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: [],
      isLoading: true
    };
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
    this.reload = this.reload.bind(this);
  }
  url = "https://icanhazdadjoke.com/";
  async componentDidMount() {
    for (let i = 0; i < 10; i++) {
      let a = await axios.get(this.url, {
        headers: {
          Accept: "application/json"
        }
      });

      a.data = { ...a.data, votes: 1 };

      this.setState({
        jokes: [...this.state.jokes, a.data],
        isLoading: true
      });
    }
    this.setState({
      isLoading: false
    });
  }
  handleUpVote(id) {
    this.setState({
      jokes: this.state.jokes.map(function(joke) {
        if (joke.id === id) {
          joke = { ...joke, votes: joke.votes + 1 };
        }
        return joke;
      })
    });
  }
  handleDownVote(id) {
    this.setState({
      jokes: this.state.jokes.map(joke => {
        if (joke.id === id) joke = { ...joke, votes: joke.votes - 1 };
        return joke;
      })
    });
  }
  reload() {
    window.location.reload();
  }
  render() {
    return (
      <div className="loading-div">
        {this.state.isLoading ? (
          <div className="loading">
            <div className="loading-title">Loading...</div>
            <div className="icon">
              <i className="far fa-smile-beam" />
            </div>
          </div>
        ) : (
          <div className="display">
            <div className="intro">
              <h1 className="title">
                Dad<span className="joke-title">Jokes</span>
              </h1>
              <div className="intro-emoji">
                <i
                  className="em em-rolling_on_the_floor_laughing"
                  aria-label="ROLLING ON THE FLOOR LAUGHING"
                />
              </div>
              <div className="refresh-btn">
                <button className="btn" onClick={this.reload}>
                  New Jokes
                </button>
              </div>
            </div>
            <div className="Main">
              {this.state.jokes.map(joke => {
                return (
                  <Joke
                    text={joke.joke}
                    key={joke.id}
                    votes={joke.votes}
                    id={joke.id}
                    upVote={this.handleUpVote}
                    downVote={this.handleDownVote}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default Jokes;
