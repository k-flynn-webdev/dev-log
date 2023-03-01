import * as React from 'react'
import { Link } from "react-router-dom"

import useDocumentTitle from '../hooks/use-document-title';
import { TITLE } from '../lang/en-gb';


function Header({ title, className }) {
	useDocumentTitle(title || TITLE)

	return (
		<div className={`${className ? className : ''} flex flex-row`}>
			<div className='flex-grow'>
				<div className="text-center mb-4">
					<Link className="title text-5xl" to='/'>
						{ title || TITLE }
					</Link>
				</div>
			</div>
			<div>
				<Link to='/login'>
					User
				</Link>
			</div>
		</div>
	)
}

export default Header;
