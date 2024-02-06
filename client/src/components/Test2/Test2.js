import React from "react";
import {
  HomeOutlined,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  InfoCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./Test2.css";

const DATA = [
  {
    id: "0e2f0db1-5457-46b0-949e-8032d2f9997a",
    name: "First Set",
    items: [
      { id: "26fd50b3-3841-496e-8b32-73636f6f4197", name: "Some example" },
      { id: "b0ee9d50-d0a6-46f8-96e3-7f3f0f9a2521", name: "Butter" },
      { id: "26fd50b3-3841-496e-8b32-73636f6f419v", name: "Some example" },
      { id: "26fd50b3-3841-496e-8b32-73636f6f419e", name: "Some example" },
      { id: "26fd50b3-3841-496e-8b32-73636f6f4190", name: "Some example" },
    ],
    tint: 1,
  },
  {
    id: "487f68b4-1746-438c-920e-d67b7df46247",
    name: "Second Set",
    items: [
      {
        id: "95ee6a5d-f927-4579-8c15-2b4eb86210ae",
        name: "Designing Data Intensive Applications",
      },
      { id: "5bee94eb-6bde-4411-b438-1c37fa6eef364", name: "Atomic Habits" },
      { id: "26fd50b3-3841-496e-8b32-7363qv6f4197", name: "Some example" },
      { id: "26fd50b3-3841-496e-8b32-73mb6f6f4197", name: "Some example" },
      { id: "26fd50b3-3841-496e-8b32-7365gf6f4197", name: "Some example" },
    ],
    tint: 2,
  },
  {
    id: "25daffdc-aae0-4d73-bd31-43f73101e7c0",
    name: "Third set",
    items: [
      { id: "960cbbcf-89a0-4d79-aa8e-56abbvn5eacc", name: "Workbench" },
      { id: "d3edf796-6449-4931-a777-2366965a025b", name: "Hammer" },
      { id: "26fd50b3-3841-496e-8b32-73456f6f4197", name: "Some example" },
      { id: "26fd50b3-3841-496e-8b32-73636jjf4197", name: "Some example" },
      { id: "26fd50b3-3841-496e-8b32-7363xx6f4197", name: "Some example" },
      { id: "26fd50b3-3841-496e-8b32-7363vf6f4197", name: "Some example" },
    ],
    tint: 3,
  },
];

function Test2() {
  const [stores, setStores] = useState(DATA);

  const handleDragAndDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedStores = [...stores];

      const storeSourceIndex = source.index;
      const storeDestinatonIndex = destination.index;

      const [removedStore] = reorderedStores.splice(storeSourceIndex, 1);
      reorderedStores.splice(storeDestinatonIndex, 0, removedStore);

      return setStores(reorderedStores);
    }
    const itemSourceIndex = source.index;
    const itemDestinationIndex = destination.index;

    const storeSourceIndex = stores.findIndex(
      (store) => store.id === source.droppableId
    );
    const storeDestinationIndex = stores.findIndex(
      (store) => store.id === destination.droppableId
    );

    const newSourceItems = [...stores[storeSourceIndex].items];
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...stores[storeDestinationIndex].items]
        : newSourceItems;

    const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
    newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

    const newStores = [...stores];

    newStores[storeSourceIndex] = {
      ...stores[storeSourceIndex],
      items: newSourceItems,
    };
    newStores[storeDestinationIndex] = {
      ...stores[storeDestinationIndex],
      items: newDestinationItems,
    };

    setStores(newStores);
  };

  return (
    <div
      className="bacgroundWraoer"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/Todos.svg)`,
      }}
    >
      <div className="layout__wrapper">
        <div className="card">
          <DragDropContext onDragEnd={handleDragAndDrop}>
            <div className="header">
              <h1 className="titleMain">
                {" "}
                <PieChartOutlined className="infoIcon" /> Todo Section
              </h1>
            </div>
            <Droppable droppableId="ROOT" type="group">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="conteinerMain"
                >
                  {stores.map((store, index) => (
                    <Draggable
                      draggableId={store.id}
                      index={index}
                      key={store.id}
                    >
                      {(provided) => (
                        <div
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          className="conteinerSection"
                        >
                          <StoreList {...store} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

function StoreList({ name, items, id }) {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="wrapper"
        >
          <div className="store-container">
            <h2 className="seconderyTitle">{name}</h2>
          </div>
          <div className="items-container">
            {items.map((item, index) => (
              <Draggable draggableId={item.id} index={index} key={item.id}>
                {(provided) => (
                  <div
                    className="item-container"
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    <h4>{item.name}</h4>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}

export default Test2;
