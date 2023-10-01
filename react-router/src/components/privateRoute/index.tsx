import React from "react";
import "../../App.css";
import { useContext, useState, createContext } from "react";
import Error from "../error";
import {
  BrowserRouter,
  Route,
  Routes,
  useParams,
  Navigate,
} from "react-router-dom";
import Home from "../home";
import Dashboard from "../dashboard";

type ContextType = {
  isLogged: boolean;
  login: (status: boolean) => void;
};

const AuthContext = createContext<ContextType | null>(null);

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = useContext(AuthContext);

  if (!auth) return <Error />;

  return auth.isLogged ? <>{children}</> : <Navigate to="/auth" replace />;
};

const Authorization: React.FC = () => {
  const auth = useContext(AuthContext);

  const handleClick = () => {
    if (auth) auth.login(true);
  };
  return (
    <div onClick={handleClick} className="App-header">
      Authorization
    </div>
  );
};

const Profile: React.FC = () => {
  const { profileId } = useParams();

  React.useEffect(() => {
    alert(`Завантаження даних для ID: ${profileId}`);
  }, [profileId]);

  return <div className="App-header">Profile Page ID: {profileId}</div>;
};

function PrivateApp() {
  const [isLogged, login] = useState(false);
  return (
    <AuthContext.Provider value={{ isLogged, login }}>
      <BrowserRouter>
        <Routes>
          <Route index Component={Home} />
          <Route path="/auth" Component={Authorization} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/:profileId"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="*" Component={Error} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default PrivateApp;
