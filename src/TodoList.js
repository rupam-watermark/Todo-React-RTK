import React, { useState } from "react";
import "./TodoList.css";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import {
  addTodo,
  deleteTodo,
  completeTodo,
  completeAllTodos,
  clearCompleted,
  setVisibilityFilter,
  VisibilityFilters,
} from "./todosSlice";

function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const visibilityFilter = useSelector((state) => state.visibilityFilter);
  const [todo, setTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // const text = e.target.todo.value.trim();
    if (todo) {
      dispatch(addTodo(todo));
      // e.target.todo.value = "";
      setTodo("");
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleComplete = (id) => {
    dispatch(completeTodo(id));
  };

  const handleCompleteAll = () => {
    dispatch(completeAllTodos());
  };

  const handleClearCompleted = () => {
    dispatch(clearCompleted());
  };

  const handleVisibilityFilterChange = (e) => {
    dispatch(setVisibilityFilter(e.target.value));
  };

  const filteredTodos = todos.filter((todo) => {
    if (visibilityFilter === VisibilityFilters.SHOW_ALL) {
      return true;
    } else if (visibilityFilter === VisibilityFilters.SHOW_COMPLETED) {
      return todo.completed;
    } else if (visibilityFilter === VisibilityFilters.SHOW_ACTIVE) {
      return !todo.completed;
    } else return true;
  });

  return (
    <div>
      <div className="container-input">
        <input
          value={todo}
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          className="textField"
          name="todo"
          placeholder="Add todo"
        />
        <IconButton aria-label="delete" onClick={handleSubmit}>
          <ControlPointIcon color="primary" />
        </IconButton>
      </div>
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleComplete(todo.id)}
              />
              {todo.text}
            </label>
            <IconButton onClick={() => handleDelete(todo.id)}>
              <DeleteIcon color="error" />
            </IconButton>
          </li>
        ))}
      </ul>
      <div className="compAll">
        <label>
          <input
            type="checkbox"
            className="checkBox"
            checked={todos.every((todo) => todo.completed)}
            onChange={handleCompleteAll}
          />
          Complete all
        </label>
        <button onClick={handleClearCompleted}>Clear completed</button>
      </div>
      <div className="show">
        Show:
        <label>
          <input
            type="radio"
            name="visibilityFilter"
            value={VisibilityFilters.SHOW_ALL}
            checked={visibilityFilter === VisibilityFilters.SHOW_ALL}
            onChange={handleVisibilityFilterChange}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            name="visibilityFilter"
            value={VisibilityFilters.SHOW_COMPLETED}
            checked={visibilityFilter === VisibilityFilters.SHOW_COMPLETED}
            onChange={handleVisibilityFilterChange}
          />
          Completed
        </label>
        <label>
          <input
            type="radio"
            name="visibilityFilter"
            value={VisibilityFilters.SHOW_ACTIVE}
            checked={visibilityFilter === VisibilityFilters.SHOW_ACTIVE}
            onChange={handleVisibilityFilterChange}
          />
          Active
        </label>
      </div>
    </div>
  );
}

export default TodoList;
