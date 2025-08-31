import React, { useContext, useState } from 'react'
import { PiEyeSlash } from "react-icons/pi";
import { PiEyeLight } from "react-icons/pi";
import { UserInfoContext } from '../contexts/userInfo';

const ChangePassword = () => {
    const { loggedUser, updateUser } = useContext(UserInfoContext)
    const [oldPasswordHide, setOldPasswordHide] = useState(true)
    const [newPasswordHide, setNewPasswordHide] = useState(true)
    const [errors, setErrors] = useState({})

    const toogleNewPasswordHide = () => {
        setNewPasswordHide(prev => !prev)
    }
    const toogleOldPasswordHide = () => {
        setOldPasswordHide(prev => !prev)
    }

    const newPasswordValidation = (passwordValue, errors) => {
        const specialCharRegex = /[!@#$%^&*+(),.?":{}|<>]/
        const capitalLetterRegex = /[A-Z]/;
        const smallLetterRegex = /[a-z]/;
        const digitRegex = /[0-9]/
        if (passwordValue.length < 5 || passwordValue.length > 15) {
            errors.newPassword = 'Password must be 5 to 15 characters long.'
        }
        else if (!specialCharRegex.test(passwordValue)) {
            errors.newPassword = 'Password must include at least one special character (e.g., !@#$%^&*+).'
        }
        else if (!capitalLetterRegex.test(passwordValue)) {
            errors.newPassword = 'Password must include at least one uppercase letter (A–Z).'
        }
        else if (!smallLetterRegex.test(passwordValue)) {
            errors.newPassword = 'Password must include at least one lowercase letter (a–z).'
        }
        else if (!digitRegex.test(passwordValue)) {
            errors.newPassword = 'Password must include at least one number (0–9).'
        } else {
            return true
        }

        return false
    }
    const oldPasswordValidation = (passwordValue, errors) => {
        if (!passwordValue.length > 0) {
            errors.oldPassword = 'Please enter old password'
            return false
        }

        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const oldPasswordValue = formData.get("oldPassword")
        const newPasswordValue = formData.get("newPassword")

        let newError = {}

        const newValidation = newPasswordValidation(newPasswordValue, newError)
        const oldValidation = oldPasswordValidation(oldPasswordValue, newError)

        if (newValidation && oldValidation) {
            if (oldPasswordValue == loggedUser.password) {
                console.log('pass');
                loggedUser.password = newPasswordValue
                updateUser(loggedUser)
            } else {
                newError.oldPassword = 'Password does not matched'
            }
        }
        setErrors(newError)
    }

    return (
        <div className='flex flex-col gap-10 w-full'>
            <h2 className='font-bold text-lg md:text-2xl'>Change Password</h2>
            <form onSubmit={handleSubmit} className='w-full flex flex-col gap-3'>
                <label htmlFor="oldPassword" className='w-full flex items-center gap-3 flex-wrap '>
                    <h2 className='w-32 font-semibold'>Old Password:</h2>
                    <div>
                        <div className={`flex flex-row-reverse min-w-20 md:min-w-25 justify-between items-center border-b-2 ${errors.oldPassword ? 'border-b-red-500/70' : 'border-b-black/30 focus-within:border-b-black/80'}`}>
                            <span onClick={toogleOldPasswordHide} className='text-lg'> {
                                oldPasswordHide ? <PiEyeLight /> : <PiEyeSlash />}</span>
                            <input
                                className=' outline-none w-full' type={oldPasswordHide ? "password" : "text"} name="oldPassword" id="oldPassword" placeholder='Old password' />
                        </div>
                        {
                            errors.oldPassword ? (
                                <p className='text-red-600 text-[10px] md:text-[12px]'>{errors.oldPassword}</p>
                            ) : null
                        }
                    </div>


                </label>


                <label htmlFor="newPassword" className='w-full flex items-center gap-3 flex-wrap '>
                    <h2 className='w-32 font-semibold'>New Password:</h2>
                    <div>
                        <div className={`flex flex-row-reverse min-w-20 md:min-w-25 justify-between items-center border-b-2 ${errors.newPassword ? 'border-b-red-500/70' : 'border-b-black/30 focus-within:border-b-black/80'}`}>
                            <span onClick={toogleNewPasswordHide} className='text-lg'> {
                                newPasswordHide ? <PiEyeLight /> : <PiEyeSlash />}</span>
                            <input
                                className=' outline-none w-full' type={newPasswordHide ? "password" : "text"} name="newPassword" id="newPassword" placeholder='New password' />
                        </div>
                        {
                            errors.newPassword ? (
                                <p className='text-red-600 text-[10px] md:text-[12px]'>{errors.newPassword}</p>
                            ) : null
                        }
                    </div>


                </label>

                <button
                    className='cursor-pointer max-w-max bg-orange-500 text-white rounded-full px-2 text-nowrap py-1 mt-5 md:px-6 hover:bg-orange-600'
                >Change Password</button>
            </form>
        </div>
    )
}

export default ChangePassword