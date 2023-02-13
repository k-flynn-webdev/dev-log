function SearchBar({ onSubmit, isLoading }) {
	const defaultClass = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
	const inputClass = `${defaultClass} ${isLoading ? 'border-rose-600' : ''}`;

	const handleFormSubmit = (event) => {
		event.preventDefault();
		onSubmit(event.target.search.value)
	}

	return (
		<form onSubmit={handleFormSubmit}>
			<div className="mb-4">
				<input type="text" name="search" id="search"
							 className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"/>
			</div>
		</form>
	)
}

export default SearchBar;