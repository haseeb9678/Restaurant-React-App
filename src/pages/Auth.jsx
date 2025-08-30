import React, { useContext, useEffect, useState } from 'react'
import { UserInfoContext } from '../contexts/userInfo'
import { useOutletContext } from 'react-router-dom'

const Auth = () => {
    const { user, setUser, logedIn, setLogedIn } = useContext(UserInfoContext)
    const [signIn, setSignIn] = useState(true)
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState({})
    const { setHideNav } = useOutletContext()

    useEffect(() => {
        setHideNav(true)

        return () => setHideNav(false)
    }, [])

    const allClear = () => {
        setName('')
        setEmail('')
        setPassword('')
    }

    const toogleSignIn = () => {
        allClear()
        setErrors({})
        setSignIn(prev => !prev)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        let newErrors = {}


        if (!formData.get("email").includes('@')) {
            newErrors.email = 'Invalid email'
        } else if (formData.get("email").includes('@')) {
            setEmail(formData.get("email"))
        }

        if (formData.get("password").length < 5 || formData.get("password").length > 8) {
            newErrors.password = 'Password length must be between 5-8'
        } else {
            setPassword(formData.get("password"))
        }
        if (formData.get("name") == '') {

            if (formData.get("name").length < 5 || formData.get("name").length > 10) {
                newErrors.name = 'Name length must be between 5-10'
            } else {
                setName(formData.get("name"))
            }
        }

        setErrors(newErrors)

    }

    return (
        <section className='mx-auto mt-20 min-w-[250px] w-[70%] max-w-[420px] lg:max-w-[500px] rounded-lg border-t-3 border-orange-500 shadow-md px-3 py-5 flex flex-col gap-12 items-center'>
            <h2 className='font-bold mt-3 text-2xl md:text-3xl'>{signIn ? "Sign In" : "Sign Up"}</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-7 items-center justify-center w-[80%]'>
                {
                    signIn ? (
                        <>
                            <label htmlFor="email" className='w-full flex flex-col gap-2'>
                                <input
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        if (errors.email) {
                                            setErrors(prev => ({ ...prev, email: undefined }))
                                        }
                                    }}
                                    className={`border-b-2 ${errors.email ? 'border-b-red-500/70' : 'border-b-black/30 focus:border-b-black/80'}   outline-none w-full`} type="email" name="email" id="email" placeholder='Enter your email...' />
                                {errors.email && <p className='text-red-600 text-[10px] md:text-[12px]'>{errors.email}</p>}
                            </label>

                            <label htmlFor="password" className='w-full flex flex-col gap-2'>
                                <input
                                    autoComplete='off'
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                        if (errors.password) {
                                            setErrors(prev => ({ ...prev, password: undefined }))
                                        }
                                    }}
                                    className={`border-b-2 ${errors.password ? 'border-b-red-500/70' : 'border-b-black/30 focus:border-b-black/80'}   outline-none w-full`} type="password" name="password" id="password" placeholder='Enter your password...' />
                                {errors.password && <p className='text-red-600 text-[10px] md:text-[12px]'>{errors.password}</p>}
                            </label>


                            <button
                                type='submit'
                                className='cursor-pointer mt-5 bg-orange-500 text-white rounded-full px-2 py-1 w-[40%] md:px-6 md:py-2 hover:bg-orange-600'>Sign in</button>
                        </>

                    ) : (
                        <>
                            <label htmlFor="name" className='w-full flex flex-col gap-2'>
                                <input
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value)
                                        if (errors.name) {
                                            setErrors(prev => ({ ...prev, name: undefined }))
                                        }
                                    }}
                                    className={`border-b-2 ${errors.name ? 'border-b-red-500/70' : 'border-b-black/30 focus:border-b-black/80'}   outline-none w-full`} type="text" name="name" id="name" maxLength={15} minLength={3} placeholder='Enter your name...' />
                                {errors.name && <p className='text-red-600 text-[10px] md:text-[12px]'>{errors.name}</p>}
                            </label>

                            <label htmlFor="email" className='w-full flex flex-col gap-2'>
                                <input
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        if (errors.email) {
                                            setErrors(prev => ({ ...prev, email: undefined }))
                                        }
                                    }}
                                    className={`border-b-2 ${errors.email ? 'border-b-red-500/70' : 'border-b-black/30 focus:border-b-black/80'}   outline-none w-full`} type="email" name="email" id="email" placeholder='Enter your email...' />
                                {errors.email && <p className='text-red-600 text-[10px] md:text-[12px]'>{errors.email}</p>}
                            </label>

                            <label htmlFor="password" className='w-full flex flex-col gap-2'>
                                <input
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                        if (errors.password) {
                                            setErrors(prev => ({ ...prev, password: undefined }))
                                        }
                                    }}
                                    className={`border-b-2 ${errors.password ? 'border-b-red-500/70' : 'border-b-black/30 focus:border-b-black/80'}   outline-none w-full`} type="password" name="password" id="password" placeholder='Enter your password...' />
                                {errors.password && <p className='text-red-600 text-[10px] md:text-[12px]'>{errors.password}</p>}
                            </label>

                            <button
                                type='submit'
                                className='cursor-pointer mt-5 bg-orange-500 text-white rounded-full px-2 py-1 w-[40%] md:px-6 md:py-2 hover:bg-orange-600'>Sign in</button>
                        </>
                    )
                }
                <span>{
                    signIn ? (
                        <p className='text-[13px] md:text-base text-nowrap'>Don't have an account <span onClick={toogleSignIn} className='font-semibold underline cursor-pointer hover:decoration-black hover:decoration-2 text-orange-500'>signUp</span> here</p>
                    ) : (
                        <p className='text-[13px] md:text-base text-nowrap'>Already have an account <span onClick={toogleSignIn} className='font-semibold underline cursor-pointer hover:decoration-black hover:decoration-2 text-orange-500'>signIn</span> here</p>
                    )
                }</span>
            </form>


        </section >
    )
}

export default Auth