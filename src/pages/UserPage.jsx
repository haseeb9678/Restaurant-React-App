import React, { useContext, useState } from 'react'
import { UserInfoContext } from '../contexts/userInfo'
import { useNavigate } from 'react-router-dom'
import ChangePassword from '../components/ChangePassword'
import UserDashboard from '../components/UserDashboard'

const UserPage = () => {
    const { loggedUser, removeLoggedUser } = useContext(UserInfoContext)
    const { cartItems, orderItems, setCartItems, setOrderItems } = useContext(UserInfoContext)
    const [showPasswordChangeComp, setShowPasswordChangeComp] = useState(false)
    const [show, setShow] = useState("dash")
    const navigate = useNavigate()

    React.useEffect(() => {
        if (!loggedUser) {
            navigate('/')
        }
    }, [loggedUser])

    React.useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [])

    const tooglePasswordChangeComp = () => {
        setShowPasswordChangeComp(prev => !prev)
    }

    const handleLogOut = () => {
        removeLoggedUser()
        setCartItems(prev => [])
        setOrderItems(prev => [])
        localStorage.removeItem("cartItems")
        localStorage.removeItem("orderItems")
    }
    console.log(loggedUser);

    if (!loggedUser) {
        return <section>User not found...</section>
    }

    return (
        <section className='flex flex-col gap-5 h-[80vh] overflow-x-scroll scrollbar-hide'>
            <div className='flex flex-col'>
                <p className='text-lg md:text-xl'>Welcome <span className='font-bold'>{loggedUser.name}</span> </p>
                <p className='text-black/60'>{loggedUser.email}</p>
            </div>

            <div className='flex w-full flex-1 '>
                <div className='border border-r-0 border-black/30 overflow-hidden min-w-[130px] flex flex-col items-end gap-2 py-17  text-[12px] md:w-[250px] md:text-sm'>
                    <div
                        onClick={() => setShow("dash")}
                        className='border bg-orange-500 hover:bg-orange-600 cursor-pointer text-white w-max px-3 md:px-5 py-1 rounded-[3px] border-r-0 -mr-2'>Dashboard</div>

                    <div
                        onClick={() => setShow("changeP")}
                        className='border bg-orange-500 hover:bg-orange-600 cursor-pointer text-white w-max px-3 md:px-5 py-1 rounded-[3px] border-r-0 -mr-2'>Change Password
                    </div>
                </div>

                <div className='border border-black/30 w-full p-4 md:p-5 lg:pl-9'>
                    <div className='w-full py-9'>
                        {
                            show == 'dash' ? (
                                <UserDashboard />
                            ) : (
                                show == 'changeP' ? (
                                    <ChangePassword />
                                ) : <p>'unexpected error comes'</p>
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

export default UserPage