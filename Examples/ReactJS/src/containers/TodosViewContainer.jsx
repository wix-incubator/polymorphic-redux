import _ from 'lodash';
import {connect} from 'react-redux';

import React from 'react';

class TodosView extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div style={{marginTop: 20}}>
        {_.map(this.props.todos, (todo) => {
          const index = _.indexOf(this.props.todos, todo)
          return (
            <div key={index}>
              <p>{`${index+1}: ${todo}`}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state.TodosReducer.todos
  }
}

export default connect(mapStateToProps)(TodosView);
