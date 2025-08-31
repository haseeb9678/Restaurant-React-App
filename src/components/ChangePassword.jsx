import React, { useState } from 'react'
import { PiEyeSlash } from "react-icons/pi";
import { PiEyeLight } from "react-icons/pi";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [oldPasswordHide, setOldPasswordHide] = useState(true)
    const [newPasswordHide, setNewPasswordHide] = useState(true)
    const [errors, setErrors] = useState('')

    const toogleNewPasswordHide = () => {
        setNewPasswordHide(prev => !prev)
    }
    const toogleOldPasswordHide = () => {
        setOldPasswordHide(prev => !prev)
    }

    const passwordValidation = (passwordValue, newErrors) => {
        const specialCharRegex = /[!@#$%^&*+(),.?":{}|<>]/
        const capitalLetterRegex = /[A-Z]/;
        const smallLetterRegex = /[a-z]/;
        const digitRegex = /[0-9]/
        if (passwordValue.length < 5 || passwordValue.length > 15) {
            newErrors.password = 'Password must be 5 to 15 characters long.'
        }
        else if (!specialCharRegex.test(passwordValue)) {
            newErrors.password = 'Password must include at least one special character (e.g., !@#$%^&*+).'
        }
        else if (!capitalLetterRegex.test(passwordValue)) {
            newErrors.password = 'Password must include at least one uppercase letter (A–Z).'
        }
        else if (!smallLetterRegex.test(passwordValue)) {
            newErrors.password = 'Password must include at least one lowercase letter (a–z).'
        }
        else if (!digitRegex.test(passwordValue)) {
            newErrors.password = 'Password must include at least one number (0–9).'
        }

        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className='flex flex-col gap-10 w-full'>
            <h2 className='font-bold text-lg md:text-2xl'>Change Password</h2>
            <form action="" className='w-full flex flex-col gap-3'>
                <label htmlFor="oldPassword" className='w-full flex items-center gap-3 flex-wrap '>
                    <h2 className='w-32'>Old Password:</h2>
                    <div className={`flex flex-row-reverse min-w-20 md:min-w-25 justify-between items-center border-b-2 ${errors.password ? 'border-b-red-500/70' : 'border-b-black/30 focus-within:border-b-black/80'}`}>
                        <span onClick={toogleOldPasswordHide} className='text-lg'> {
                            oldPasswordHide ? <PiEyeLight /> : <PiEyeSlash />}</span>
                        <input
                            value={oldPassword}
                            onChange={(e) => {
                                setOldPassword(e.target.value)
                            }}
                            className=' outline-none w-full' type={oldPasswordHide ? "password" : "text"} name="oldPassword" id="oldPassword" placeholder='Old password' />
                    </div>

                </label>
                <label htmlFor="newPassword" className='w-full flex items-center gap-3 flex-wrap '>
                    <h2 className='w-32'>New Password:</h2>
                    <div className={`flex flex-row-reverse min-w-20 md:min-w-25 justify-between items-center border-b-2 ${errors.password ? 'border-b-red-500/70' : 'border-b-black/30 focus-within:border-b-black/80'}`}>
                        <span onClick={toogleNewPasswordHide} className='text-lg'> {
                            newPasswordHide ? <PiEyeLight /> : <PiEyeSlash />}</span>
                        <input
                            value={newPassword}
                            onChange={(e) => {
                                setNewPassword(e.target.value)
                            }}
                            className=' outline-none w-full' type={newPasswordHide ? "password" : "text"} name="newPassword" id="newPassword" placeholder='New password' />
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