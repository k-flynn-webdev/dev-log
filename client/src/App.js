import useDocumentTitle from './hooks/use-document-title';
import LogInput from './components/log-input';

const TITLE = 'Dev Diary';

function App() {
	useDocumentTitle(TITLE);

	return (
		<div>
			<h1 className="text-center mt-4 text-5xl">{ TITLE }</h1>

			<div>
				<LogInput />
			</div>
		</div>
	);
}

export default App;