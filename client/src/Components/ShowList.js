import ShowCard from './ShowCard'

function ShowList({ tvShows }) {
	const showsList = tvShows.map((item) => {
		return <ShowCard key={item.show.id} show={item.show}></ShowCard>
	});

	return (
			<div>
				<p className="text-center font-semibold text-gray-700 mb-4">Results: { tvShows.length }</p>
				{ showsList }
			</div>

	)
}

export default ShowList;