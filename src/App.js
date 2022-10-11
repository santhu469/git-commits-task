import './App.css';
import CommitsList from './components/CommitsList';

import { Octokit } from "@octokit/core";
import { useEffect, useState } from 'react';

function App() {

  const [commits, setCommits] = useState([]);

  const [key, setKey] = useState("");

  const [user, setuser] = useState({
    author: "santhu469",
    repo: "git-commits-task"
  });

  const [isKey, setIsKey] = useState(true);

  const appOctokit = new Octokit({
    auth: key
  });

  const  {author, repo} = user;

  const getCommits = async () => {
    const { data } = await appOctokit.request(`GET /repos/${author}/${repo}/commits`, {
      owner: 'santhu469',
      repo: 'react-todo'
    });

    if(data) {
      setCommits(data);
    }
  };

  const keySetup = (e) => {
    e.preventDefault();
    if(key === "") {
      return;
    }
    localStorage.setItem("key", JSON.stringify(key));
    setKey("")
  };

  useEffect(() => {
    const storedKey = JSON.parse(localStorage.getItem("key"));
    if(!storedKey) {
      setIsKey(true);
    } else {
      setIsKey(false);
    }
    getCommits();
  },[]);

  const handleRefresh = () => {
    getCommits();
  }

  return (
    <div className="main">
      <h1 className='header'>Git commits Task</h1>

      {isKey && <form onSubmit={(e) => keySetup(e)}>
        <input onChange={(e) => setKey(e.target.value)} value={key} />
        <button type='submit'>set key</button>
      </form> }
      {commits.length > 0 && <div style={{maxWidth: "51%", textAlign: "right", marginBottom: 20}}>
        <button onClick={handleRefresh}>Refresh</button>
      </div>}
      <CommitsList commits={commits} />
    </div>
  );
}

export default App;