import { useEffect, useState } from 'react';
import './Detail.scss';
import { DocumentData, getDocs, orderBy, query, collection ,deleteDoc,doc} from 'firebase/firestore';
import { db ,auth} from '../../firebase';
import { Rating,Button } from '@mui/material';
import { useAppSelector } from '../../redux/hook';
import DeleteIcon from '@mui/icons-material/Delete';
import Footer from '../../components/Footer';
import ReactPaginate from 'react-paginate';

const Careco = () => {

  const user = useAppSelector((state) => state.user.user);
  const [getCareco, setGetCarecos] = useState<DocumentData[]>([]);
  const [currentPage,setCurrentPage] = useState(0);
  const itemsPerPage = 2;

  const fetchCarecos = async () => {
    const q = await getDocs(query(collection(db, 'careco'), orderBy("createdAt")));
    const getAll = q.docs.map((doc) => {
      return { id: doc.id, ...doc.data()};
    });
    setGetCarecos(getAll);
  }

  useEffect(() => {
    fetchCarecos();
  }, []);

  const DeleteButton = async (id :string) => {
    const DeleteConfirm = window.confirm('本当に投稿を削除しますか？');
    if(DeleteConfirm){
      await deleteDoc(doc(db, 'careco', id));
      window.location.reload();
    }
  }

  //ページネーション
  const offset = currentPage * itemsPerPage;
  const currentItems =  getCareco.slice(offset, offset + itemsPerPage);
  const handlePageClick = (event: {selected:number}) => {
    setCurrentPage(event.selected);
  }

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
      <ReactPaginate
        pageCount={Math.ceil(getCareco.length / itemsPerPage)} //一覧表示したいデータ数 　➗　1ページあたりの表示数
        previousLabel={'前へ'}
        nextLabel={'次へ'}
        onPageChange={handlePageClick}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2} //上記の「今いるページの前後」の番号をいくつ表示させるかを決める
        containerClassName={"pagination"}
        // pageClassName='page-item' //各子要素(li要素)のクラス名
        // pageLinkClassName='page-link' //ページネーションのリンクのクラス名
        activeClassName='active' //今いるページ番号のクラス名。今いるページの番号だけ太字にしたりできる
        // previousClassName='page-item' // '<'の親要素(li)のクラス名
        // nextClassName='page-item' //'>'の親要素(li)のクラス名
        // previousLinkClassName='page-link'  //'<'のリンクのクラス名
        // nextLinkClassName='page-link'//'>'のリンクのクラス名
        disabledClassName='disabled' //先頭 or 末尾に行ったときにそれ以上戻れ(進め)なくするためのクラス
        breakLabel='...' // ページがたくさんあるときに表示しない番号に当たる部分をどう表示するか
        />
        <ul className='reviewContent'>
          {currentItems.map((careco) => (
            <li className='reviewContentInner' key={careco.id}>
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
              <div className='delete'>
              {user && careco.user === auth.currentUser?.uid && (
                <Button startIcon={<DeleteIcon />}  variant='outlined' onClick={() => DeleteButton(careco.id)}>投稿を削除</Button>
              )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer/>
    </div>
  );
}

export default Careco;
