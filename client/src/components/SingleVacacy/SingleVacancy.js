import { useEffect, useState } from "react";
import {
  GoStopwatch,
  GoChecklist,
  GoLog,
  GoCircle,
  GoCheckCircle,
  GoCircleSlash,
} from "react-icons/go";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { currentDate } from "../utils/curentData";
import TodosSection from "../TodosSection/TodosSection";
import axios from "../../axios";
import { Skeleton, ConfigProvider } from "antd";
import styles from "./SingleVacancy.module.css";
import { Button, Modal, Form, Input, DatePicker } from "antd";
import {
  PlusCircleOutlined,
  PaperClipOutlined,
  CheckCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { fetchUpdateCards } from "../../redux/slices/cards";
import dayjs from "dayjs";

export const SingleVacancy = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();
  const dateFormat = "YYYY/MM/DD";

  const items = useSelector((state) => state.cards.cards.items);
  const dataFromState = items.find((card) => card._id === id);
  console.log("В начале рендера компонента", items);

  const createdTime =
    data && data.createdAt && data.createdAt.length >= 10
      ? data.createdAt.slice(0, 10)
      : currentDate();

  const onFinish = async (id, values) => {
    if (window.confirm("Do you want to update the card?")) {
      const val = values.deadline
        ? {
            ...values,
            deadline: values["deadline"].format("YYYY-MM-DD"),
          }
        : values;
      const storedData = localStorage.getItem("myDataTodos");
      const existingData = storedData ? JSON.parse(storedData) : {};
      const todosTarg = existingData[id];
      try {
        setConfirmLoading(true);
        const card = await dispatch(
          fetchUpdateCards({
            id,
            values: { ...val, todos: todosTarg },
          })
        );
        setData(card.payload);
      } catch (error) {
        console.warn("Fail to update card", error);
      }
      setOpen(false);
    }
  };

  useEffect(() => {
    if (!items.length) {
      axios
        .get(`/cards/${id}`)
        .then((res) => {
          console.log("myRess", res);
          setData(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.warn(err);
          alert("Error receiving article");
        });
    } else {
      setData(dataFromState);
      setIsLoading(false);
    }
  }, []);

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  if (isLoading) {
    return <Skeleton active />;
  }

  const handleModalToModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: "#ebecf0",
            headerBg: "#ebecf0",
          },
        },
      }}
    >
      <div
        className="bacgroundWraoer"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/na_feb_25.svg)`,
          height: "90vh",
        }}
      >
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>
              {(() => {
                switch (data.state) {
                  case "isAwaiting":
                    return <GoCircle style={{ fill: "#eda35a" }} />;
                  case "isApproved":
                    return <GoCheckCircle style={{ fill: "#30e2b5" }} />;
                  case "isRejected":
                    return <GoCircleSlash style={{ fill: "#b32f55" }} />;
                  default:
                    return null; // or some default value
                }
              })()}
              {data.title}
            </h1>
            <h2
              style={{
                color: "#000",
                fontSize: "16px",
              }}
            >
             Data Creation Time:
              <span
                style={{
                  color: "#ff9f3e",
                  marginLeft: "10px",
                  fontSize: "20px",
                }}
              >
                {createdTime}
              </span>
            </h2>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#f5faff",
              backgroundColor: "rgba(0, 0, 0, 0.45)",
              padding: "10px 25px",
              borderRadius: "20px",
            }}
          >
            <h2 className={styles.deadlineHead}>
              <GoStopwatch />
              Deadline:
            </h2>
            <span style={{ fontSize: "26px", color: "#ff9f3e" }}>
              {data.deadline}
            </span>
          </div>
        </div>

        <div className={styles.contein}>
          <h2 style={{ marginBottom: "5px" }}>
            <GoLog style={{ marginRight: "5px" }} />
            Description:
          </h2>

          <p>
            <span>
              <PaperClipOutlined />
            </span>
            {data.description}
          </p>
        </div>

        <button className="mainButton" onClick={() => handleModalToModal()}>
          <EditOutlined className="iconButtons" />
          Edit Your Vacancy
        </button>

        <Modal
          footer={null}
          open={open}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <h2 className={styles.headerEdit}>Edit This Vacancy</h2>
          <Form
            {...layout}
            onFinish={(formData) => onFinish(id, formData)}
            styles={{
              maxWidth: 600,
            }}
          >
            <Form.Item name="title" label="Company" initialValue={data.title}>
              <Input />
            </Form.Item>

            <Form.Item name="deadline" label="Deadline">
              <DatePicker defaultValue={dayjs(data.deadline, dateFormat)} />
            </Form.Item>

            <Form.Item
              name="description"
              label="Vacancy description"
              initialValue={data.description}
            >
              <Input.TextArea autoSize={true} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                ...layout.wrapperCol,
                offset: 21,
              }}
            >
              <button className={styles.secandaryButton} htmlType="submit">
                ...
                <EditOutlined />
              </button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div
        className="bacgroundWraoer"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/20943594.svg)`,
          height: "auto",
        }}
      >
        <TodosSection dataInit={data} />
      </div>
    </ConfigProvider>
  );
};

export default SingleVacancy;