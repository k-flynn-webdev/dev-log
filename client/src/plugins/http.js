import axios from 'axios';

const BASE_API =  'https://localhost/api/'

const apiGet = async (params) => {
	const res = await axios.get(`${BASE_API}/resource`, { headers: {}, ...params })
	return res.data;
}

export default apiGet;