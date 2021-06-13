import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [dogs, setDogs] = useState({});
  const [dogURL, setDogURL] = useState("");
  const [loading, setLoading] = useState(false);

  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  function getDog() {
    setLoading(true);
    axios
      .get(`https://api.thedogapi.com/v1/images/search`)
      .then((res) => {
        const newDogs = res.data;
        setDogs(newDogs);
      })
      .finally(() => {
        sleep(500);
        setLoading(false);
      });
  }

  useEffect(() => {
    axios.get(`https://api.thedogapi.com/v1/images/search`).then((res) => {
      const newDogs = res.data;
      setDogs(newDogs);
    });
  }, []);

  useEffect(() => {
    if (dogs[0] != null) {
      setDogURL(dogs[0].url);
    }
  }, [dogs]);

  let button;
  if (loading) {
    button = (
      <button className="buttonload disabled not-allowed">
        <i className="fa fa-refresh fa-spin"></i>
        <code> Loading</code>
      </button>
    );
  } else {
    button = (
      <button className="buttonload pointer" onClick={getDog}>
        <i className="fa fa-refresh"></i>
        <code> New Dog</code>
      </button>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={dogURL} className="dog" alt="dog" />
        <p>{button}</p>
      </header>
    </div>
    // <div className="App App-header">
    //   <img width="400px" src={dogURL} alt="dog"></img>
    // </div>
  );
}

export default App;
