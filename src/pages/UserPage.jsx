import React, { useContext, useState } from 'react'
import { UserInfoContext } from '../contexts/userInfo'
import { useNavigate } from 'react-router-dom'
import ChangePassword from '../components/ChangePassword'
import UserDashboard from '../components/UserDashboard'
import { toast } from 'react-toastify'

const UserPage = () => {
    const { loggedUser, removeLoggedUser } = useContext(UserInfoContext)
    const [show, setShow] = useState("dash")
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

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

    const handleLogOut = () => {
        setLoading(true)
        setTimeout(() => {
            removeLoggedUser()
            toast.success("Logged out successfully 👋");
            setLoading(false)
        }, 2000)
    }

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
                        className={`border  ${show == 'dash' ? "bg-orange-100/20 text-orange-600 border-l-orange-500 border-l-5" : "bg-orange-500 hover:bg-orange-600 text-white"} cursor-pointer  w-[95%] px-3 md:px-5 py-1 rounded-[3px] border-r-0 -mr-2`}>Dashboard</div>

                    <div
                        onClick={() => setShow("changeP")}
                        className={`border  ${show == 'changeP' ? "bg-orange-100/20 text-orange-600 border-l-orange-500 border-l-5" : "bg-orange-500 hover:bg-orange-600 text-white"} cursor-pointer  w-[95%] px-3 md:px-5 py-1 rounded-[3px] border-r-0 -mr-2`}>Change Password
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

export default UserPage