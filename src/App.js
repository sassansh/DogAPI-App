import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [dogs, setDogs] = useState({});
  const [dogURL, setDogURL] = useState("");

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

  return (
    <div className="App">
      <header className="App-header">
        <img src={dogURL} className="App-logo" alt="logo" />
        <p>
          <code>Refresh for a new dog.</code>
        </p>
      </header>
    </div>
    // <div className="App App-header">
    //   <img width="400px" src={dogURL} alt="dog"></img>
    // </div>
  );
}

export default App;
