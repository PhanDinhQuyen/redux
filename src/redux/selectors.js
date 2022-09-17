import { createSelector } from "@reduxjs/toolkit";

export const todoListSelector = (state) => {
  return state.todoList;
};

export const searchTermSelector = (state) => {
  return state.filters.search;
};

export const statusSelector = (state) => {
  return state.filters.status;
};

export const prioritiesSelector = (state) => {
  return state.filters.priorities;
};
export const todoListRemainingSelector = createSelector(
  todoListSelector,
  searchTermSelector,
  statusSelector,
  prioritiesSelector,
  (todoList, search, status, priorities) => {
    const filterSearch = todoList
      .filter((todo) => todo.name.includes(search))
      .filter((todo) =>
        priorities.length > 0
          ? priorities.some((priority) => priority === todo.priority)
          : true
      );
    if (status === "All") return filterSearch;
    return filterSearch.filter((todo) =>
      status === "Completed" ? todo.completed : !todo.completed
    );
  }
);
