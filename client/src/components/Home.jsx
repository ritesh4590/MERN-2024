import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../redux/Auth/userSlice'

const Home = () => {
	const [token, setToken] = useState(localStorage.getItem("token"))
	const [name, setName] = useState('')
	const [isloading, setIsLoading] = useState(true)
	const dispatch = useDispatch()

	const { userData } = useSelector((state) => state.user.data)


	useEffect(() => {
		const getUser = async () => {
			const { payload } = await dispatch(fetchUser({ token }))
			if (payload) {
				setName(payload.userData.username)
				setIsLoading(false)
			}
		}
		getUser()
	}, [])

	return (
		<div className='page-container'>
			{isloading === false ?
				<h1>welcome{' '}{name}</h1>
				: 'Welcome'
			}
		</div>
	)
}

export default Home
