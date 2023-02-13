const getImage = (input) => {
	if (!input || !input.image) return ""
	const keys = ['small', 'medium', 'large', 'original']
	const imageKey = keys.find((key) => input.image && input.image[key] && input.image[key].length > 0)
	return imageKey ? input.image[imageKey] : ""
}

const getTags = (input) => {
	if (!input || !input.genres) return null
	const classNames = "inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
	return input.genres.map((genre) => <span key={genre} className={classNames}>#{genre}</span>)
}

function ImageShow({ show }) {
	return (
	<div className="rounded overflow-hidden shadow-lg mb-6">
		<img className="w-full" src={getImage(show)} />
			<div className="px-6 py-4">
				<div className="font-bold text-xl mb-2">{ show.name }</div>
				<p className="text-gray-700 text-base" dangerouslySetInnerHTML={{__html: show.summary}} />
			</div>
			<div className="px-6 pt-4 pb-2">
				{getTags(show)}
			</div>
	</div>
	)
}

export default ImageShow;