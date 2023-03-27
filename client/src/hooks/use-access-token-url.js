import * as React from 'react'
import { useEffect, useRef } from 'react';
import { useToast } from '@chakra-ui/react';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { USER_TOKEN, setStorageAccessToken } from '../helpers/authentication';
import { authSet } from "../plugins/http";
import { useDispatch } from 'react-redux';
import { fetchUser } from '../store/slices/user'
import { LOGIN_SUCCESS } from '../lang/en-gb'

function useWatchURLToken() {
	const dispatch = useDispatch()
	const navigate = useNavigate();
	const effectRan = useRef(false)
	const location = useLocation()
	const [searchParams, setSearchParams] = useSearchParams()
	const accessTokenURL = searchParams.get(USER_TOKEN)

	const successToast = useToast({
		position: 'top',
		title: LOGIN_SUCCESS,
		isClosable: true,
		duration: 2500
	})

	useEffect(() => {
		if (!effectRan.current) {
			if (accessTokenURL && accessTokenURL.length) {
				authSet(accessTokenURL);
				setStorageAccessToken(accessTokenURL);

				searchParams.delete(USER_TOKEN);
				setSearchParams(searchParams);

				dispatch(fetchUser())
				.then(() => {
					successToast();
					navigate('/');
				})

				return () => { effectRan.current = true; }
			}
		}
	}, [location, searchParams])

	return null
}

export default useWatchURLToken;
