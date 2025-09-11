import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { AdminInfoContext } from '../contexts/adminInfo'
import ShowUsersTable from '../components/ShowUsersTable'
import AdminOrderRecords from '../components/AdminOrderRecords'
import AdminFoodItems from '../components/AdminFoodItems'
import AdminDashboard from '../components/AdminDashboard'
import { toast } from 'react-toastify'
import AdminOrders from '../components/AdminOrders'
import AdminUpdateItem from '../components/AdminUpdateItem'
import AdminAddItem from '../components/AdminAddItem'

const AdminPage = () => {
    const { loggedIn, admin, removeLoggedAdmin } = useContext(AdminInfoContext)
    const [show, setShow] = useState("dash")
    const [dashFilter, setDashFilter] = useState("all")
    const [item, setItem] = useState(null)
    const { setHideNav } = useOutletContext()
    const [loading, setLoading] = useState(false)
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
        setLoading(true)
        setTimeout(() => {
            removeLoggedAdmin()
            toast.success("Logged out successfully 👋");
            navigate('/')
            setLoading(false)
        }, 2000)
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
                        onClick={() => toogleShow("dash")}
                        className={`border  ${show == 'dash' ? "bg-orange-100/20 text-orange-600 border-l-orange-500 border-l-5" : "bg-orange-500 hover:bg-orange-600 text-white"} cursor-pointer  w-[95%] px-3 md:px-5 py-1 rounded-[3px] border-r-0 -mr-2`}>Dashboard
                    </div>
                    <div
                        onClick={() => toogleShow("users")}
                        className={`border  ${show == 'users' ? "bg-orange-100/20 text-orange-600 border-l-orange-500 border-l-5" : "bg-orange-500 hover:bg-orange-600 text-white"} cursor-pointer  w-[95%] px-3 md:px-5 py-1 rounded-[3px] border-r-0 -mr-2`}>Users
                    </div>
                    <div
                        onClick={() => toogleShow("orders")}
                        className={`border  ${show == 'orders' ? "bg-orange-100/20 text-orange-600 border-l-orange-500 border-l-5" : "bg-orange-500 hover:bg-orange-600 text-white"} cursor-pointer  w-[95%] px-3 md:px-5 py-1 rounded-[3px] border-r-0 -mr-2`}>Orders
                    </div>
                    <div
                        onClick={() => toogleShow("activeOrders")}
                        className={`border  ${show == 'activeOrders' ? "bg-orange-100/20 text-orange-600 border-l-orange-500 border-l-5" : "bg-orange-500 hover:bg-orange-600 text-white"} cursor-pointer  w-[95%] px-3 md:px-5 py-1 rounded-[3px] border-r-0 -mr-2`}>Active Orders
                    </div>
                    <div
                        onClick={() => toogleShow("addItem")}
                        className={`border  ${show == 'addItem' ? "bg-orange-100/20 text-orange-600 border-l-orange-500 border-l-5" : "bg-orange-500 hover:bg-orange-600 text-white"} cursor-pointer  w-[95%] px-3 md:px-5 py-1 rounded-[3px] border-r-0 -mr-2`}>Add Item
                    </div>
                    <div
                        onClick={() => toogleShow("items")}
                        className={`border  ${show == 'items' ? "bg-orange-100/20 text-orange-600 border-l-orange-500 border-l-5" : "bg-orange-500 hover:bg-orange-600 text-white"} cursor-pointer  w-[95%] px-3 md:px-5 py-1 rounded-[3px] border-r-0 -mr-2`}>Food Items
                    </div>

                </div>

                <div className='border border-black/30 w-full p-4 md:p-5 lg:pl-9'>
                    <div className='w-full py-9'>
                        {
                            show == 'users' ? (
                                <ShowUsersTable />
                            ) : (
                                show == 'activeOrders' ? (
                                    <AdminOrderRecords />
                                ) : (
                                    show == 'items' ? (
                                        <AdminFoodItems setShow={setShow} setItem={setItem} />
                                    ) : show == 'dash' ? (
                                        <AdminDashboard setShow={setShow} setDashFilter={setDashFilter} />
                                    ) : show == 'orders' ? (
                                        <AdminOrders dashFilter={dashFilter} />
                                    ) : show == 'updateItem' ? (
                                        <AdminUpdateItem setShow={setShow} item={item} />
                                    ) : show == 'addItem' ? (
                                        <AdminAddItem />
                                    ) : null
                                )
                            )
                        }
                    </div>

                </div>

            </div>
            <button
                type='submit'
                disabled={loading}
                onClick={handleLogOut}
                className={`flex ${loading ? "cursor-not-allowed bg-orange-400" : "bg-orange-500  hover:bg-orange-600 cursor-pointer"} justify-center items-center  mt-5  text-white rounded-full px-3 py-1 w-20 min-w-max md:px-7 md:py-2`}>
                {loading ? (
                    <>
                        <svg
                            className="animate-spin h-5 w-5 text-white mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                        </svg>
                        Loging out..
                    </>
                ) : "Log out"}
            </button>

        </section>
    )
}

export default AdminPage