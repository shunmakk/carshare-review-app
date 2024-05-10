import { Button } from '@mui/material'
import './Login.scss'
import GoogleIcon from '@mui/icons-material/Google'
import { useCallback } from 'react'
import { signInWithPopup} from "firebase/auth";
import {auth,provider} from "../../firebase"
import { FirebaseError } from 'firebase/app';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const navgate = useNavigate();

  const handleLoginwithGoogle = useCallback(async () => {
    try{
      await signInWithPopup(auth,provider)
      navgate('/review')
      return {success: true, message: 'ログインに成功しました'}
    }catch(e){
      if(e instanceof FirebaseError){
        console.log(e);
      }
      return {success: false, message: 'エラーが発生しました'}
    }
  },[navgate])

  return (
    <>
    <div className='Login'>
      <div className='LoginWrapper'>
        <div className='LoginInner'>
        <h2 className='LoginTitle'>ログインページ</h2>
        <p className='cap'>googleでログインすると口コミが書けるようになります。</p>
        <Button variant="outlined" onClick={handleLoginwithGoogle} className='Button'><GoogleIcon color="action"/>ログインする</Button>
        </div>
        {/* <div>
          <p></p>
        </div> */}
      </div>
    </div>
    </>
  )
}

export default Login