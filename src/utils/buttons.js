import "./style.min.css";

export const Button1 = ({ onClick, buttonText }) => (
  <button onClick={onClick} className="button button1">
    {buttonText}
  </button>
);

export const Button2 = ({ onClick, buttonText }) => (
  <button onClick={onClick} className="button button2">
    {buttonText}
  </button>
);
