import CommomForm from '@/components/common/CommomForm';
import { LoginFormControls, registerFormControls } from '@/config';
import { toast } from '@/hooks/use-toast';
import { loginUser } from '@/redux/slice/AuthSlice';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'

const Login = () => {
  const dispath = useDispatch();
  const initialState ={
    
    email : '',
    password :''
  }
  const onSubmit = (event) =>{
    event.preventDefault();
    dispath(loginUser(formnData)).then((data) =>{
      if(data?.payload?.success){
        toast({
          title:data?.payload?.message
        })
      }else{
        toast({
          title:data?.payload?.message,
          variant : "destructive"
        })
      }
    })

  }
    const [formnData,setFormData] = useState(initialState);
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
         <h1 className='text-3xl font-bold -tracking-tight text-foreground'>Sign in to your account</h1>
          <p className='mt-2'>Don't  have an account 
          <Link className='font-medium text-primary hover:underline ml-2' to='/auth/register'>Register</Link>
          </p>
          
      </div>
      <CommomForm
        formControls={LoginFormControls}
        buttonText={"Login"}
        formData={formnData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default Login