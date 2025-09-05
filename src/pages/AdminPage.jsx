import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { AdminInfoContext } from '../contexts/adminInfo'
import ShowUsersTable from '../components/ShowUsersTable'
import AdminOrderRecords from '../components/AdminOrderRecords'
import AdminFoodItems from '../components/AdminFoodItems'
import { toast } from 'react-toastify'

const AdminPage = () => {
    const { loggedIn, admin, removeLoggedAdmin } = useContext(AdminInfoContext)
    const [show, setShow] = useState("table")
    const { setHideNav } = useOutletContext()
    const navigate = useNavigate()
    useEffect(() => {
        setHideNav(true)
        return () => setHideNav(false)
    }, [])

    const toogleShow = (value) => {
        setShow(value)
    }

    if (!loggedIn) {
        return <section className='flex flex-col gap-5 h-[80vh]'>
            <h2 className='font-bold text-xl md:text-2xl'>ADMIN PANEL</h2>
            <div className='flex flex-col'>
                <p className='text-base md:text-xl'>Admin Data not found</p>
            </div>
        </section>
    }

    const handleLogOut = () => {
        removeLoggedAdmin()
        toast.success("Logged out successfully 👋");
        navigate('/')
    }

    return (
        <section className='flex flex-col gap-5 h-[80vh] overflow-scroll scrollbar-hide'>
            <h2 className='font-bold text-xl md:text-2xl'>ADMIN PANEL</h2>
            <div className='flex flex-col'>
                <p className='text-lg md:text-xl'>Welcome <span className='font-bold'>{admin.name}</span> </p>
                <p className='text-black/60'>{admin.email}</p>
            </div>

            <div className='flex w-full flex-1'>
                <div className='border border-r-0 border-black/30 overflow-hidden min-w-[130px] flex flex-col items-end gap-2 py-17  text-[12px] md:w-[250px] md:text-sm'>
                    <div
                        onClick={() => toogleShow("table")}
                        className='border bg-orange-500 hover:bg-orange-600 cursor-pointer text-white w-[95%] px-3 md:px-5 py-1 rounded-[3px] border-r-0 -mr-2'>Users
                    </div>
                    <div
                        onClick={() => toogleShow("orderRecords")}
                        className='border bg-orange-500 hover:bg-orange-600 cursor-pointer text-white w-[95%] px-3 md:px-5 py-1 rounded-[3px] border-r-0 -mr-2'>Orders
                    </div>
                    <div
                        onClick={() => toogleShow("items")}
                        className='border bg-orange-500 hover:bg-orange-600 cursor-pointer text-white w-[95%] px-3 md:px-5 py-1 rounded-[3px] border-r-0 -mr-2'>Food Items
                    </div>

                </div>

                <div className='border border-black/30 w-full p-4 md:p-5 lg:pl-9'>
                    <div className='w-full py-9'>
                        {
                            show == 'table' ? (
                                <ShowUsersTable />
                            ) : (
                                show == 'orderRecords' ? (
                                    <AdminOrderRecords />
                                ) : (
                                    show == 'items' ? (
                                        <AdminFoodItems />
                                    ) : null
                                )
                            )
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