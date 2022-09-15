import { Col, Row, Input, Button, Select, Tag } from "antd";
import { useRef, useState } from "react";
import Todo from "../Todo";
import { useSelector, useDispatch } from "react-redux";
import { todoListSelector } from "../../redux/selectors";
// import { addTodo } from "../../redux/action";
import todoListSlice from "./todoListSlice";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const [todoName, setTodoName] = useState("");
  const dispatch = useDispatch();
  const todoList = useSelector(todoListSelector);
  const inputRef = useRef();
  const handleChangeInput = (e) => {
    setTodoName(e.target.value);
  };
  const handleClickButton = () => {
    if (!todoName) return;
    dispatch(
      todoListSlice.actions.addTodo({
        id: uuidv4(),
        name: todoName,
        prioriry: "High",
        completed: false,
      })
    );
    setTodoName("");
    inputRef.current.focus();
  };
  const handleClickInput = (e) => {
    e.target.select();
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) handleClickButton();
  };
  return (
    <Row style={{ height: "calc(100% - 40px)" }}>
      <Col span={24} style={{ height: "calc(100% - 40px)", overflowY: "auto" }}>
        {todoList.map((todo) => (
          <Todo
            id={todo.id}
            key={todo.id}
            name={todo.name}
            prioriry={todo.prioriry}
          />
        ))}
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: "flex" }} compact>
          <Input
            ref={inputRef}
            value={todoName}
            onKeyDown={handleKeyDown}
            onClick={handleClickInput}
            onChange={handleChangeInput}
          />
          <Select defaultValue='Medium'>
            <Select.Option value='High' label='High'>
              <Tag color='red'>High</Tag>
            </Select.Option>
            <Select.Option value='Medium' label='Medium'>
              <Tag color='blue'>Medium</Tag>
            </Select.Option>
            <Select.Option value='Low' label='Low'>
              <Tag color='gray'>Low</Tag>
            </Select.Option>
          </Select>
          <Button onClick={handleClickButton} type='primary'>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
