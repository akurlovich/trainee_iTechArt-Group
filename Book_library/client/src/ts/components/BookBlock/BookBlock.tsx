import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { BOOKS_BG_COLORS } from '../../constants/user';
import { useAppDispatch } from '../../hooks/redux';
import { randomBGColor } from '../../services/ClientServices/RandomBGColor';
import { getAllBookedsByBookID } from '../../store/reducers/BookedReducer/BookedActionCreators';
import { getBookByID } from '../../store/reducers/BookReducer/BookActionCreatores';
import { IBookResponse } from '../../types/IBookResponse';
import './bookblock.scss';

interface IBooKBlock {
  book: IBookResponse,
}

const BookBlockItem: FC<IBooKBlock> = ({book}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const style = {
    background: BOOKS_BG_COLORS[randomBGColor()],
  };
  const handlerMore = async () => {
    await dispatch(getBookByID(book._id));
    await dispatch(getAllBookedsByBookID(book._id));
    navigate(`/book/${book._id}`);
  };
  return (
    <div className="bookblock">
      <div className="bookblock__container" style={style}>
        <div className="bookblock__cover">
          <div className="bookblock__cover_block">
            <img className='bookblock__cover_image' src={book?.coverImage} alt="book cover" />
          </div>
          <div className="bookblock__cover_line"></div>
        </div>
        <div className="bookblock__item">
          <div className="bookblock__header">
            {book?.title}
          </div>
          <div className="bookblock__discription">
            {book?.description}
          </div>
          <div className="bookblock__info">
            <div className="bookblock__info_author">
              {book?.author}
            </div>
            <div className="bookblock__info_year">
              {book?.year}
            </div>
          </div>
          <div className="bookBlock__info_genre">
            {book.genre[0]}
          </div>
          <div onClick={handlerMore} className="bookblock__button">
            More
          </div>
        </div>
      </div>
    </div>
  );
};

export const BookBlock = React.memo(BookBlockItem);
