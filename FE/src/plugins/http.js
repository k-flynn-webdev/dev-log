import axios from 'axios';

const TV_API =  'https://api.tvmaze.com/search/'

const searchShows = async (input) => {
	const res = await axios.get(`${TV_API}shows?q=${input}`, { headers: {}, params: { query : null }})
	return res.data;
}

export default searchShows;