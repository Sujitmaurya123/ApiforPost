
import{BrowserRouter,Routes,Route} from "react-router-dom"

import './App.css'; 
import Home from './components/Home';
import About from './components/About';


function App() {
  return (
   
        <BrowserRouter>
        <Routes>

          <Route  path="/" element={<Home/>} />
          <Route path="/about/:postId" element={<About/>} />
          {/* Add more routes here */}
        </Routes>
        </BrowserRouter>
   
  );
}

export default App;
