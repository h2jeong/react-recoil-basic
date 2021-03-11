import React from "react";
import { useRecoilState } from "recoil";
import { commonNotification } from "../../store/notifications";

const Notification = () => {
  const [notification, setNotification] = useRecoilState(commonNotification);

  const onHide = () => {
      setNotification(prev => ({
          ...prev,
          isVisible: false
      }))
  }

  return (
    <>
      {notification.isVisible && (
        <section>
          <p>
            {notification.message}
            <button onClick={onHide}>Hide</button>
          </p>
        </section>
      )}
    </>
  );
};

export default Notification;
