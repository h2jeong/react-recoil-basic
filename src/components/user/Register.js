import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { commonNotification } from "../../store/notifications";
import { register } from "../../store/queries";

const Register = ({ history }) => {
  const [username, setUsername] = useState('');
  const setNotification = useSetRecoilState(commonNotification);

  const onSubmit = async (e) => {
      e.preventDefault();

      try {
          const { data } = await register(username);

          setNotification({
              message: data.message,
              isVisible: true
          })

          if (data.success) {
              history.push('/login')
          }

      } catch (error) {
          setNotification({
              message: error.message,
              isVisible: true
          })
      }
  };

  return (
    <section>
      <h3>Register</h3>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
          required
          autoFocus
        />

        <button type="submit">
          <strong>Submit</strong>
        </button>
      </form>
    </section>
  );
};

export default Register;
