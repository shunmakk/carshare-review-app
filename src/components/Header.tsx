import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  return (
    <header className='header'>
      <div className='headerWrapper'>
        <div className='headerTitle'>
        <Link to="/" className='Link'><h1>CarShare Review APP</h1></Link>
        </div>
        <nav className='headerNavgation'>
          <ul>
          <Link to="/login" className='navLink'><li>ログイン/レビューを書く</li></Link>
          <Link to="/contact" className='navLink'><li>お問い合わせ</li></Link>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header