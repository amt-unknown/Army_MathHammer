import  { BrowserRouter, Routes, Route} from 'react-router-dom'
import Error404 from './components/Error404'
import Home from './components/Home'
import Navigation from './components/Navigation'
import NewUnitForm from './components/units/NewUnitForm'
import CurrentUserProvider from './contexts/CurrentUser'

export default function App() {
  return (
    <CurrentUserProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/createUnit' element={<NewUnitForm />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </CurrentUserProvider>

  );
}