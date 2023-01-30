import './App.css';
import Home from './Component/Home/Home';
// import Login from './Pages/Login/Login';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import AuthProvider from './Component/Sheard/Firebase/AuthProvider';
import Reagister from './Component/Login/Reagister';
import Login from './Component/Login/Login';
import PrivateRoute from './Component/Sheard/PrivateRout/PrivateRoute';
import Billing from './Component/Billing/Billing';


function App() {

  return (
    <div className="App">
      <AuthProvider> 
      <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reagister" element={<Reagister />} />
             <Route path="/*" element={<PrivateRoute></PrivateRoute>}>
                <Route path="billing" element={<Billing />} />                
              </Route> 
              <Route path="/billing" element={<Billing />} /> 
            </Routes>
        </BrowserRouter>
     </AuthProvider>
    </div>
  );
}

export default App;
