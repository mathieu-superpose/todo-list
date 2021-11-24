import React, { useState, useEffect } from 'react';
import { AddTodoForm } from './AddTodoForm';
import { TodoList } from './TodoList';
import { useQuery, gql } from '@apollo/client';


const initialTodos: Todo[] = [
  {
    text: '',
    complete: false,
  }
];

const GET_TODOS = gql`
  query GetTodoList {
    getTodoList {
      _id
      text
      complete
    }
  }
`;

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const { loading, error, data } = useQuery(GET_TODOS);

  const toggleTodo = (selectedTodo: Todo) => {
    const newTodos = todos.map(todo => {
      if (todo === selectedTodo) {
        return {
          ...todo,
          complete: !todo.complete,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const addTodo: AddTodo = (text: string) => {
    const newTodo = { text, complete: false };
    setTodos([...todos, newTodo]);
  };

  useEffect(() => {
    if(loading) console.log(loading)
    if(error) console.log(error)
    if(data) setTodos(data.getTodoList)
  }, [data, loading, error])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <AddTodoForm addTodo={addTodo}/>
    </>
  );
}

export default App;
