import Form from 'rc-field-form';
import { HiKey, HiOutlineLockClosed, HiOutlineMail } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import FormItem from '../components/UI/FormItem';
import Input from '../components/UI/Input';

import { useSign } from '../services/sign';

function Signin() {
  const { reqSignIn } = useSign();

  const handleSubmit = (values: any) => {
    reqSignIn.run({ email: values?.email, password: values?.password });
  };

  return (
    <div>
      <div className='sign-container'>
        <div className='sign sign-in'>
          <h2 className='sign-title flex items-center gap-3'>
            <HiKey className='h-7 w-7 rounded-full text-green-500 p-1.5 bg-green-100' />
            <span>Welcome to Notepad</span>
          </h2>
          <p className='sign-desc'>Please enter your email and password</p>

          <Form className='sign-form mt-8' onFinish={handleSubmit}>
            <div className='input-group'>
              <div className='mt-1 relative rounded-md'>
                {/* <div className=' inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <HiOutlineMail
                    className='h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                </div> */}
                <FormItem
                  name='email'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your email',
                    },
                  ]}
                >
                  <Input
                    type='email'
                    placeholder='Email'
                    prefixIcon={
                      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <HiOutlineMail
                          className='h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
                      </div>
                    }
                  />
                </FormItem>
              </div>
            </div>

            <div className='input-group'>
              <div className='mt-1 relative rounded-md'>
                <FormItem
                  name='password'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password',
                    },
                  ]}
                >
                  <Input
                    type='password'
                    placeholder='Password'
                    prefixIcon={
                      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <HiOutlineLockClosed
                          className='h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
                      </div>
                    }
                  />
                </FormItem>
              </div>
            </div>

            <div className='input-group'>
              <button
                type='submit'
                className='inline-flex w-full uppercase justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-yellow-900 bg-yellow-400 hover:bg-yellow-300'
              >
                Sign in
              </button>
            </div>

            <div className='input-group'>
              <p className='text-gray-400 text-xs'>
                Don't have an account yet?{' '}
                <Link
                  to={'/signup'}
                  className='text-yellow-600 hover:underline'
                >
                  Create Account
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Signin;
