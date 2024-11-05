import CommomForm from '@/components/common/CommomForm';
import { registerFormControls } from '@/config';
import { toast } from '@/hooks/use-toast';
import { registerUser } from '@/redux/slice/AuthSlice';
import { Toast } from '@radix-ui/react-toast';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const initialState ={
    userName:'',
    email : '',
    password :''
  }
  const dispatch = useDispatch()
  const onSubmit = (event) =>{
    event.preventDefault();
   dispatch(registerUser(formnData)).then((data) =>{
   if(data?.payload.success){
    toast({
      title:data?.payload?.message,
    });
    navigate('/auth/login')    
   }else{
    toast({
      title:data?.payload?.message,
      variant:'destructive'
    });
   }
   })
  }
    const [formnData,setFormData] = useState(initialState);
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
         <h1 className='text-3xl font-bold -tracking-tight text-foreground'>Create new account</h1>
          <p className='mt-2'>Already have an account 
          <Link className='font-medium text-primary hover:underline ml-2' to='/auth/login'>Login</Link>
          </p>
          
      </div>
      <CommomForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formnData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default Register