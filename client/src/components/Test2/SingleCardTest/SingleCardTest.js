import { Card, ConfigProvider, Menu, Tabs } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  SettingOutlined,
  EditOutlined,
  DeleteOutlined,
  FrownOutlined,
  MehOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import styles from "./SingleCardTest.module.css";
import { fetchRemoveCards } from "../../../redux/slices/cards";

const SingleCard = ({ item, hoverFunc}) => {
  const dispatch = useDispatch();

  let stateIndicatorColor = "#EDA35A";
  if (item.state) {
    switch (item.state) {
      case "isAwaiting":
        stateIndicatorColor = "#EDA35A";
        break;
      case "isApproved":
        stateIndicatorColor = "#00F5D2";
        break;
      case "isRejected":
        stateIndicatorColor = "#F57300";
        break;

      default:
        stateIndicatorColor = "#EDA35A";
    }
  }
  const [statusColor, setStatusColor] = useState(stateIndicatorColor);

  const tabList = [
    {
      key: "description",
      label: "Description",
      children: `${item.description}`,
    },
    {
      key: "todos",
      label: "Todos",
      children: `${item.todos}`,
    },
    {
      key: "deadline",
      label: "Deadline",
      children: `${item.deadline}`,
    },
  ];

  const [activeTabKey, setActiveTabKey] = useState("description");
  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const handleStatusColor = (color) => {
    setStatusColor(color);
  };

  const onClickRemove = () => {
    if (window.confirm("Are you sure you want to delete the card?")) {
      console.log(item._id);
      dispatch(fetchRemoveCards(item._id));
    }
  };

  const items = [
    getItem(
      <SettingOutlined className={styles.iconsBottom} type="subMeny" />,
      "setting",
      null,
      [
        getItem(
          <SmileOutlined
            style={{ color: "#20b1a9" }}
            onClick={() => handleStatusColor("#20b1a9")}
          />,
          "1"
        ),
        getItem(
          <MehOutlined
            style={{ color: "#EDA35A" }}
            onClick={() => handleStatusColor("#EDA35A")}
          />,
          "2"
        ),
        getItem(
          <FrownOutlined
            style={{ color: "#A85B75" }}
            onClick={() => handleStatusColor("#A85B75")}
          />,
          "3"
        ),
      ]
    ),
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            itemColor: "#f5faff",
            itemHoverColor: "#002140",
            itemSelectedColor: "#002140",
            inkBarColor: "#002140",
            itemActiveColor: "#A8D0E6",
          },
          Menu: {
            itemActiveBg: "transparent",
            itemBg: "transparent",
            itemHoverBg: "transparent",
            itemSelectedBg: "#A8D0E6",
            dropdownWidth: 50,
            itemHeight: 22,
            iconSize: 20,
          },
        },
      }}
    >
      <div className={styles.card} onMouseEnter={hoverFunc}>
        <div className={styles.header}>
          <h1 className={styles.title}>{item.title}d</h1>
          <div
            className={styles.cardsBg}
            style={{ backgroundColor: statusColor }}
          ></div>
          <Link to={`/vacancy/${item._id}`} className={styles.icons}>
            {<EditOutlined />}
          </Link>
        </div>

        <div style={{ zIndex: 4, position: "relative" }}>
          <Tabs
            defaultActiveKey="description"
            items={tabList}
            onChange={() => onTabChange(activeTabKey)}
          />
        </div>
        <divv className={styles.cardButtom}>
          <Menu
            items={items}
            triggerSubMenuAction="click"
            className={styles.cardButtomElem}
            expandIcon={false}
            style={{ borderRight: "1px solid #f5faff" }}
          />
          <div className={styles.cardButtomElem}>
            <DeleteOutlined
              className={styles.iconsBottom}
              onClick={onClickRemove}
            />
          </div>
        </divv>
      </div>
    </ConfigProvider>
  );
};

export default SingleCard;

{
  /* <Menu
items={items}
triggerSubMenuAction="click"
expandIcon={false}
/>, 
<DeleteOutlined
            className={styles.iconsBottom}
            key="delete"
            onClick={onClickRemove}
          />,*/
}
