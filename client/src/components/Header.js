import * as React from 'react'
import { Link } from "react-router-dom"

import useDocumentTitle from '../hooks/use-document-title';
import { TITLE } from '../lang/en-gb';


function Header({ title, className }) {
	useDocumentTitle(title || TITLE)

	return (
		<div className={`${className ? className : ''} flex flex-row`}>
			<div className='flex-grow'>
				<Link to='/'>
					<h1 className="title text-center mb-4 text-5xl">
						{ title || TITLE }
					</h1>
				</Link>
			</div>
			<div>
				<Link to='/login'>
					<p>User</p>
				</Link>
			</div>
		</div>
	)
}

export default Header;
