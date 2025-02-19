import {useEffect,useState} from "react"
import axios from 'axios'


function App() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la  recuperation :", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Liste des Posts</h1>

      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  // const element = <h1>Hello, world!</h1>;
  // const name = 'Josh Perez';
  // const element = <h1>Hello, {name}</h1>;
  
  // return <>
  //   <Bonjour nom="Toutabizzi" />
  //   <Compteur/>
  //   </>
}


export default App