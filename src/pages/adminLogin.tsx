/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from "../firebase";
import { getAdmin, useAdminLoginMutation, useAdminSignUpMutation } from '../redux/api/adminApi';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import toast from 'react-hot-toast';
import { adminExist, adminNotExist } from '../redux/reducer/adminReducer';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { MessageResponse } from '../types/api-types';


const AdminLogin = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [library, setLibrary] = useState('');
  const [password, setPassword] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);
  const [signupErrorMessage, setSignupErrorMessage] = useState<string | null>(null);
  const [isSignupMode, setIsSignupMode] = useState(false); // State to toggle between signup and login
  const [signUp] = useAdminSignUpMutation();
  const [adminLogin] = useAdminLoginMutation();
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);
    let res;
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (user) {
        const userEmail = user.email;
      if (userEmail) {
        res=  await adminLogin({
          email: userEmail, 
          password: password,
          name: '',
          library: '',
          _id: ''
        });
       
      } else {
        throw new Error('User email is null');
      }
        if ("data" in res) {
          toast.success(res.data.message);
          const data = await getAdmin(user.uid);
          console.log(data);
          dispatch(adminExist(data?.admin));
          // responseToast(res, navigate, "/cart");
        } else {
          const error = res.error as FetchBaseQueryError;
          const message = (error.data as MessageResponse).message;
          toast.error(message);
          dispatch(adminNotExist());
        }
      } else {
        throw new Error('admin is null');
      }
    } catch (error) {
      console.error('Admin login failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);
    try {
      setSignupLoading(true);
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      // Handle signup
      await signUp({
        name: name,
        email: email,
        password: password,
        library: library,
        _id: user.uid,
      });

      setName('');
      setEmail('');
      setPassword('');
      setLibrary('');
      setSignupLoading(false);
      setSignupError(null);
      setSignupErrorMessage(null);

    } catch (error:any) {
      setSignupError(error);
      setSignupErrorMessage(error.message);
      console.error('Admin signup failed:', error);
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-login">
      <main className='admin-login-management'>
        <article>
          <form onSubmit={isSignupMode ? handleSignup : handleLogin}>
            <h2>{isSignupMode ? 'Admin Signup' : 'Admin Login'}</h2>
            {isSignupMode && (
              <>
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div><label>Library</label>
                  <input
                    type="text"
                    placeholder="Library"
                    value={library}
                    onChange={(e) => setLibrary(e.target.value)}
                  />
                </div>

              </>
            )}
            <div>
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSignupMode ? (signupLoading ? 'Signing up...' : 'Sign up') : 'Sign in'}
            </button>
            {signupError && <p>Error: {signupErrorMessage}</p>}
            <p>{isSignupMode ? 'Already have an account?' : "Don't have an account?"} <button type="button" onClick={() => setIsSignupMode(!isSignupMode)}>{isSignupMode ? 'Admin Login' : 'Admin Sign up'}</button></p>
          </form>
        </article>
      </main>
    </div>
  );
};

export default AdminLogin;
