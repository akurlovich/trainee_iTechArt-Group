import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Comment } from '../Comment/Comment';
import { Loader } from '../UI/Loader/Loader';
import { addComment, getAllCommentByBookID, getComments } from '../../store/reducers/CommentReducer/CommentActionCreators';
import './commentsblock.scss';

const CommentsBlockInner:FC = () => {
  const { user } = useAppSelector(state => state.authReducer);
  const { commentsByBookID, isLoading, comments } = useAppSelector(state => state.commentReducer);
  const dispatch = useAppDispatch();
  const [text, setText] = useState('');
  const {bookID} = useParams();

  const socket = new WebSocket(`ws://localhost:4000/`);

  interface IMSGProps {
    id: string,
    bookTitle: string,
    method: string,
  };

  useEffect(() => {
    (async () => {
      if (bookID) {
        // console.log('object');
        await dispatch(getAllCommentByBookID(bookID));
      }
    })();
    socket.onopen = () => {
      console.log('Connect to server');
      socket.send(JSON.stringify({
        id: 'ididididid',
        bookTitle: 'title title title',
        method: 'connection',
      }))
   };
    socket.onmessage = async (event) => {
      let msg: IMSGProps = JSON.parse(event.data);
      switch (msg.method) {
        case 'connection':
          console.log(`!!!!!!!!!! ${msg.id}   ${bookID}`);
          if (bookID) {
            await dispatch(getAllCommentByBookID(bookID));
          }
          break;
      }

    };
  }, [])
  

  const commentHandler = async () => {
    console.log(commentsByBookID)
    socket.send(JSON.stringify({
      id: bookID,
      bookTitle: '222222222222',
      method: 'connection',
    }))
    if (text.length > 0 && bookID) {
      console.log('object', text);
      await dispatch(addComment({bookID: bookID, userID: user.id, comment: text}));
      await dispatch(getAllCommentByBookID(bookID));
    }
    setText('');
  }

  return (
    <>
      {isLoading && <Loader/>}
      {commentsByBookID.length > 0 && 
      
      (<div className="comments">
      
        <div className="comments__title">
          Comments:
        </div>
      {/* {comments.length && comments[0].comment}
      {commentsByBookID.length && commentsByBookID[0].comment} */}
      {commentsByBookID.length > 0 && 
      commentsByBookID.map(item => 
        <Comment key={item._id} comment={item} user={item.userID} bookID={bookID}/>)}
      {user.id && 
        <div className="comments__add">
          <div className="comments__add__block">
            <div className="comments__add__title">
              Leave comment:
            </div>
            <textarea
              onChange={(e) => setText(e.target.value)}
              value={text}
              className="comments__add__input"/>
          </div>
          <div
            onClick={commentHandler} 
            className="comments__add__button">
            Send comment
          </div>
        </div>
      }
      
    </div>)
      }
    
    
    
    </>
  );
};

export const CommentsBlock = React.memo(CommentsBlockInner);
