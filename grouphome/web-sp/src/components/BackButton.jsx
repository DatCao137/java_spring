import { Link } from "react-router-dom";

export const BackButton = ({buttonLink, buttonClass, buttonText}) => {
  return (
    <Link to={buttonLink} className={`el_btn el_btn__gray ${buttonClass || ''}`}>
      {buttonText}
    </Link>
  );
};
