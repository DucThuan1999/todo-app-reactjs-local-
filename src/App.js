import React, { useState } from "react";
import { Input, Table, Tag, Button, Modal } from "antd";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import Form from "./Form";
import "antd/dist/antd.css";
import "./App.css";
import { v1 } from "uuid";
import ModalCustom from "./ModalCustom";

const { confirm } = Modal;

function App() {
  const [valueEdit, setValueEdit] = useState("");

  const dataSource = [];

  const columns = [
    {
      title: "Key",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <>
          <Tag color={status ? "green" : "volcano"} key={status}>
            {status ? "Complete" : "Not yet"}
          </Tag>
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record, index) => (
        <div className="buttons-action-area">
          <ModalCustom handleEdit={() => handleEdit(record.key)}>
            <Input
              id="input-edit"
              placeholder="input edit todos"
              onChange={(e) => storageValueEditToState(e)}
              size="middle"
            />
          </ModalCustom>
          <Button type="danger" onClick={() => handleDelete(record.key)}>
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  const [data, setData] = useState(dataSource);

  const handleEdit = (idTodo) => {
    let index = data.findIndex((element) => element.key === idTodo);
    data[index].title = valueEdit;

    let temp = [...data];

    setData(temp);
  };

  const handleDelete = (idTodo) => {
    confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleOutlined />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        let index = data.findIndex((element) => element.key === idTodo);

        let temp = [...data.slice(0, index), ...data.slice(index + 1)];

        setData(temp);
      },
    });
  };

  const storageValueEditToState = (e) => {
    e.preventDefault();
    setValueEdit(e.target.value);
  };

  const getValueInput = (newInputValue) => {
    let todo = {
      key: v1(),
      title: newInputValue,
      status: false,
    };

    const temp = [...data, todo];
    setData(temp);
  };

  return (
    <div>
      <h2 className="title-app">Todo-list App (local list)</h2>
      <Form addValue={(newInputValue) => getValueInput(newInputValue)} />
      <div className="table-todos-area">
        <Table dataSource={data} columns={columns} />
      </div>
    </div>
  );
}

export default App;
