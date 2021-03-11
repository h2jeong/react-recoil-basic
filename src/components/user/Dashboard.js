import React from 'react'
import { useRecoilValue } from 'recoil'
import { userAuthState } from '../../store/users'

const Dashboard = () => {
    const auth = useRecoilValue(userAuthState)
    return (
        <div>
      <h3>Dashboard</h3>

      {
        auth.isAuthenticated &&
        <p>Welcome, { auth.user.username }!</p>
      }
    </div>
    )
}

export default Dashboard
