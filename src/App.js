import USMapPage from "./Pages/USMapPage"
import CactiSelectPage from "./Pages/CactiSelectPage";
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function App() {
	return (
		<Router>
			<div>
				<nav className="header">
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/wordCloud">Word Clouds</Link>
						</li>
					</ul>
				</nav>
				<Routes>
					<Route
						path="/"
						element={
							<USMapPage />
						} />
					<Route path="/wordCloud" element={<CactiSelectPage />} />
				</Routes>
			</div>
		</Router>
	)
}

export default App
