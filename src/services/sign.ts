import { useRequest } from 'ahooks';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../libs/firebase';

export const signIn = (email: string, pasword: string) => {
  return signInWithEmailAndPassword(auth, email, pasword);
};

export const signUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const verifyEmail = async () => {
  auth.currentUser && (await sendEmailVerification(auth.currentUser));
};

export const useSign = () => {
  const navigate = useNavigate();

  const reqSignIn = useRequest(
    async ({ email, password }) => {
      return signInWithEmailAndPassword(auth, email, password);
    },
    {
      manual: true,
      onSuccess: (r) => {
        navigate('/');
      },
      onError: (err) => {
        alert('Email or Password invalid');
      },
    }
  );

  const reqSignUp = useRequest(
    async ({ email, password }) => {
      return createUserWithEmailAndPassword(auth, email, password);
    },
    {
      manual: true,
    }
  );

  const reqVerifyEmail = useRequest(
    async () => {
      return (
        auth.currentUser && (await sendEmailVerification(auth.currentUser))
      );
    },
    {
      manual: true,
    }
  );

  return {
    reqSignIn,
    reqSignUp,
    reqVerifyEmail,
  };
};
