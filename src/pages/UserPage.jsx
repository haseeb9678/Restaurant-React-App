import React, { useContext, useState } from 'react'
import { UserInfoContext } from '../contexts/userInfo'
import { useNavigate } from 'react-router-dom'
import ChangePassword from '../components/ChangePassword'

const UserPage = () => {
    const { loggedUser, removeLoggedUser } = useContext(UserInfoContext)
    const [showPasswordChangeComp, setShowPasswordChangeComp] = useState(false)
    const navigate = useNavigate()

    const tooglePasswordChangeComp = () => {
        setShowPasswordChangeComp(prev => !prev)
    }

    const handleLogOut = () => {
        removeLoggedUser()
        navigate('/')
    }
    console.log(loggedUser);

    if (!loggedUser) {
        return <section>User not found...</section>
    }

    return (
        <section className='flex flex-col gap-5 h-[80vh]'>
            <p className='text-lg md:text-xl'>Welcome <span className='font-bold'>{loggedUser.name}</span> </p>
            <div className='flex w-full flex-1 '>
                <div className='border border-r-0 border-black/10 overflow-hidden min-w-[150px] flex flex-col items-end gap-2 py-17  text-[12px] md:w-[250px] md:text-sm'>
                    <div className='border bg-orange-500 hover:bg-orange-600 cursor-pointer text-white w-max px-3 md:px-5 py-1 rounded-[3px] border-r-0 -mr-2'>Dashboard</div>

                    <div
                        onClick={tooglePasswordChangeComp}
                        className='border bg-orange-500 hover:bg-orange-600 cursor-pointer text-white w-max px-3 md:px-5 py-1 rounded-[3px] border-r-0 -mr-2'>Change Password
                    </div>
                </div>

                <div className='border border-black/10 w-full p-5'>
                    <div className='w-full'>
                        {
                            showPasswordChangeComp ? (
                                <ChangePassword />
                            ) : null
                        }
                    </div>

                </div>

            </div>
            <button
                onClick={handleLogOut}
                className='cursor-pointer max-w-max bg-orange-500 text-white rounded-full px-2 text-nowrap py-1 md:px-6 hover:bg-orange-600'
            >Log out</button>

        </section>
    )
}

export default UserPage