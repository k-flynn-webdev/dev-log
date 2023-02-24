import * as React from 'react'

import useDocumentTitle from '../hooks/use-document-title';
import { TITLE } from '../lang/en-gb';


function Header({ title, className }) {
	useDocumentTitle(title || TITLE)

	return (
		<div className={`${className ? className : ''} flex flex-row`}>
			<div className='flex-grow'>
				<h1 className="title text-center mb-4 text-5xl">
					{ title || TITLE }
				</h1>
			</div>
			<div>
				user
			</div>
		</div>
	)
}

export default Header;
