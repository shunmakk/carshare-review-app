import './Home.scss'
import { Data } from '../../utils/Data'
import { useEffect, useState } from 'react'
import { CarData } from '../../utils/type'
import Grid from "@mui/material/Grid"
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';


const Home = () => {

const [carData ,setCarData] = useState<CarData[]>([]);
const [gap, setGap] = useState('70px');

const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

const navigate = useNavigate();

const handleMoveReview = () => {
  navigate('/review')
}

useEffect(() => {
  setCarData(Data)
},[])

useEffect(() => {
  const updateGap = () => {
    if (window.innerWidth <= 768) {
        setGap('40px');
      } else {
        setGap('70px');
      }
    };
    updateGap();
    window.addEventListener('resize', updateGap);
    return () => {
      window.removeEventListener('resize', updateGap);
    };
  }, []);


  return (
    <main className='home'>
      <div className='Top'>
        <div className='TopLeft'>
          <h2 className='title'>カーシェア専門レビューサイト</h2>
          <p>カーシェアのレビューを書き込み、<br className='br-sp'/>見ることができるアプリです。<br/>Googleでログインすれば誰でも<br className='br-sp'/>レビューを書くことができます。</p>
          <button onClick={handleMoveReview} className='TopButton'>レビューを書く</button>
        </div>
        <div className='TopRight'><img src='./car1.png' alt=""/></div>
      </div>
      <div>
      <Grid container spacing={2} mt={10} mb={10} gap={gap} justifyContent={"center"} marginLeft={'auto'} marginRight={'auto'}>
        {carData.map((car) => {
          return (
            <div key={car.id}>
               <Grid item xs={12} sm={12} md={12}>
               <Card sx={{ width: isSmallScreen ? 330 : 500 }} className='card'>
          <Link to={car.url} style={{textDecoration: 'none'}}>
            <CardMedia
              sx={{ height: 150, borderBottom: 0.2 }}
              image={car.img}
              title={car.name}
            />
            <CardContent sx={{height: 50}}>
              <Typography gutterBottom variant="h5" sx={{textAlign: 'center', marginTop: 2.5, fontWeight: 800, color: 'black'}}>
                {car.name}
              </Typography>
            </CardContent>
            <CardActions sx={{display: 'flex', justifyContent:'center', alignItems: 'center'}}>
                <Button size="large" style={{fontSize: '20px'}}>口コミを見る</Button>
            </CardActions>
            </Link>
          </Card>
          </Grid>
            </div>
          )
        }
        )}
        </Grid>
      </div>
    </main>
  )
}

export default Home