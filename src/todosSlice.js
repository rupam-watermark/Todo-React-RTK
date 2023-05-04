import { createSlice } from "@reduxjs/toolkit";

export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE",
};

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    visibilityFilter: VisibilityFilters.SHOW_ALL,
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    completeTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    completeAllTodos: (state) => {
      const areAllCompleted = state.todos.every((todo) => todo.completed);
      state.todos.forEach((todo) => {
        todo.completed = !areAllCompleted;
      });
    },
    clearCompleted: (state) => {
      state.todos = state.todos.filter((todo) => !todo.completed);
    },
    setVisibilityFilter: (state, action) => {
      state.visibilityFilter = action.payload;
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  completeTodo,
  completeAllTodos,
  clearCompleted,
  setVisibilityFilter,
} = todosSlice.actions;

export default todosSlice.reducer;
