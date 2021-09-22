import React, { Component } from "react";
import "./articles.css";

class Articles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      placeholder: true,
    };
    console.log("heres the props", props);
  }

  render() {
    return (
      <li className="listitem">
        <a
          href={
            this.props.oneStory.url
              ? this.props.oneStory.url
              : this.props.oneStory.story_text
          }
          className="singlestory"
        >
          {this.props.oneStory.title}
        </a>
      </li>
    );
  }
}

export default Articles;
