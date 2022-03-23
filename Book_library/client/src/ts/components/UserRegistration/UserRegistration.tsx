import React, { FC, useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { USER_AVATAR } from '../../constants/user';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { registerUser } from '../../store/reducers/AuthReducer/AuthActionCreatores';
import { FormInput } from '../UI/FormInput/FormInput';
import './userregistration.scss';

const UserRegistrationInner: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirPassword, setConfirPassword] = useState('');
  const [buttonSubmit, setButtonSubmit] = useState(false);
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.authReducer);
  const navigate = useNavigate();
  const handlerChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(registerUser({email, password, profileImage: USER_AVATAR}));
    // console.log(user);
  };
  const validFormData = () => {
    const emailValid = /^\S+@\S+\.\S+$/.test(email);
    const passValid = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,20}$/.test(password);
    const pasConfirm = (password === confirPassword);
    if (passValid && pasConfirm && emailValid) {
      setButtonSubmit(prev => true)
    }

  }
  useEffect(() => {
    validFormData();
  }, [password, confirPassword, email]);

  return (
    <div className='registration'>
      <div className="registration__block">
        <div className="registration__container">
          <div onClick={() => navigate('/')} className="registration__close">
            <AiOutlineCloseCircle size={40}/>
          </div>
          <div className="registration__title">
            Create Account
          </div>
          <form
            onSubmit={handlerChange}
            className="registration__form"
            >
            <FormInput
              label='Email address'
              name='email'
              type='text'
              errorMessage='Not valid email!'
              setData={setEmail}
              required={true}
              pattern='^\S+@\S+\.\S+$'
            />
            <FormInput
              label='Password'
              name='password'
              type='password'
              errorMessage='Password shoud be 8-20 characters and include 1 number and 1 letter!'
              setData={setPassword}
              required={true}
              pattern='^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,20}$'
            />
            <FormInput
              label='Confirm password'
              name='confirm'
              type='password'
              errorMessage="Password don'n match"
              setData={setConfirPassword}
              required={true}
              pattern={password}
            />
            <div className="registration__form__button">
              <input
                className={buttonSubmit ? "registration__form__button_send active" : "registration__form__button_send"}
                type="submit"
                value="Sing in"
              />
            </div>
          </form>
          <div className="registration__login-link">
            <div className="registration__login-link__text">
              Already have an account?
            </div>
            <div className="registration__login-link__link">
              <Link to='/login'>Login</Link> 
            </div>
          </div>
        </div>
        <img className='registration__book one' src="./assets/book-1.png" alt="book" />
        <img className='registration__book two' src="./assets/book-2.png" alt="book" />
        <img className='registration__book three' src="./assets/book-3.png" alt="book" />
      </div>
    </div>
  );
};

export const UserRegistration = React.memo(UserRegistrationInner);
