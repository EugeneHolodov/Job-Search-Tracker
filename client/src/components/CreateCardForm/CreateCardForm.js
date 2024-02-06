import React, { useState } from "react";
import { Button, Form, Input, DatePicker } from "antd";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import { setAddCard } from "../../redux/slices/cards";
import { useDispatch, useSelector } from "react-redux";
import { PlusCircleOutlined } from "@ant-design/icons";

const CreateCardForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.data);
  const [loading, setLoading] = useState(false);
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const validateMessages = {
    required: "${label} name is required!",
    rules: [
      {
        type: "object",
        required: true,
        message: "Please select time!",
      },
    ],
  };

  const onFinish = async (fieldsValue) => {
    const values = {
      ...fieldsValue,
      deadline: fieldsValue["deadline"].format("YYYY-MM-DD"),
    };
    try {
      setLoading(true);
      const { data } = await axios.post("/cards", values);
      dispatch(setAddCard({ data, userData }));
      const id = data._id;
      navigate(`/vacancy/${id}`);
    } catch (error) {
      console.warn("Fail to create card");
    }
  };

  return (
    <Form
      {...layout}
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      validateMessages={validateMessages}
    >
      <Form.Item
        name="title"
        label="Company"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="deadline" label="Deadline" {...validateMessages}>
        <DatePicker />
      </Form.Item>

      <Form.Item name="description" label="Vacancy Description">
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 19,
        }}
      >
        <button className="secandaryButton" htmlType="submit">
          <PlusCircleOutlined />
          Create
        </button>
      </Form.Item>
    </Form>
  );
};
export default CreateCardForm;
