import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import Product from './components/Product';

function App() {
	return (
		<div className='App'>
			<header className='App-header'></header>
			<main>
				<Container>
					<Product></Product>
				</Container>
			</main>
		</div>
	);
}

export default App;
