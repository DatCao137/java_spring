export const UserName = ({h2Class, roomNumber, userName, userPhoto}) => {
  return (
    <h2 className={`bl_title__name ${h2Class || ''}`}>
      <span className="bl_userPhoto">
        <img src={userPhoto} alt="" />
      </span>
      <span>{roomNumber}<br />{userName}</span>
    </h2>
  )
};
