import { FormControl, InputLabel, MenuItem, Rating, Select, TextField, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import './Review.scss'
import Box from '@mui/material/Box';
import { FormEvent, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAppSelector } from '../../redux/hook';
import Footer from '../../components/Footer';

const Review = () => {

  const user = useAppSelector((state) => state.user.user);

  const [company, setCompany] = useState<string>('1');
  const [comment, setComment] = useState<string>('');
  const [rateAll, setRateAll] = useState<number | null>(null);
  const [fee, setFee] = useState<number | null>(null);
  const [support, setSupport] = useState<number | null>(null);
  const [car, setCar] = useState<number | null>(null);
  const [nickname, setNickname] = useState<string | null>('');
  const [age, setAge] = useState<string | undefined>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (company && comment) {
      toast.loading('送信中');
      setIsLoading(true);

      const reviewData = {
        user: user?.uid,
        email: user?.email,
        comment: comment,
        rateAll: rateAll,
        fee: fee,
        support: support,
        car: car,
        nickname: nickname,
        age: age,
        createdAt: serverTimestamp()
      };

      try {
        switch (company) {
          case '1':
            await addDoc(collection(db, 'times'), reviewData);
            break;
          case '2':
            await addDoc(collection(db, 'orix'), reviewData);
            break;
          case '3':
            await addDoc(collection(db, 'careco'), reviewData);
            break;
          case '4':
            await addDoc(collection(db, 'dcarshare'), reviewData);
            break;
          default:
            throw new Error('無効な会社ID');
        }

        toast.dismiss();
        toast.success('投稿成功');

        setCompany('1');
        setComment('');
        setRateAll(null);
        setFee(null);
        setSupport(null);
        setCar(null);
        setNickname('');
        setAge('');
      } catch (error) {
        toast.dismiss();
        toast.error('投稿に失敗しました');
      } finally {
        setIsLoading(false);
      }
    } else {
      window.alert('必須項目が入力されていません');
    }
  }

  return (
    <>
     <div className='review'>
      <Toaster />
      <div className='reviewWrapper'>
        <h2 className='reviewTitle'>レビューを書く</h2>
        <form onSubmit={handleSubmit} className='reviewForm'>
          <div className='reviewCompany'>
            <h3>会社を選択する(必須)</h3>
            <Box sx={{ minWidth: 300 }}>
              <FormControl fullWidth>
                <InputLabel id="conpany_id_label">会社名を選択</InputLabel>
                <Select
                  labelId="conpany_id_label"
                  id="conpany_id"
                  value={company}
                  onChange={(e: SelectChangeEvent) => setCompany(e.target.value)}
                  disabled={isLoading}
                >
                  <MenuItem value={'1'}>タイムズカーシェア</MenuItem>
                  <MenuItem value={'2'}>オリックスカーシェア</MenuItem>
                  <MenuItem value={'3'}>カレコカーシェア</MenuItem>
                  <MenuItem value={'4'}>dカーシェア</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className='reviewComment'>
            <h3>口コミ(本文)を書く(必須)</h3>
            <Box sx={{ width: '100%', maxWidth: '100%' }}>
              <TextField
                fullWidth
                value={comment}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setComment(e.target.value)}
                multiline
                rows={6}
                disabled={isLoading}
              />
            </Box>
          </div>
          <div className="reviewRating">
            <h3>総合評価</h3>
            <Rating
              value={rateAll}
              onChange={(event, newValue) => setRateAll(newValue)}
              size="large"
              disabled={isLoading}
            />
            <h3 className='anyRating'>各種評価</h3>
            <Typography component="legend">料金</Typography>
            <Rating value={fee} onChange={(event, newValue) => setFee(newValue)} disabled={isLoading} />
            <Typography component="legend">サポート</Typography>
            <Rating value={support} onChange={(event, newValue) => setSupport(newValue)} disabled={isLoading} />
            <Typography component="legend">車内</Typography>
            <Rating value={car} onChange={(event, newValue) => setCar(newValue)} disabled={isLoading} />
          </div>
          <div className='reviewName'>
            <h3>ニックネーム（任意）</h3>
            <Box sx={{ width: '100%', maxWidth: '100%' }}>
              <TextField fullWidth value={nickname} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)} disabled={isLoading} />
            </Box>
          </div>
          <div className='reviewAge'>
            <h3>年齢(任意)</h3>
            <Box sx={{ minWidth: 300 }}>
              <FormControl fullWidth>
                <InputLabel id="age_id_label">年齢を選択</InputLabel>
                <Select
                  labelId="age_id_label"
                  id="age_id"
                  value={age}
                  onChange={(e: SelectChangeEvent) => setAge(e.target.value)}
                  disabled={isLoading}
                >
                  <MenuItem value={'10'}>10代</MenuItem>
                  <MenuItem value={'20'}>20代</MenuItem>
                  <MenuItem value={'30'}>30代</MenuItem>
                  <MenuItem value={'40'}>40代</MenuItem>
                  <MenuItem value={'50'}>50代</MenuItem>
                  <MenuItem value={'60'}>60代</MenuItem>
                  <MenuItem value={'70'}>70代以上</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className='reviewButtonWrapper'>
            <button type='submit' className='reviewButton'>口コミを投稿する</button>
          </div>
        </form>
      </div>
    </div>
    <Footer/>
    </>
    
  )
}

export default Review
