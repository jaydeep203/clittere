import React, { useCallback, useState } from 'react';
import useLoginModal from '@/hook/useLoginModal';
import Input from "../Input";
import Modal from '../Modal';
import useRegisterModal from '@/hook/useRegisterModal';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal= useRegisterModal();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(()=>{
    if(isLoading){
      return;
    }

    loginModal.onClose();
    registerModal.onOpen();

  },[isLoading, loginModal, registerModal]);

  const onSubmit = useCallback(async()=>{
    try {
      setIsLoading(true);
      await signIn("credentials", {
        email,
        password,
        redirect:false
      });

      toast.success("Logged in Success.");

      loginModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong.");
    }finally{
      setIsLoading(false);
    }
  }, [email, password, loginModal]);

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
        placeholder={'password'}
        type='password'
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className='text-neutral-400 text-center mt-4'>
      <p>First time using Twitter? 
        <span
        onClick={onToggle}
        className='text-white cursor-pointer hover:underline'> Create An Account</span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='login'
      actionLabel='Sign In'
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal