import  { BrowserRouter, NavLink, Routes, Route} from 'react-router-dom'
import Error404 from './components/Error404'
import Home from './components/Home'
import Navigation from './components/Navigation'

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route exact path='/' element={<Home/ >} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>

  );
}