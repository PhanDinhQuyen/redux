import { createSlice } from "@reduxjs/toolkit";

const intitState = JSON.parse(localStorage.getItem("todoList")) || [];

const todoListSlice = createSlice({
  name: "todoList",
  initialState: intitState,
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    removeTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      todo.completed = !todo.completed;
      // console.log(todo.completed);
    },
  },
});
export default todoListSlice;
