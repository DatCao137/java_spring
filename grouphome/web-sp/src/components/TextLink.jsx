import { Link } from "react-router-dom";

export const TextLink = ({linkTo, linkText}) => {
  return (
    <p className="el_txt__center">
      <Link to={linkTo} className="el_txt__bold el_txt__size18 el_txt__link">
        {linkText}
      </Link>
    </p>
  );
};
