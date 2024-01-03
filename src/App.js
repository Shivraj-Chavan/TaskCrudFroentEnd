import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Create from './components/Create';
import Read from './components/Read';
import Update from './components/Update';
function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Create/>}/>
            <Route path="/:id" element={<Update/>}/>
          </Routes>
        
        </BrowserRouter>
    </div>
  );
}

export default App;
