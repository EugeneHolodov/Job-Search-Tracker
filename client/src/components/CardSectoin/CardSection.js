import React, { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Row, Col, Modal, Dropdown } from "antd";
import SingleCard from "./SingleCard/SingleCard";
import styles from "./CardSection.module.css";
import SkeletonCard from "./SkeletonCard/SkeletonCard";
import {
  fetchCards,
  fetchUpdateCards,
  fetchUpdateAllCards,
} from "../../redux/slices/cards";
import { GoStack, GoEyeClosed } from "react-icons/go";
import CreateCardForm from "../CreateCardForm/CreateCardForm";
import { selectIsAuth } from "../../redux/slices/auth";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Howl } from "howler";

const CardSection = () => {
  const userData = useSelector((state) => state.auth.data);
  const { cards } = useSelector((state) => state.cards);

  const dispatch = useDispatch();
  const isCardsLoading = cards.status === "loading";
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const [initialStatuses, setInitialStatuses] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const currentCardsRef = React.useRef(cards);
  const [cardForStatusRend, setCardForStatusRend] = useState(
    currentCardsRef.current.items
  );

  React.useEffect(() => {
    if (!isAuth) {
      setCardForStatusRend([]);
      console.log('this',cardForStatusRend);
    }
  }, [isAuth]);

  React.useEffect(() => {
    let initialStatusArr;
    // Функция для обновления состояния карточек
    const updateCardStatus = (data) => {
      setCardForStatusRend(
        data.filter((item) => item.user && item.user._id === userData?._id)
      );
    };

    const fetchData = async () => {
      const data = await dispatch(fetchCards());
      if (data.payload) {
        initialStatusArr = data.payload.map((element) => element.state);
        console.log("2", initialStatusArr);
        updateCardStatus(data.payload);
      }
      console.log("1", data);
    };

    if (!cards.items.length) {
      console.log("I get data from", cards.items);
      fetchData();
    } else {
      initialStatusArr = cards.items.map((element) => element.state);
      setCardForStatusRend(
        cards.items.filter(
          (item) => item.user && item.user._id === userData?._id
        )
      );
    }


    const handleUnload = async () => {
      console.log("Lemon");
      if (initialStatusArr && currentCardsRef.current) {
        const initialStatusArrSecond = currentCardsRef.current.items.map(
          (element) => element.state
        );
        const arrayEquals = (initialStatusArr, initialStatusArrSecond) => {
          if (initialStatusArr.length !== initialStatusArrSecond.length) {
            return false;
          }
          if (
            JSON.stringify(initialStatusArr) !==
            JSON.stringify(initialStatusArrSecond)
          ) {
            return false;
          }
          return true;
        };

        try {
          
          console.log(
            "Compear",
            arrayEquals(initialStatusArr, initialStatusArrSecond)
          );
          if (!arrayEquals(initialStatusArr, initialStatusArrSecond))
            await dispatch(fetchUpdateAllCards(currentCardsRef.current));
        } catch (error) {
          console.error("Failed to update data on the server:", error);
        }
      }
    };

    const unlisten = () => {
      handleUnload();
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      unlisten();
    };
  }, [userData, useLocation]);

  React.useEffect(() => {
    currentCardsRef.current = cards;
    setCardForStatusRend(currentCardsRef.current.items);
    console.log("currentCardsRef.current", currentCardsRef.current);
  }, [cards]);

  const soundHoverCard = new Howl({
    src: ["/audio/hover-sound.wav"],
    volume: 0.3,
  });

  const playSound = () => {
    soundHoverCard.play();
  };

  const cardsForRender = cards.items.filter((item) => {
    if (item.user && userData) {
      return item.user._id === userData._id;
    }
  });
  console.log("currentCardsRef.current.items", currentCardsRef.current.items);

  console.log("cardsForRender:", cardsForRender);
  console.log("Cards", cards);

  const handleSorted = (valState) => {
    const cardsForRender = cards.items.filter(
      (item) => item.state === valState
    );
    setCardForStatusRend(cardsForRender);
  };

  const handleModalToModal = () => {
    if (isAuth) {
      setOpen(true);
    } else {
      alert("You have to login first");

      navigate("/login");
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const items = [
    {
      label: (
        <p onClick={() => setCardForStatusRend(cardsForRender)}>All vacancy</p>
      ),
      key: "All",
    },
    {
      label: <p onClick={() => handleSorted("isAwaiting")}>Awaiting</p>,
      key: "isAwaiting",
    },
    {
      label: <p onClick={() => handleSorted("isApproved")}>Approved</p>,

      key: "isApproved",
    },
    {
      label: <p onClick={() => handleSorted("isRejected")}>Rejected</p>,

      key: "isRejected",
    },
  ];

  return (
    <div className={styles.conteiner}>
      <div className={styles.header}>
        <h1>
          <GoStack className="infoIcon" />
          Your Applied Vacancy Cards
        </h1>
        {isAuth ? (
          <Dropdown
            menu={{
              items,
            }}
            arrow={false}
            trigger={["hover"]}
            placement="bottomLeft"
            className={styles.dropdown}
          >
            {isCardsLoading && cardForStatusRend.length ? (
              <></>
            ) : (
              <button className={styles.sertButton} type="subMeny">
                Sort Cards By
                <GoEyeClosed className={styles.iconSertButton} />
              </button>
            )}
          </Dropdown>
        ) : (
          <></>
        )}
      </div>
      <Row
        wrap={true}
        gutter={[
          { xs: 8, sm: 16, md: 24 },
          { xs: 8, sm: 16, md: 24 },
        ]}
        justify={{ ["md"]: "center", ["lg"]: "start" }}
        className={styles.margBott}
      >
        {console.log("That I rendered", cardForStatusRend)}
        {(isCardsLoading
          ? [...Array(cardForStatusRend.length)]
          : cardForStatusRend
        ).map((item, index) =>
          isCardsLoading ? (
            <SkeletonCard key={index} />
          ) : (
            <Col>
              <SingleCard key={item._id} item={item} hoverFunc={playSound} />
            </Col>
          )
        )}
      </Row>

      <button
        className="mainButton"
        styles={{ marginTop: "30px" }}
        onClick={() => handleModalToModal()}
      >
        <PlusCircleOutlined className="iconButtons" />
        Add New Vacancy
      </button>

      <Modal
        title="Create a Vacancy Card"
        footer={null}
        open={open}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <CreateCardForm />
      </Modal>
    </div>
  );
};

export default CardSection;
