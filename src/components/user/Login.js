import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { commonNotification } from '../../store/notifications'
import { login, loginSet } from '../../store/queries'
import { userAuthState } from '../../store/users'

const Login = ({ history }) => {
    const [username, setUsername] = useState('')
    const setNotification = useSetRecoilState(commonNotification);
    const setUserAuth = useSetRecoilState(userAuthState);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await login(username);
            
            setNotification({
                message: data.message,
                isVisible: true
            })

            if (data.success) {
                setUserAuth({
                    isAuthenticated: true,
                    user: data.user
                })

                loginSet(data.token, data.user)

                history.push('/dashboard')
            }
        } catch (error) {
            setNotification({
                message: error.message,
                isVisible: true
            })
        }
    }

    return (
        <section>
      <h3>Login</h3>

      <form onSubmit={onSubmit}>
        <input
          type='text'
          value={username}
          onChange={event => setUsername(event.target.value)}
          placeholder='Username'
          required
          autoFocus
        />

        <button type='submit'>
          <strong>Submit</strong>
        </button>
      </form>
    </section>
    )
}

export default Login
