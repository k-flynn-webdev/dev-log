import * as React from 'react'
import { useEffect } from 'react'
import { useToast } from '@chakra-ui/react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { USER_TOKEN, setStorageAccessToken, getStorageAccessToken } from '../helpers/authentication';
import { useSelector, useDispatch } from 'react-redux'
import { reset, update } from '../store/slices/user'


function useUserMount() {
	const dispatch = useDispatch()
	const [searchParams, setSearchParams] = useSearchParams();
	const accessTokenURL = searchParams.get(USER_TOKEN)
	const accessTokenKey = getStorageAccessToken();
	const location = useLocation();

	const toast = useToast({
    position: 'top',
    title: 'Login was successful.'
  })

	// grab access token from URL
	useEffect(() => {
		if (accessTokenURL && accessTokenURL.length) {
			setStorageAccessToken(accessTokenURL)
			searchParams.delete(USER_TOKEN);
			setSearchParams(searchParams)
			console.log('access token detected')
		}
	}, [location, searchParams])

	// set user up in redux
	useEffect(() => {
		if (accessTokenKey && accessTokenKey.length) {
			// call API
			// update store
			dispatch(update({ id: accessTokenKey }))
			console.log('call user API')
		}
	}, [accessTokenKey])

	return null
}

export default useUserMount;
