import React from 'react';

import _ from 'lodash';
import {connect} from 'react-redux';

import {events as todosEvents} from './../store/todos'

class AddTodo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contentInput: "",
    }
  }

  handleChange(value) {
    this.setState({
      contentInput: value,
    });
  }

  addButtonClicked() {
    if (this.state.contentInput.length > 0) {
      this.props.dispatch(todosEvents.AddTodoEvent.create(this.state.contentInput))
      this.setState(
        {
          contentInput: "",
        }
      )
    }
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <input
          type="text"
          value={this.state.contentInput}
          onChange={(event) => this.handleChange.bind(this)(event.target.value)}
          onKeyPress={(event) => { if (event.key == 'Enter') {this.addButtonClicked();}}}
        />
        <a href="javascript:void(0);" onClick={() => this.addButtonClicked()}>ADD</a>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state.TodosReducer.todos
  };
}

export default connect(mapStateToProps)(AddTodo);
