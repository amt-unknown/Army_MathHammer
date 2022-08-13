import  { BrowserRouter, NavLink, Routes, Route} from 'react-router-dom'
import Error404 from './Error404'
import Home from './Home'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="">Home</NavLink>
      </nav>
      <Routes>
        <Route exact path='/' element={<Home/ >} />
        <Route path="/" element={<Error404 />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
