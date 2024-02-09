import styles from "./About.module.css";
import { PaperClipOutlined, InfoCircleOutlined } from "@ant-design/icons";

const About = () => {
  return (
    <div
      className="bacgroundWraoer"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/life_style_working_11.svg)`,
      }}
    >
      <h1 className="headerMain">
        <span>
          <InfoCircleOutlined className="infoIcon" />
        </span>
        About
      </h1>
      <div className={styles.contein}>
        <p>
          <span>
            <PaperClipOutlined />
          </span>
          Ipsum dolor sit amet consectetur adipisicing elit. Qui veniam,
          aspernatur non voluptatibus a sunt accusantium officia debitis iusto
          nisi velit, atque inventore, ea incidunt at! Amet aspernatur ad nisi
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui venia.
        </p>

        <p>
          <span>
            <PaperClipOutlined />
          </span>
          Aspernatur non voluptatibus a sunt accusantium officia debitis iusto
          nisi velit, atque inventore, ea incidunt at! Amet aspernatur ad nisi
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui veniam,
          aspernatur non voluptatibus a sunt accusantium officia debitis iusto
          nisi velit, atque inventore, ea incidunt at! Amet aspernatur ad nisi
        </p>

        <p>
          <span>
            <PaperClipOutlined />
          </span>
          Rorem ipsum dolor sit amet consectetur adipisicing elit. Qui veniam,
          aspernatur non voluptatibus a sunt accusantium officia debitis iusto
          nisi velit, atque inventore, eaincidunt at! Amet aspernatur ad nisi.
        </p>
      </div>
    </div>
  );
};

export default About;
