import * as React from 'react'

function Header({ title, className }) {

	return (
		<div className={`${className} flex flex-row`}>

			<div className='flex-grow'>
				<h1 className="title text-center my-4 text-5xl">
					{ title }
				</h1>
			</div>
			<div>
				user
			</div>

		</div>
	)
}

export default Header;
