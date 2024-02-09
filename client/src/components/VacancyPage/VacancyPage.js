import React from "react";
import { ConfigProvider } from "antd";
import CardSection from "../CardSectoin/CardSection";

const VacancyPage = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          
          
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
