import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
	const [repositories, setRepositories] = useState([]);

	useEffect(() => {
		api.get('repositories').then((response) => {
			setRepositories(response.data);
		});
	}, []);

	async function handleAddRepository() {
		const response = await api.post('repositories', {
			title: 'My Repo',
			url: 'https://github.com/paolorr/MyRepo',
			techs: ['javascript', 'node'],
		});

		setRepositories([...repositories, response.data]);
	}

	async function handleRemoveRepository(id) {
		await api.delete(`repositories/${id}`);

		const index = repositories.findIndex((repository) => repository.id === id);

		if (index >= 0) {
			const newRepositories = [...repositories];
			newRepositories.splice(index, 1);
			setRepositories(newRepositories);
		}
	}

	return (
		<div>
			<ul data-testid="repository-list">
				{repositories.map((repository) => (
					<li key={repository.id}>
						{repository.title}
						<button onClick={() => handleRemoveRepository(repository.id)}>
							Remover
						</button>
					</li>
				))}
			</ul>

			<button onClick={handleAddRepository}>Adicionar</button>
		</div>
	);
}

export default App;
