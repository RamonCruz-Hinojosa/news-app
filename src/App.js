import './App.css';
import React from 'react';




class App extends React.Component {
constructor(props) {
  super(props);

  this.state = {
    stories: [],
    isClicked:false,
    search:'',
  };
}
  
handleChange = (event) => {
  this.setState({
    search: event.target.value,
  });
}
  
handleSubmit = (event) => {
  event.preventDefault();
  fetch(`http://hn.algolia.com/api/v1/search?query=${this.state.search}`)
  .then(res => res.json())
  .then(news => {this.setState({search: '', stories: news.hits})})
}
  
handleStories = (event) => {
  fetch(`http://hn.algolia.com/api/v1/search?tags=story`)
  .then(res => res.json())
  .then(news => {this.setState({stories:news.hits})})
}
  

handleComments = (event) => {
  fetch(`http://hn.algolia.com/api/v1/search?tags=comment`)
  .then(res => res.json())
  .then(news => {this.setState({stories:news.hits})} )
}

 



render() {
  return (
    <div className="App">
      <select name='Sort'>
        <option value='all'>All</option>
        <option value='stories'>Stories</option>
        <option value='comments'>Comments</option>
      </select>
      
    </div>
  );
 }

}
  
export default App;
