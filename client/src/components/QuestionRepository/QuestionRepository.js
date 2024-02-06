import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import {
  fetchCreateQuestions,
  fetchQuestions,
  fetchRemoveQuestions,
  fetchUpdateQuestions
} from "../../redux/slices/questions";
import { Empty, Collapse, Form, Input, Rate } from "antd";
import SkeletonCard from "../CardSectoin/SkeletonCard/SkeletonCard";
import { GoEye, GoEyeClosed } from "react-icons/go";

import { FileOutlined, DeleteOutlined } from "@ant-design/icons";
import styles from "./QuestionRepository.module.css";

const QuestionRepository = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const questions = useSelector((state) => state.questions.questions.items);

  const [inputsData, setInputsData] = useState({
    question: null,
    answer: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchQuestions());
    };
    fetchData();
  }, [dispatch]);

  

  const genExtra = (id) => (
    <div className={styles.iconsConteiner}>
      <Rate
        defaultValue={questions.find((question) =>{
          return question._id === id
        }).status}
        className={styles.rate}
        onChange={(value) => dispatch(fetchUpdateQuestions({id, value}))}
        onClick={(event) => {
          event.stopPropagation();
        }}
      />
      <DeleteOutlined
        className={styles.deleteIcon}
        onClick={(event) => {
          event.stopPropagation();
          dispatch(fetchRemoveQuestions(id));
        }}
      />
    </div>
  );
  const panelStyle = {
    marginBottom: 24,
    background: "rgb(0,0,0, 0.2)",
    color: "red",
    borderRadius: "10px",
    border: "1px solid #fff",
    padding: "5px",
    fontSize: "18px",
  };

  const getItems = () => {
    const data = questions.map((question, index) => {
      return {
        key: index,
        label: question.question,
        children: question.answer,
        style: panelStyle,
        extra: genExtra(question._id),
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
  };

  const handleInputQuestChange = (e) => {
    setInputsData({ ...inputsData, question: e.target.value });
  };

  const handleInputAnswerChange = (e) => {
    setInputsData({ ...inputsData, answer: e.target.value });
  };

  return !isAuth ? (
    <Empty />
  ) : (
    <div className="bacgroundWraoer">
      <h1 style={{ display: "flex", marginBottom: "30px" }}>
        <FileOutlined className="infoIcon" />
        Your Question Repository
      </h1>
      <Form
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
              onChange={(e) => handleInputQuestChange(e)}
              value={inputsData}
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
              onChange={(e) => handleInputAnswerChange(e)}
              value={inputsData}
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
              Add The Question
            </button>
          </Form.Item>
        </div>
      </Form>

      <Collapse
        bordered={false}
        expandIcon={({ isActive }) =>
          isActive ? (
            <GoEye style={{ fontSize: "22px" }} className={styles.icon} />
          ) : (
            <GoEyeClosed style={{ fontSize: "22px" }} className={styles.icon} />
          )
        }
        showArrow={false}
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
