import { Row, Tag, Checkbox, Button } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import todoListSlice from "../TodoList/todoListSlice";

const priorityColorMapping = {
  High: "red",
  Medium: "blue",
  Low: "gray",
};

export default function Todo({ name, prioriry, id }) {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const toggleCheckbox = () => {
    setChecked(!checked);
  };
  const hanleRemoveTodo = () => {
    dispatch(todoListSlice.actions.removeTodo(id));
  };
  return (
    <Row
      justify='space-between'
      style={{
        marginBottom: 3,
        ...(checked ? { opacity: 0.5, textDecoration: "line-through" } : {}),
      }}
    >
      <Checkbox checked={checked} onChange={toggleCheckbox}>
        {name}
      </Checkbox>
      <Tag color={priorityColorMapping[prioriry]} style={{ margin: 0 }}>
        {prioriry}
      </Tag>
      <Button onClick={hanleRemoveTodo}>Remove</Button>
    </Row>
  );
}
