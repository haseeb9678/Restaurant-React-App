import React, { useContext, useState } from 'react'
import { PiEyeSlash } from "react-icons/pi";
import { PiEyeLight } from "react-icons/pi";
import { AdminInfoContext } from '../contexts/adminInfo';
import { toast } from 'react-toastify';


const AdminValidatePassword = ({ setValidate }) => {
    const { admin } = useContext(AdminInfoContext)
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [warn, setWarn] = useState({
        status: false,
        msg: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const password = formData.get("password")
        if (password == '') {
            setWarn({ status: true, msg: "Please enter password" })
            return
        }
        setLoading(true)
        setTimeout(() => {
            if (password == admin.password) {
                setValidate(true)
            } else {
                setWarn({ status: true, msg: "Incorrect Password" })
                toast.error(
                    <span>
                        Incorrect Password
                    </span>
                )
            }
            setLoading(false)
        }, 3000)

    }

    const toogleShow = () => {
        setShow(prev => !prev)
    }
    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-6 bg-white px-4 py-5 rounded-2xl shadow-lg w-[70%] max-w-md md:mx-auto"
        >
            <label htmlFor="password" className="w-full flex flex-col gap-2">
                <p className="font-medium text-gray-700">Enter Password:</p>
                <div
                    className={`flex items-center border rounded-lg px-3 py-2 w-full ${warn.status ? "border-red-500" : "border-gray-300"
                        }`}
                >
                    <input
                        onChange={() => setWarn({ status: false, msg: "" })}
                        className="w-full border-none outline-none bg-transparent text-gray-800"
                        type={show ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="••••••"
                    />
                    <span
                        className="cursor-pointer text-gray-500 hover:text-gray-700"
                        onClick={toogleShow}
                    >
                        {show ? <PiEyeSlash size={20} /> : <PiEyeLight size={20} />}
                    </span>
                </div>
                {warn.status && (
                    <p className="text-sm text-red-500 mt-1">{warn.msg}</p>
                )}
            </label>

            <button
                disabled={loading}
                type="submit"
                className={`flex justify-center items-center ${loading ? "bg-black/50 cursor-not-allowed" : "bg-black/80 hover:bg-black cursor-pointer"}  text-white font-semibold px-6 py-2 rounded-lg w-full`}
            >
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
                        Verifying
                    </>
                ) : "Verify"}
            </button>
        </form>

    )
}

export default AdminValidatePassword