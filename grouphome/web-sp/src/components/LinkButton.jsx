import { Link } from "react-router-dom";

export const LinkButton = ({buttonLink, buttonClass, buttonText, userPhoto}) => {
  return (
    userPhoto ? (
      <div className="bl_btnWrapper__hasPhoto">
        <div className="bl_userPhoto"><img src={userPhoto} alt="" /></div>
        <Link to={buttonLink} className={`el_btn el_btn__green ${buttonClass || ''}`}>
          {buttonText}
        </Link>
      </div>
    ) : (
      <Link to={buttonLink} className={`el_btn el_btn__green ${buttonClass || ''}`}>
        {buttonText}
      </Link>
    )
  );
};
