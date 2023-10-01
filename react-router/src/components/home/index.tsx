import React from "react";
import "../../App.css";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="App-header">
      <Link className="App-link" to="/dashboard">
        Dasboard
      </Link>
      <Link className="App-link" to="/auth">
        Authorization
      </Link>
    </div>
  );
};

export default Home;
