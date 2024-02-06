import React, { useState } from "react";
import { Button, Form, Input, DatePicker } from "antd";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

const EditCardForm = ({ updateFunc }) => {
  // const navigate = useNavigate();
  
  const dateFormat = "YYYY/MM/DD";
  const { id } = useParams();
  const items = useSelector((state) => state.cards.cards.items);
  const dataState = items.find((card) => card._id === id);

  console.log(dataState, "me");
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const onFinish = (idenx, value) => {
    console.log(value);
    const val = value.deadline? {
      ...value,
      deadline: value["deadline"].format("YYYY-MM-DD"),
    } : value
    console.log("It is date target", val);
    updateFunc(idenx, val);
  };

  return (
    <Form
      {...layout}
      onFinish={(dataState) => onFinish(id, dataState)}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item name="title" label="Company" initialValue={dataState.title}>
        <Input />
      </Form.Item>

      <Form.Item name="deadline" label="Deadline">
        <DatePicker defaultValue={dayjs(dataState.deadline, dateFormat)} />
      </Form.Item>

      <Form.Item
        name="description"
        label="Vacancy description"
        initialValue={dataState.description}
      >
        <Input.TextArea autoSize={true} />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 20,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default EditCardForm;
