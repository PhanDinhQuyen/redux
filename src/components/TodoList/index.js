import { Col, Row, Input, Button, Select, Tag } from "antd";
import { useRef, useState } from "react";
import Todo from "../Todo";
import { useSelector, useDispatch } from "react-redux";
import { todoListRemainingSelector } from "../../redux/selectors";
// import { addTodo } from "../../redux/action";
import todoListSlice from "./todoListSlice";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const [todoName, setTodoName] = useState("");
  const [priority, setPriority] = useState("Medium");
  const dispatch = useDispatch();
  const todoList = useSelector(todoListRemainingSelector);
  const inputRef = useRef();
  const handleChangeInput = (e) => {
    setTodoName(e.target.value);
  };
  const handleClickButton = () => {
    if (!todoName) return;
    const todo = {
      id: uuidv4(),
      name: todoName,
      priority: priority,
      completed: false,
    };
    dispatch(todoListSlice.actions.addTodo(todo));
    setTodoName("");
    localStorage.setItem("todoList", JSON.stringify([...todoList, todo]));
    inputRef.current.focus();
  };
  const handleClickInput = (e) => {
    e.target.select();
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) handleClickButton();
  };
  const handleChangeSelect = (value) => {
    setPriority(value);
  };
  return (
    <Row style={{ height: "calc(100% - 40px)" }}>
      <Col span={24} style={{ height: "calc(100% - 40px)", overflowY: "auto" }}>
        {todoList.length > 0 ? (
          todoList.map((todo) => (
            <Todo
              id={todo.id}
              key={todo.id}
              name={todo.name}
              priority={todo.priority}
              completed={todo.completed}
            />
          ))
        ) : (
          <p style={{ margin: "auto", textAlign: "center" }}>Nothing</p>
        )}
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
          <Select
            onChange={handleChangeSelect}
            value={priority}
            defaultValue='Medium'
          >
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
