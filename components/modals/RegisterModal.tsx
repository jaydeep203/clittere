import React, { useCallback, useState } from 'react';
import useRegisterModal from '@/hook/useRegisterModal';
import Input from "../Input";
import Modal from '../Modal';
import useLoginModal from '@/hook/useLoginModal';
import axios from 'axios';
import {toast} from "react-hot-toast";
import {signIn} from "next-auth/react";

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(()=>{
    if(isLoading){
      return;
    }

    registerModal.onClose();
    loginModal.onOpen();

  },[isLoading, registerModal, loginModal]);

  const onSubmit = useCallback(async()=>{
    try {
      setIsLoading(true);
      await axios.post('/api/register', {
        name,
        email,
        username,
        password
      });

      toast.success("Account Created.");

      signIn('credentials',{
        email,
        password
      });

      registerModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong.");
    }finally{
      setIsLoading(false);
    }
  }, [registerModal, password, username, name, email]);

  const bodyContent = (
    <div className='
      flex flex-col gap-4
    '>
      <Input
        placeholder={'Email'}
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder={'Name'}
        onChange={(e)=>setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder={'Username'}
        onChange={(e)=>setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder={'password'}
        type='password'
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  )

  const footerContent = (
    <div className='text-neutral-400 text-center mt-4'>
      <p>Already have an account? 
        <span
        onClick={onToggle}
        className='text-white cursor-pointer hover:underline'> Sign In</span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title='Create an Account'
      actionLabel='Register'
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal;