import React, { useState } from 'react';

function SidebarDropdown(props) {
	const { title, icon, children } = props;
	const [open, setOpen] = useState(false);
	return (
		<div className="sidebar__link__item">
			<div onClick={() => setOpen(!open)} className="flex items-center cursor-pointer w-full">
				<span>
					{icon}
				</span>
				<span className="ml-4 flex-grow">{title}</span>
				<span>
					{!open && <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
					</svg>}
					{open && <svg x-show="open" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
						<path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
					</svg>}
				</span>
			</div>
			{open && <div class="pl-4 pt-2 flex flex-col items-start flex-grow overflow-y-auto">
				{children}
			</div>}
		</div >
	);
}

export default SidebarDropdown
