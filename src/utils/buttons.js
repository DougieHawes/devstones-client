import "./style.min.css";

export const Button1 = ({ onClick, buttonText }) => (
  <button onClick={onClick} className="button">
    {buttonText}
  </button>
);
