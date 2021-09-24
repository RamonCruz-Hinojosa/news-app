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
 console.log(this.state.stories)
}
  

handleChange = (event) => {
  fetch(`http://hn.algolia.com/api/v1/search?tags=${event.target.value}`)
  .then(res => res.json())
  .then(news => {this.setState({stories: news.hits})})
  console.log(event.target.value)
}
  
componentDidUpdate(){
  console.log(this.state.stories)
}


 



render() {
  return (
    <div className="App">
      <select name='Sort' onChange={this.handleChange}>
        <option value='all'>All</option>
        <option value='story'>Story</option>
        <option value='comment'>Comments</option>
      </select>
      <ul> {this.state.stories.map((story, index) =>{
        return  <li key={index}>{story[index]}</li>
      } )}
       
      </ul>
    </div>
  );
 }

}
  
export default App;
