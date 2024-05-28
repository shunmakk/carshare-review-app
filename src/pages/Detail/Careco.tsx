import { useEffect, useState } from 'react';
import './Detail.scss';
import { DocumentData, getDocs, orderBy, query, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { Rating } from '@mui/material';

const Careco = () => {
  const [getCareco, setGetCarecos] = useState<DocumentData[]>([]);

  const fetchCarecos = async () => {
    const q = await getDocs(query(collection(db, 'careco'), orderBy("createdAt")));
    const getAll = q.docs.map((doc) => doc.data());
    setGetCarecos(getAll);
  }

  useEffect(() => {
    fetchCarecos();
  }, []);

  return (
    <div className='detailWrapper'>
      <div className='titleWrapper'>
        <h2 className='title'>カレコカーシェア</h2>
      </div>
      <div className='contentWrapper'>
        <div className='contentInner'>
          <div className='contentImg'><img src='/careco.png' alt='オリックスカーシェア' width='400px' height='130px'/></div>
          <div className='contentDetail'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora aut blanditiis libero unde voluptate dolorem aliquam veniam doloremque animi ducimus in, perferendis quam voluptatem, quidem rerum eaque omnis aspernatur officiis.</div>
        </div>
      </div>
      <div className='reviewWrapper'>
        <ul className='reviewContent'>
          {getCareco.map((careco) => (
            <li className='reviewContentInner' key={careco.rateAll}>
              <div className='reviewHead'>
                <img src='/tokumei.jpeg' alt="画像" className='humanImg' />
                <p>{careco.nickname ? careco.nickname : '匿名'}</p>
                <p>{careco.age ? careco.age + '代' : ''}</p>
              </div>
              <div className='reviewRateAll'>
                <Rating value={careco.rateAll} readOnly size='large' />
              </div>
              <div className='reviewComment'>
                <p>{careco.comment}</p>
              </div>
              <div className='reviewRate'>
                <div className='rateEach'>
                  <p>料金</p>
                  <Rating value={careco.fee} readOnly size='small' />
                </div>
                <div className='rateEach'>
                  <p>サポート</p>
                  <Rating value={careco.support} readOnly size='small' />
                </div>
                <div className='rateEach'>
                  <p>車内</p>
                  <Rating value={careco.car} readOnly size='small' />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Careco;
