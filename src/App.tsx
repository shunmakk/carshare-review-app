import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Header from './components/Header';
// import Footer from './components/Footer';
import Login from './pages/Login/Login';
import Contact from './pages/contact/Contact';
import Review from './pages/review/Review';
import Detail from './pages/Detail/Detail';
import Careco from './pages/Detail/Careco';
import Dcarshare from './pages/Detail/Dcarshare';
import Orix from './pages/Detail/Orix';
import Times from './pages/Detail/Times';
import NotFound from './pages/notFound/NotFound';
import { useAppDispatch, useAppSelector } from './redux/hook';
import { useEffect } from 'react';
import { auth } from './firebase';
import { login, logout } from './redux/userSlice';

function App() {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((loginuser) => {
      if (loginuser) {
        dispatch(login({
          uid: loginuser.uid,
          email: loginuser.email,
          displayName: loginuser.displayName
        }));
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Header />
        <div className='main'>
          <Routes>
            <Route path='/' element={<Home />} />
            {user ? (
              <>
                <Route path='/review' element={<Review />} />
              </>
            ) : (
              <>
                <Route path='/login' element={<Login />} />
              </>
            )}
            <Route path='/contact' element={<Contact />} />
            <Route path='/detail' element={<Detail />} />
            <Route path='/detail/careco' element={<Careco />} />
            <Route path='/detail/dcarshare' element={<Dcarshare />} />
            <Route path='/detail/orix' element={<Orix />} />
            <Route path='/detail/times' element={<Times />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
