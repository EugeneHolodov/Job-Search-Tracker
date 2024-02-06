import React from "react";
import { ConfigProvider } from "antd";
import CardSection from "../CardSectoin/CardSection";

const VacancyPage = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultGhostColor: "#303C6C",
            defaultGhostBorderColor: "#303C6C",
          },
          Modal: {
            titleLineHeight: 3.5,
            titleFontSize: 22,
            titleColor: "black",
            contentBg: "#ebecf0",
            headerBg: "#ebecf0",
          },
        },
      }}
    >
      <div
        className='bacgroundWraoer'
        style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/Multitasking_2.svg)`}}
      >
        <CardSection />
      </div>
    </ConfigProvider>
  );
};

export default VacancyPage;
