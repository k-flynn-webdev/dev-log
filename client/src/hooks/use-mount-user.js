import * as React from 'react'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../store/slices/user'
import { getStorageAccessToken } from '../helpers/authentication';
import { useEffect, useRef } from 'react';
import { authSet } from '../plugins/http';
import { useToast } from '@chakra-ui/react';



function useMountUser() {
	const dispatch = useDispatch()
	const effectRan = useRef(false)
	const accessTokenKey = getStorageAccessToken()

	const errToast = (err) => {
		console.log(err)
		// useToast({
		// 	position: 'top',
		// 	title: err.message,
		// 	isClosable: true,
		// });
	}

	useEffect(() => {
		if (!effectRan.current) {
			if (accessTokenKey && accessTokenKey.length) {
				authSet(accessTokenKey);
				dispatch(fetchUser())
					.catch((err) => errToast(err))

				return () => { effectRan.current = true; }
			}
		}
	}, [])

	return null
}

export default useMountUser;
