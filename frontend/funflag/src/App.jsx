import './App.css'
import { Footer } from './components/Footer/Footer';
import { NavbarCustom } from './components/Navbar/Navbar';
import AppRoute from './components/routes/AppRoute'

function App() {

  return (
    <>
      <NavbarCustom />
      <AppRoute />
      <Footer />
    </>
  )
}

export default App;
