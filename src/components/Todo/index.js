import { Row, Tag, Checkbox, Button } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import todoListSlice from "../TodoList/todoListSlice";

const priorityColorMapping = {
  High: "red",
  Medium: "blue",
  Low: "gray",
};

export default function Todo({ name, priority, id, completed }) {
  const [checked, setChecked] = useState(completed);
  const dispatch = useDispatch();
  const toggleCheckbox = () => {
    setChecked(!checked);
    dispatch(todoListSlice.actions.updateTodo(id));
    const todoLocalStore = JSON.parse(localStorage.getItem("todoList")) || [];
    localStorage.setItem(
      "todoList",
      JSON.stringify(
        todoLocalStore.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      )
    );
  };
  const hanleRemoveTodo = () => {
    dispatch(todoListSlice.actions.removeTodo(id));
    const todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    localStorage.setItem(
      "todoList",
      JSON.stringify(todoList.filter((todo) => todo.id !== id))
    );
  };
  return (
    <Row
      justify='space-between'
      style={{
        marginBottom: 3,
        ...(checked ? { opacity: 0.5, textDecoration: "line-through" } : {}),
      }}
    >
      <Checkbox
        key={id}
        type='checkbox'
        onChange={toggleCheckbox}
        name={id}
        id={id}
        checked={checked}
      >
        {name}
      </Checkbox>
      <Tag color={priorityColorMapping[priority]} style={{ margin: 0 }}>
        {priority}
      </Tag>
      <Button onClick={hanleRemoveTodo}>Remove</Button>
    </Row>
  );
}
