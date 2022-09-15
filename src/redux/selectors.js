export const todoListSelector = (state) => {
  return state.todoList.filter((todo) =>
    todo.name.includes(state.filters.search)
  );
};
