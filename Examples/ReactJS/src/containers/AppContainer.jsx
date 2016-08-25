import _ from 'lodash';
import {connect} from 'react-redux';

import React from 'react';

import {events as todosEvents} from './../store/todos'

import AddTodo from './AddTodoContainer';
import TodosView from './TodosViewContainer';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addTodoInput: "",
    }
  }

  render() {
    return (
      <div>
        <AddTodo />
        <TodosView />
      </div>
    );
  }
}

export default connect()(App);
