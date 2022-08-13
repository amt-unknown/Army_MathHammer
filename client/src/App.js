import  { BrowserRouter, Route, Routes } from 'react-router-dom'
import Error404 from './Error404'
import Home from './Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" component={Home} />
        <Route path="/" component={Error404} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
