import { useState, useEffect } from "react";
import Header from "../../components/Header";
import background from '../../assets/background.png'
import './styles.css';
import ItemList from "../../components/ItemList";

function App() {
  const [user, setUser] = useState("");
  const [currentUser, setCurrentUser] = useState({}); // Initial empty object
  const [repos, setRepos] = useState([]); // Initial empty array

  const handleGetData = async () => {
    console.log('oi');
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();
    console.log(newUser);

    if (newUser.name) {
      setCurrentUser({
        avatar_url: newUser.avatar_url,
        name: newUser.name,
        bio: newUser.bio,
        login: newUser.login,
      });

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();
      setRepos(newRepos);
    }
  };

  // Buscar dados na montagem do componente (opcional, ajuste conforme necessário)
  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <div className="App">
      <Header></Header>
      <div className="conteudo">
        <img src={background} className="background" alt="background app"></img>
        <div className="info">
          <div>
            <input
              value={user}
              onChange={event => setUser(event.target.value)}
              name="usuario"
              placeholder="@username"
            />
            <button onClick={handleGetData}>Buscar</button>
          </div>
          {currentUser.name ? (
            <>
              <div className="perfil">
                <img src={currentUser.avatar_url} alt="imagem de perfil" className="profile" />
                <div>
                  <h3>{currentUser.name}</h3>
                  <span>@{currentUser.login}</span>
                  <p>{currentUser.bio}</p>
                </div>
              </div>
              <hr />
            </>
          ) : null}
          {repos.length ? (
            <>
              <div>
                <h4 className="repositorio">Repositórios</h4>
                {repos.map(repo => (
                  <ItemList title={repo.name} description={repo.description}></ItemList>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
