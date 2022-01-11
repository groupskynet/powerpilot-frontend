import React from 'react';
import './index.css'
import { Routes, Route } from "react-router-dom";

//components
import Sidebar from './parts/Sidebar.jsx'
import Navbar from './parts/Navbar.jsx'

function App() {

	return (
		<div className="flex flex-col h-screen">
			<div className="flex flex-1 overflow-y-hidden">
				<Sidebar />
				<div className="panel flex-grow flex flex-col px-6 mt-8">
					<Navbar />
					<div className="flex-grow overflow-y-auto">
						<Routes>
							<Route path={"usuarios"}>hello</Route>
							<Route path={"gestion"}>hello</Route>
							<Route path={"mantenimientos"}>hello</Route>
							<Route path={"reportes"}>hello</Route>

						</Routes>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App
