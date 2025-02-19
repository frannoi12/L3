<<<<<<< HEAD
import {useEffect,useState} from "react"
import axios from 'axios'

=======
import Compteur from "./components/Compteur"
import RooterNavigation from "./components/RooterNavigation"
>>>>>>> c8e4993ca6683168922e5b555187ed077b65fcb2

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
  
<<<<<<< HEAD
  // return <>
  //   <Bonjour nom="Toutabizzi" />
  //   <Compteur/>
  //   </>
=======
  return <>
    <Compteur />
    <RooterNavigation />
    </>
>>>>>>> c8e4993ca6683168922e5b555187ed077b65fcb2
}


export default App