import { useEffect, useState } from 'react'
import './Detail.scss'
import { DocumentData ,getDocs, orderBy, query,collection} from 'firebase/firestore'
import { db } from '../../firebase'
import { Rating } from '@mui/material'


const Times = () => {

  const [getTimes, setGetTimes] = useState<DocumentData[]>([])

  const Times = async () => {
    const q = await getDocs(query(collection(db, 'times'),orderBy("createdAt")));
    const getAll = q.docs.map((doc) => {
      return doc.data();
    });

    setGetTimes(getAll);
  }

  useEffect(() => {
    Times();
  },[]);



  return (
    <div className='detailWrapper'>
      <div className='titleWrapper'>
        <h2 className='title'>タイムズカーシェア</h2>
      </div>
      <div className='contentWrapper'>
        <div className='contentInner'>
          <div className='contentImg'><img src='/times.png' alt='タイムズカーシェア'/></div>
          <div className='contentDetail'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora aut blanditiis libero unde voluptate dolorem aliquam veniam doloremque animi ducimus in, perferendis quam voluptatem, quidem rerum eaque omnis aspernatur officiis.</div>
        </div>
      </div>
      <div className='reviewWrapper'>
        <ul className='reviewContent'>
          {getTimes.map((times) => (
            <li className='reviewContentInner' key={times.rateAll}>
              <div className='reviewHead'>
                <img src='/tokumei.jpeg'  alt="画像" className='humanImg' />
                <p>{times.nickname ? times.nickname : '匿名'}</p>
                <p>{times.age ? times.age + '代' : ''}</p>
              </div>
              <div className='reviewRateAll'>
                <Rating  value={times.rateAll}  readOnly size='large' />
              </div>
              <div className='reviewComment'>
                <p>{times.comment}</p>
              </div>
              <div className='reviewRate'>
                <div className='rateEach'>
                  <p>料金</p>
                  <Rating  value={times.fee}  readOnly size='small' />
                </div>
                <div className='rateEach'>
                  <p>サポート</p>
                  <Rating  value={times.support}  readOnly size='small' className='secondRate' />
                </div>
                <div className='rateEach'>
                  <p>車内</p>
                  <Rating  value={times.car}  readOnly  size='small' />
                </div>

              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Times