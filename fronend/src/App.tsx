import React, {useEffect, useState} from "react";

const App: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const apiUrl = process.env.REACT_APP_API_URL || "/api/hello";

  useEffect(() => {
    fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => setMessage(data.message))
        .catch(() => setMessage("Hiba a backend elérésében..."));
  }, []);

  return (
      <div className="App">
        <h1>Hello World from React!</h1>
        <p>Backend üzenet: {message}</p>
      </div>
  );
};

export default App;