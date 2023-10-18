import {Component} from 'react';

class Counternum extends Component {

    constructor() {
        super();
        this.state = {
            count: 0
        }
    }

    increment() {
        this.setState({
            count: this.state.count + 1
        })
    }

    decrement() {
        this.setState({
            count: this.state.count - 1
        })
    }

    render() {
        return (<div>
            <h1>Counter Value: {this.state.count}</h1>
            <button onClick={() => this.increment()} style={{margin: '10px', color: 'green', backgroundColor: 'black'}}>Increment</button> 
            
            <button onClick={() => this.decrement()} style={{color: 'red', backgroundColor: 'black'}}>Decrement</button>
        </div>)
    }



}

export default Counternum