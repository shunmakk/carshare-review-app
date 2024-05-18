import { Link } from 'react-router-dom';
import './Header.scss';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useAppSelector } from '../redux/hook';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const user = useAppSelector((state) => state.user.user);

  const navigate = useNavigate();
 

  const handleLogout = () => {
    const confirm = window.confirm('ログアウトしますか？')
    if(confirm){
        auth.signOut();
        navigate('/');
    }
  }


  return (
    <header className='header'>
      <div className='headerWrapper'>
        <div className='headerTitle'>
        <Link to="/" className='Link'><h1>CarShare Review APP</h1><DirectionsCarIcon sx={{ fontSize: 33 , paddingLeft: 1}} color="primary" /></Link>
        </div>
        <nav className='headerNavgation'>
          <ul>
            {user ? (
              <>
              <li className='navLink' onClick={handleLogout}>ログアウト</li>
              </>
            ): 
              <>
              <Link to="/login" className='navLink'><li>ログイン</li></Link>
              </>
              }
          <Link to="/contact" className='navLink'><li>お問い合わせ</li></Link>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header