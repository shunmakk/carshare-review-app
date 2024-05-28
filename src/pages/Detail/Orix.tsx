import { useEffect, useState } from 'react'
import './Detail.scss'
import { DocumentData ,getDocs, orderBy, query,collection} from 'firebase/firestore'
import { db } from '../../firebase'
import { Rating } from '@mui/material'


const Orix = () => {

  const [getOrix, setGetOrixs] = useState<DocumentData[]>([])

  const Orixs = async () => {
    const q = await getDocs(query(collection(db, 'orix'),orderBy("createdAt")));
    const getAll = q.docs.map((doc) => {
      return doc.data();
    });

    setGetOrixs(getAll);
  }

  useEffect(() => {
    Orixs();
  },[]);



  return (
    <div className='detailWrapper'>
      <div className='titleWrapper'>
        <h2 className='title'>オリックスカーシェア</h2>
      </div>
      <div className='contentWrapper'>
        <div className='contentInner'>
          <div className='contentImg'><img src='/orix.jpg' alt='オリックスカーシェア' width='400px' height='130px'/></div>
          <div className='contentDetail'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora aut blanditiis libero unde voluptate dolorem aliquam veniam doloremque animi ducimus in, perferendis quam voluptatem, quidem rerum eaque omnis aspernatur officiis.</div>
        </div>
      </div>
      <div className='reviewWrapper'>
        <ul className='reviewContent'>
          {getOrix.map((orix) => (
            <li className='reviewContentInner' key={orix.rateAll}>
              <div className='reviewHead'>
                <img src='/tokumei.jpeg'  alt="画像" className='humanImg' />
                <p>{orix.nickname ? orix.nickname : '匿名'}</p>
                <p>{orix.age ? orix.age + '代' : ''}</p>
              </div>
              <div className='reviewRateAll'>
                <Rating  value={orix.rateAll}  readOnly size='large' />
              </div>
              <div className='reviewComment'>
                <p>{orix.comment}</p>
              </div>
              <div className='reviewRate'>
                <div className='rateEach'>
                  <p>料金</p>
                  <Rating  value={orix.fee}  readOnly size='small' />
                </div>
                <div className='rateEach'>
                  <p>サポート</p>
                  <Rating  value={orix.support}  readOnly size='small' className='secondRate' />
                </div>
                <div className='rateEach'>
                  <p>車内</p>
                  <Rating  value={orix.car}  readOnly  size='small' />
                </div>

              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Orix