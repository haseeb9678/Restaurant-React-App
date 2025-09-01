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
        users.length > 0 && <section className='w-full overflow-scroll flex flex-col gap-5 scrollbar-hide'>
            <h2 className='font-bold text-lg md:text-2xl'>Users Record</h2>
            <table className='border-collapse w-full text-center'>
                <thead>
                    <tr className='font-bold w-full bg-black/5'>
                        <td className='border border-black/30 w-max px-2 py-1'>Id</td>
                        <td className='border border-black/30 w-max px-2 py-1'>Name</td>
                        <td className='border border-black/30 w-max px-2 py-1'>Email</td>
                        <td className='border border-black/30 w-max px-2 py-1'>Password</td>
                        <td className='border border-black/30 w-max px-2 py-1 bg-gray-500 text-white'> <span>Active Orders</span></td>
                        <td className='border border-black/30 w-max px-2 py-1 bg-green-500 text-white'><span>Processed Orders</span></td>
                        <td className='border border-black/30 w-max px-2 py-1 bg-red-500 text-white'><span>Cancelled Orders</span></td>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user) => {
                            const active = user.ordersData?.orders?.filter(
                                (d) => d.status === 'processing'
                            ).length || 0
                            const cancelled = user.ordersData?.orders?.filter(
                                (d) => d.status === 'cancelled'
                            ).length || 0
                            const processed = user.ordersData?.orders?.filter(
                                (d) => d.status === 'processed'
                            ).length || 0

                            return <tr key={user.id}>
                                <td className='border border-black/30 w-max px-2 py-1'>{user.id}</td>
                                <td className='border border-black/30 w-max px-2 py-1'>{user.name}</td>
                                <td className='border border-black/30 w-max px-2 py-1'>{user.email}</td>
                                <td className='border border-black/30 w-max px-2 py-1'>{user.password}</td>
                                <td className='border border-black/30 w-max px-2 py-1'>{active}</td>
                                <td className='border border-black/30 w-max px-2 py-1'>{processed}</td>
                                <td className='border border-black/30 w-max px-2 py-1'>{cancelled}</td>
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