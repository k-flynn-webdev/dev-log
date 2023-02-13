
import { useState } from 'react';
import ShowList from './Components/ShowList';
import SearchBar from './Components/SearchBar';

import searchShows from './plugins/http.js'


function App() {
	const [input, setInput ] = useState('');
	const [tvShows, setTVShows ] = useState([]);
	const [isLoading, setLoading ] = useState(false);

	const handleSubmit = async (term) => {
		if (isLoading) return

		setLoading(true)

		try {
			setInput(term)
			const results = await searchShows(term)
			handleList(results)
		} catch(error) {
			console.log(error)
		}

		setLoading(false)
	}

	const handleList = (data) => {
		if (!data) return


		setTVShows(data)
	}

	return (
		<div className="flex justify-center bg-gray-100">
			<div
					className="container mt-4 my-auto max-w-xl border-2 border-gray-200 p-3 bg-white">

				<div className="text-center m-6">
					<h1 className="text-3xl font-semibold text-gray-700">Search TV Shows</h1>
				</div>

				<div className="m-6">
					<SearchBar onSubmit={handleSubmit} isLoading={isLoading} />
					<ShowList tvShows={tvShows} />
				</div>
			</div>
		</div>
	);
}

export default App;