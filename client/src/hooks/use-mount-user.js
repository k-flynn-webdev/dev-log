import * as React from 'react'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../store/slices/user'
import { getStorageAccessToken } from '../helpers/authentication';
import { useEffect, useRef } from 'react';
import { authSet } from '../plugins/http';


function useMountUser() {
	const dispatch = useDispatch()
	const effectRan = useRef(false)
	const accessTokenKey = getStorageAccessToken()

	useEffect(() => {
		if (!effectRan.current) {
			if (accessTokenKey && accessTokenKey.length) {
				authSet(accessTokenKey);
				dispatch(fetchUser())

				return () => { effectRan.current = true; }
			}
		}
	}, [])

	return null
}

export default useMountUser;
