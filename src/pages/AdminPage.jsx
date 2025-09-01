import React, { useContext, useEffect, useState } from 'react'
import { UserInfoContext } from '../contexts/userInfo'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { AdminInfoContext } from '../contexts/adminInfo'
import ShowUsersTable from '../components/ShowUsersTable'

const AdminPage = () => {
    const { users } = useContext(UserInfoContext)
    const { loggedIn, admin, removeLoggedAdmin } = useContext(AdminInfoContext)
    const [showUsers, setShowUsers] = useState(false)
    const { setHideNav } = useOutletContext()
    const navigate = useNavigate()
    useEffect(() => {
        setHideNav(true)
        return () => setHideNav(false)
    }, [])

    if (!loggedIn) {
        return <section className='flex flex-col gap-5 h-[80vh] overflow-x-scroll scrollbar-hide'>
            <h2 className='font-bold text-xl md:text-2xl'>ADMIN PANEL</h2>
            <div className='flex flex-col'>
                <p className='text-base md:text-xl'>Admin Data not found</p>
            </div>
        </section>
    }

    const handleLogOut = () => {
        removeLoggedAdmin()
        navigate('/')
    }

    return (
        <section className='flex flex-col gap-5 h-[80vh] overflow-x-scroll scrollbar-hide'>
            <h2 className='font-bold text-xl md:text-2xl'>ADMIN PANEL</h2>
            <div className='flex flex-col'>
                <p className='text-lg md:text-xl'>Welcome <span className='font-bold'>{admin.name}</span> </p>
                <p className='text-black/60'>{admin.email}</p>
            </div>

            <div className='flex w-full flex-1 '>
                <div className='border border-r-0 border-black/10 overflow-hidden min-w-[130px] flex flex-col items-end gap-2 py-17  text-[12px] md:w-[250px] md:text-sm'>
                    <div className='border bg-orange-500 hover:bg-orange-600 cursor-pointer text-white w-[95%] px-3 md:px-5 py-1 rounded-[3px] border-r-0 -mr-2'>Dashboard</div>

                    <div
                        onClick={() => setShowUsers(true)}
                        className='border bg-orange-500 hover:bg-orange-600 cursor-pointer text-white w-[95%] px-3 md:px-5 py-1 rounded-[3px] border-r-0 -mr-2'>Users
                    </div>
                    <div
                        className='border bg-orange-500 hover:bg-orange-600 cursor-pointer text-white w-[95%] px-3 md:px-5 py-1 rounded-[3px] border-r-0 -mr-2'>Orders
                    </div>
                    <div
                        className='border bg-orange-500 hover:bg-orange-600 cursor-pointer text-white w-[95%] px-3 md:px-5 py-1 rounded-[3px] border-r-0 -mr-2'>Change Password
                    </div>
                </div>

                <div className='border border-black/10 w-full p-4 md:p-5 lg:pl-9'>
                    <div className='w-full'>
                        {
                            showUsers ? (
                                <ShowUsersTable />
                            ) : null
                        }
                    </div>

                </div>

            </div>
            <button
                onClick={handleLogOut}
                className='cursor-pointer max-w-max bg-orange-500 text-white rounded-full px-4 text-nowrap py-1 md:px-6 hover:bg-orange-600'
            >Log out</button>

        </section>
    )
}

export default AdminPage