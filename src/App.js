import React, { useEffect, useState } from "react";

import "./styles.css";

// Load the api script, with the axios object, connecting to the API
import api from './services/api';

function App() {

  // Defines the array that will hold the data
  const [repos, setRepos] = useState([]);
  
  // Define the state-watcher kind of thing
  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepos(response.data);
    })
  }, []);

  async function handleAddRepository() {
    
    const response = await api.post('/repositories', {
      title: `New Repo ${Date.now()}`,
      url: "http://www.github.com//mguidoti/fakerepo",
      techs: "React"
    });

    const repo = response.data;

    setRepos([...repos, repo]);
  }

  async function handleRemoveRepository(id) {
    
    const repoIndex = repos.findIndex(repo => repo.id === id);

    await api.delete(`/repositories/${id}`);

    repos.splice(repoIndex, 1);

    setRepos([...repos]);
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repos.map((repo) => ( 
            <>
              <li>
                <h2 key={repo.id}> { repo.title } </h2> 
                <button onClick={() => handleRemoveRepository(repo.id)}>
                  Remover
                </button>
              </li>
            </>
            ) ) }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
