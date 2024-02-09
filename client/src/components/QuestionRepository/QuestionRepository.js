import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import {
  fetchCreateQuestions,
  fetchQuestions,
  fetchRemoveQuestions,
  fetchUpdateQuestions,
} from "../../redux/slices/questions";
import { Empty, Collapse, Form, Input, Rate } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { GoEye, GoEyeClosed } from "react-icons/go";

import { OrderedListOutlined, DeleteOutlined } from "@ant-design/icons";
import styles from "./QuestionRepository.module.css";

const QuestionRepository = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const [isFormShowed, setIsFormShowed] = useState(false);
  const questions = useSelector((state) => state.questions.questions.items);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const panelStyle = {
    marginBottom: 24,
    background: "rgb(0,0,0, 0.1)",
    color: "#ddeaf6",
    borderRadius: "10px",
    border: "1px solid #ddeaf6",
    padding: "15px",
    fontSize: "18px",
  };

  const getItems = () => {
    const data = questions.map((question, index) => {
      return {
        key: index,
        label: (
          <div className={styles.questionConteiner}>
            <div className={styles.iconsConteiner}>
              <Rate
                defaultValue={question.status}
                className={styles.rate}
                onChange={(value) =>
                  dispatch(fetchUpdateQuestions({ id: question._id, value }))
                }
                onClick={(event) => {
                  event.stopPropagation();
                }}
              />

              <DeleteOutlined
                className={styles.deleteIcon}
                onClick={(event) => {
                  event.stopPropagation();
                  dispatch(fetchRemoveQuestions(question._id));
                }}
              />
            </div>
            <p className={styles.question}><h4>{question.question}</h4></p>
          </div>
        ),
        children: <p className={styles.text}>{question.answer}</p>,
        style: panelStyle,
      };
    });
    return data;
  };

  const handleOnFinish = (val) => {
    if (!val.question || !val.answer) return alert("fill the inputs");
    const data = {
      question: val.question,
      answer: val.answer,
    };
    dispatch(fetchCreateQuestions(data));

    form.resetFields();
    setIsFormShowed(false);
  };

  return !isAuth ? (
    <Empty />
  ) : (
    <div
      className="bacgroundWraoer"
      // style={{
      //   backgroundImage: `url(${process.env.PUBLIC_URL}/images/Todos.svg)`,
      // }}
    >
      <h1 className="headerMain">
        <OrderedListOutlined className="infoIcon" />
        Your Question Repository
      </h1>
      {isFormShowed ? (
        <MinusCircleOutlined
          className="form-showed-buttons"
          style={{ marginBottom: "30px" }}
          onClick={() => setIsFormShowed(!isFormShowed)}
        />
      ) : (
        <PlusCircleOutlined
          className="form-showed-buttons"
          style={{ marginBottom: "30px" }}
          onClick={() => setIsFormShowed(!isFormShowed)}
        />
      )}

      {isFormShowed && (
        <Form
          form={form}
          onFinish={(val) => handleOnFinish(val)}
          style={{
            maxWidth: 600,
          }}
        >
          <div className={styles.conteinForForm}>
            <h2 className={styles.todoHeader}>Create a New Question</h2>
            <Form.Item name="question">
              <Input.TextArea
                autoSize={true}
                size="large"
                rules={[
                  {
                    required: true,
                    message: "Please input a question!",
                  },
                ]}
              />
            </Form.Item>
            <h2 className={styles.todoHeader}>Add An Answer</h2>
            <Form.Item name="answer">
              <Input.TextArea
                autoSize={true}
                size="large"
                rules={[
                  {
                    required: true,
                    message: "Please input a answer!",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item>
              <button
                type="primary"
                htmlType="submit"
                className="mainButton"
                style={{ marginBottom: "30px" }}
              >
                <PlusCircleOutlined className="iconButtons" />
                Add The Question
              </button>
            </Form.Item>
          </div>
        </Form>
      )}

      <Collapse
        bordered={false}
        expandIcon={({ isActive }) =>
          isActive ? (
            <GoEye style={{ fontSize: "22px" }} className={styles.icon} />
          ) : (
            <GoEyeClosed style={{ fontSize: "22px" }} className={styles.icon} />
          )
        }
        style={{
          background: "#4c9aff",
          alignItems: "center",
        }}
        items={getItems()}
      />
    </div>
  );
};

export default QuestionRepository;
