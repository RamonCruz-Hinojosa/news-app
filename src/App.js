import "./App.css";
import React from "react";
import Articles from "./components/Articles";
const URL = "http://hn.algolia.com/api/v1/search?tags=front_page";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: [],
      isClicked: false,
      search: "",
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      console.log("look here", data.hits);
      this.setState({
        stories: data.hits,
      });
    } catch {
      console.error("I have failed");
    }
  }

  handleChange = (event) => {
    this.setState({
      search: event.target.value,
    });
    console.log(this.search);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://hn.algolia.com/api/v1/search?query=${this.state.search}`)
      .then((res) => res.json())
      .then((news) => {
        this.setState({ search: "", stories: news.hits });
      });
  };

  // handleStories = (event) => {
  //   fetch(`http://hn.algolia.com/api/v1/search?tags=story`)
  //     .then((res) => res.json())
  //     .then((news) => {
  //       this.setState({ stories: news.hits });
  //     });
  // };

  // handleComments = (event) => {
  //   fetch(`http://hn.algolia.com/api/v1/search?tags=comment`)
  //     .then((res) => res.json())
  //     .then((news) => {
  //       this.setState({ stories: news.hits });
  //     });
  // };

  renderStories() {
    if (this.state.stories.length > 0) {
      return this.state.stories.map((story) => {
        return <Articles oneStory={story} />;
      });
    } else {
      return <h1>No Stories</h1>;
    }
  }

  render() {
    return (
      <>
        <input type="text" onChange={this.handleChange}></input>
        <ul className="list">{this.renderStories()}</ul>
      </>
    );
  }
}

export default App;
