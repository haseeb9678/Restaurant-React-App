import React, { useContext, useEffect } from 'react'
import { UserInfoContext } from '../contexts/userInfo'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { SlInfo, SlMagnifier } from "react-icons/sl";

const ShowUsersTable = () => {
    const { users, activeOrders, clearAllUsers } = useContext(UserInfoContext)
    const [show, setShow] = useState(false)
    const [filteredUsers, setFilteredUsers] = useState(users)

    useEffect(() => {
        setShow((Object.keys(users).length > 0 ? true : false))
    }, [users])

    const handleChange = (e) => {
        const value = e.currentTarget.value
        const newUsers = users.filter((user) =>
            JSON.stringify(user.id).includes(value) || user.name.includes(value) || user.email.includes(value))
        setFilteredUsers(newUsers)
    }

    if (!show) {
        return <section className="w-full overflow-scroll scrollbar-hide flex flex-col gap-5">
            <h2 className="font-bold text-md md:text-3xl">User Records 👤</h2>
            <p className="text-gray-500 text-sm md:text-base mt-1">
                <span className='font-semibold'>No Users Registered.</span> Once users sign up, their records will appear here.
            </p>

        </section>
    }


    return (
        users.length > 0 && <section className='w-full overflow-scroll flex flex-col gap-5 scrollbar-hide'>
            <h2 className='font-bold text-lg md:text-2xl'>Users Record 👤</h2>
            <div className='flex flex-col gap-3 xl:flex-row xl:justify-between xl:items-center'>
                <p className='text-start text-lg'>Total Users: <span className='font-semibold'>{users.length}</span></p>
                <form>
                    <label htmlFor="search" className='flex flex-row-reverse w-55 md:w-90 justify-between items-center bg-gray-500/10 h-10 rounded-md px-3 md:px-5'>
                        <input
                            onChange={(e) => handleChange(e)}
                            className='bg-transparent border-none outline-none w-full'
                            type="text" name="search" id="search"
                            placeholder='Search user by name, email or id' />
                        <span className='mr-3 border-r-2 text-lg text-black/70 border-r-black/10 h-full flex items-center pr-3'><SlMagnifier /></span>
                    </label>
                </form>
            </div>
            <table className='border-collapse w-full text-center'>
                <thead>
                    <tr className='font-bold w-full bg-black/5'>
                        <td className='border border-black/30 w-max px-3 py-2'>Id</td>
                        <td className='border border-black/30 w-max px-3 py-2'>Name</td>
                        <td className='border border-black/30 w-max px-3 py-2'>Email</td>
                        <td className='border border-black/30 w-max px-3 py-2'>Password</td>
                        <td className='border border-black/30 w-max px-3 py-2 bg-gray-500 text-white'> <span>Active Orders</span></td>
                        <td className='border border-black/30 w-max px-3 py-2 bg-green-500 text-white'><span>Processed Orders</span></td>
                        <td className='border border-black/30 w-max px-3 py-2 bg-red-500 text-white'><span>Cancelled Orders</span></td>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredUsers.map((user) => {
                            const active = user.ordersData?.orders?.filter(
                                (d) => d.status === 'processing'
                            ).length || 0
                            const cancelled = user.ordersData?.orders?.filter(
                                (d) => d.status === 'cancelled'
                            ).length || 0
                            const processed = user.ordersData?.orders?.filter(
                                (d) => d.status === 'processed'
                            ).length || 0

                            return <tr key={user.id} className="even:bg-orange-100/30">
                                <td className='border border-black/30 w-max px-2 py-2'>{user.id}</td>
                                <td className='border border-black/30 w-max px-3 py-2'>{user.name}</td>
                                <td className='border border-black/30 w-max px-3 py-2'>{user.email}</td>
                                <td className='border border-black/30 w-max px-3 py-2'>{user.password}</td>
                                <td className='border border-black/30 w-max px-3 py-2'>{active}</td>
                                <td className='border border-black/30 w-max px-3 py-2'>{processed}</td>
                                <td className='border border-black/30 w-max px-3 py-2'>{cancelled}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <div>
                <button
                    onClick={() => {
                        clearAllUsers()
                        toast.success("All user data is cleared");
                    }}
                    className='cursor-pointer max-w-max bg-orange-500 text-white rounded-full px-4 text-nowrap py-1 md:px-6 hover:bg-orange-600'
                >Clear All users Data</button>
            </div>
        </section>
    )
}

export default ShowUsersTable