import './NotFound.scss';
import { Stack } from '@mui/material';
import Alert from '@mui/material/Alert';
import Footer from '../../components/Footer';

const NotFound = () => {
  return (
  <>
   <div className='notFoundWrapper'>
   <div className='notFoundAlert'>
    <Stack sx={{width: '80%'}} >
      <Alert severity='error' >404エラー</Alert>
    </Stack>
   </div>
   <div className='message'>このページは存在しません</div>
   </div>
   <Footer/>
  </>
  )
}

export default NotFound