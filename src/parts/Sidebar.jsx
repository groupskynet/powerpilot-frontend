import React from 'react';
import '../assets/sidebar.css';

//components
import SidebarLink from '../components/sidebar-link.jsx';
import SidebarDropdown from '../components/sidebar-dropdown.jsx';

function Sidebar() {
	return (
		<div className="sidebar bg-gray-50 w-68 flex-none flex flex-col  overflow-y-hiden">
			<div className="sidebar__logo flex justify-center mt-5">
				<img className="w-4/5" src="http://pebi.nikorriendo.com/public/images/logo.png" alt="logo PEBI" />
			</div>
			<div className="pt-12  flex flex-col items-start flex-grow overflow-y-auto">
				<SidebarLink title="Users" active={false}>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
					</svg>
				</SidebarLink>
				<SidebarDropdown title="General">
					<SidebarLink title="Users" active={false}>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
						</svg>
					</SidebarLink>
				</SidebarDropdown>
			</div>
		</div>
	)
}

export default Sidebar;
