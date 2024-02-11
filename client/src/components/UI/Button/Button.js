import { useSound } from "../../utils/useSound";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Button({ clas, text, icon, clickFunc, type, disabled }) {

  const playSoundHover = useSound("/audio/hover-small.wav", 0.4);

  
  console.log(disabled, "knopka");
  return (
    <button
      className={clas}
      htmlType={type}
      disabled={disabled}
      onMouseEnter={() => playSoundHover()}
      onClick={clickFunc}
    >
      {disabled ? (
        <AiOutlineLoading3Quarters className="loading-icon" />
      ) : (
        icon
      )}
      {text}
    </button>
  );
}

export default Button;
