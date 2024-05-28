import { useEffect, useState } from 'react';
import './Detail.scss';
import { DocumentData, getDocs, orderBy, query, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { Rating } from '@mui/material';

const Dcarshare = () => {
  const [getDcarshare, setGetDcarshare] = useState<DocumentData[]>([]);

  const fetchDcarshare = async () => {
    const q = await getDocs(query(collection(db, 'dcarshare'), orderBy("createdAt")));
    const getAll = q.docs.map((doc) => doc.data());
    setGetDcarshare(getAll);
  }

  useEffect(() => {
    fetchDcarshare();
  }, []);

  return (
    <div className='detailWrapper'>
      <div className='titleWrapper'>
        <h2 className='title'>D car share</h2>
      </div>
      <div className='contentWrapper'>
        <div className='contentInner'>
          <div className='contentImg'><img src='/dcarshare.jpg' alt='オリックスカーシェア' width='300px' height='130px'/></div>
          <div className='contentDetail'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora aut blanditiis libero unde voluptate dolorem aliquam veniam doloremque animi ducimus in, perferendis quam voluptatem, quidem rerum eaque omnis aspernatur officiis.</div>
        </div>
      </div>
      <div className='reviewWrapper'>
        <ul className='reviewContent'>
          {getDcarshare.map((d) => (
            <li className='reviewContentInner' key={d.rateAll}>
              <div className='reviewHead'>
                <img src='/tokumei.jpeg' alt="画像" className='humanImg' />
                <p>{d.nickname ? d.nickname : '匿名'}</p>
                <p>{d.age ? d.age + '代' : ''}</p>
              </div>
              <div className='reviewRateAll'>
                <Rating value={d.rateAll} readOnly size='large' />
              </div>
              <div className='reviewComment'>
                <p>{d.comment}</p>
              </div>
              <div className='reviewRate'>
                <div className='rateEach'>
                  <p>料金</p>
                  <Rating value={d.fee} readOnly size='small' />
                </div>
                <div className='rateEach'>
                  <p>サポート</p>
                  <Rating value={d.support} readOnly size='small' />
                </div>
                <div className='rateEach'>
                  <p>車内</p>
                  <Rating value={d.car} readOnly size='small' />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dcarshare;
