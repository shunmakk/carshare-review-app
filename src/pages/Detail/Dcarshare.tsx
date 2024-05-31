import { useEffect, useState } from 'react';
import './Detail.scss';
import { DocumentData, getDocs, orderBy, query, collection,doc,deleteDoc } from 'firebase/firestore';
import { db,auth } from '../../firebase';
import { Rating } from '@mui/material';
import { useAppSelector } from '../../redux/hook';

const Dcarshare = () => {

  const user = useAppSelector((state) => state.user.user);



  const [getDcarshare, setGetDcarshare] = useState<DocumentData[]>([]);

  const fetchDcarshare = async () => {
    const q = await getDocs(query(collection(db, 'dcarshare'), orderBy("createdAt")));
    const getAll = q.docs.map((doc) => {
      return { id: doc.id, ...doc.data()};
    });
    setGetDcarshare(getAll);
  }

  useEffect(() => {
    fetchDcarshare();
  }, []);

  const DeleteButton = async (id :string) => {
    const DeleteConfirm = window.confirm('本当に投稿を削除しますか？');
    if(DeleteConfirm){
      await deleteDoc(doc(db, 'dcarshare', id));
      window.location.reload();
    }
  }

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
            <li className='reviewContentInner' key={d.id}>
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
              {user && d.user === auth.currentUser?.uid && (
                <button onClick={() => DeleteButton(d.id)}>投稿を削除</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dcarshare;
