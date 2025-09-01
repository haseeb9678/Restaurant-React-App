import React, { useContext } from 'react'
import { UserInfoContext } from '../contexts/userInfo'

const ShowUsersTable = () => {
    const { users, activeOrders, clearAllUsers } = useContext(UserInfoContext)
    if (!users) {
        return <section>
            <p>No user data is available to show</p>
        </section>
    }
    return (
        users.length > 0 && <section>
            <table>
                <thead>
                    <tr className='font-bold'>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Password</td>
                        <td>Active Orders</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user) => {
                            return <tr key={user.id}>
                                <td >{user.name}</td>
                                <td >{user.email}</td>
                                <td >{user.password}</td>
                                <td >0</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <div>
                <button
                    onClick={clearAllUsers}
                    className='cursor-pointer max-w-max bg-orange-500 text-white rounded-full px-4 text-nowrap py-1 md:px-6 hover:bg-orange-600'
                >Clear All users Data</button>
            </div>
        </section>
    )
}

export default ShowUsersTable