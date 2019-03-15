import React from 'react';
import axios from 'axios';

class App extends React.Component {

  render() {
    return (
      <Form />
    )
  }
}

class Form extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      persons: [] ,
      newName: '',
      newNumber: ''
    }
  }

  componentDidMount() {
   
    axios.get('http://localhost:3003/persons')
      .then(res => {
        //const persons = res.data;
        this.setState({ persons: res.data});
      })
  }
  
  addName = (event) => {
    event.preventDefault()
    const previousName =  this.state.persons.slice();
    const person = {
      name: this.state.newName,
      number: this.state.newNumber,
    } 
    var adding = previousName.concat({name: this.state.newName,number: this.state.newNumber})

    axios.post('http://localhost:3003/persons', person)
    .then(res => {console.log(res.data)
      this.handleCheck(this.state.newName) == false ?
      this.setState({
        persons: adding,
        newName :'',
        newNumber:''
      }): this.setState({
        persons: previousName,
        newName :'',
        newNumber: ''
      })
    })
  }

  handleNameChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    console.log(event.target.value)
    this.setState({ newNumber: event.target.value })
  }

  handleCheck(val) {
    return this.state.persons.some(item => val === item.name);
  }

  handleRemove = person => {
    const url = `http://localhost:3003/persons/${person.id}`;
   
    axios
      .delete(url)
      .then(res => {
        this.setState(previousState => {
          return {
            persons: previousState.persons.filter(m => m.id !== person.id)
          };
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  
  removeMovie = (e, person) => {
    e.preventDefault();
  
    if (this.handleRemove) {
      this.handleRemove(person);
    }
  };

  
 
  render() {
    return(
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addName}>
          <div>
            nimi: <input 
                    value={this.state.newName}
                    onChange={this.handleNameChange}
                  />
          </div>
          <div>
            numero: <input 
                      value={this.state.newNumber}
                      onChange={this.handleNumberChange}
                    />
          </div>
          <div>
            <button type="submit" >lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
          {this.state.persons.map((person,i)=><li key={i}>{person.name}{" "}{person.number}{" "}<button type="submit" onClick={e => this.removeMovie(e, person)} >poista</button></li>)}

        </ul>
        
        

      </div>
    )
  }
}
export default App
