import React from 'react'

function Navbar() {
	return (
		<div className="navbar flex items-center">
			<div className="navbar__title text-gray-800 text-xl font-semibold flex-grow">
				SIAT
			</div>
			<ul className="navbar__menu flex item-center  text-gray-500">
				<li className="navbar__menu__date flex items-center bg-blue-100 p-2 rounded-md ">
					<span className="mr-2">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
						</svg>
					</span>
					<span className="text-sm">26 may, 1957</span>
				</li>
				<li className="navbar__menu__notification flex items-center ml-4">
					<span className="px-4 border-l-2 border-r-2 border-gray-100">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
						</svg>
					</span>
				</li>
				<li className="navbar__menu__profile flex items-center mx-4">
					<img src="https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png" className="rounded-full h-8 w-8" alt="profile" />
					<span className="ml-2">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
						</svg>
					</span>
				</li>
			</ul>
		</div>
	)

}

export default Navbar;
