import { HiOutlineLockClosed } from 'react-icons/hi';
import { useFormik } from 'formik';
import { message } from '../../components/message';
import { useState } from 'react';
import Button from '../../components/UI/Button';
import { isSamePassword, isValidPassword } from '../../libs/password';
import { changeUserPassword } from '../../services/users';
function Password() {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      newPasswordAgain: '',
    },
    onSubmit: (values) => {
      const { newPassword, newPasswordAgain } = values;

      if (loading) return;

      setLoading(true);

      if (!isSamePassword(newPassword, newPasswordAgain)) {
        message.error('New password and re-enter password are not the same');
        setLoading(false);
        return;
      }

      if (!isValidPassword(newPassword)) {
        message.error(`Your password is invalid. See the checklist above`);
        setLoading(false);
        return;
      }

      changeUserPassword(newPassword)
        .then((res) => {
          message.success('Change password successfully');
        })
        .catch((err) => {
          const code = err.code || 'NO_ERROR_CODE';
          console.error(code);
          message.error('Change password error: ' + code);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className='shadow sm:rounded-md sm:overflow-hidden'>
          <div className='advanced-setting-card'>
            <div>
              <h3 className='title'>Password</h3>
              <p className='paragraph'>
                Your new password must be followed these rules:
              </p>

              <ul className='mt-5 paragraph list-disc pl-8'>
                <li>Should be 8-16 characters</li>
                <li>Have uppercase letter</li>
                <li>Have lowercase letter</li>
                <li>Have at least 1 digit</li>
                <li>And not have spaces</li>
              </ul>
            </div>

            <div className='grid grid-cols-3 gap-6'>
              <div className='form-control col-span-3 sm:col-span-2'>
                <label htmlFor='newPassword'>New password</label>
                <div className='mt-1 relative rounded-md shadow-sm'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <HiOutlineLockClosed
                      className='h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                  </div>

                  <input
                    type='password'
                    name='newPassword'
                    id='newPassword'
                    onChange={formik.handleChange}
                    value={formik.values.newPassword}
                    className='focus:ring-yellow-400 focus:border-yellow-400 block w-full pl-10 sm:text-sm border-gray-300 rounded-md'
                    placeholder=''
                  />
                </div>
              </div>
              <div className='form-control col-span-3 sm:col-span-2'>
                <label htmlFor='new-password-again'>
                  Re-enter new password
                </label>
                <div className='mt-1 relative rounded-md shadow-sm'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <HiOutlineLockClosed
                      className='h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                  </div>

                  <input
                    type='password'
                    name='newPasswordAgain'
                    id='newPasswordAgain'
                    onChange={formik.handleChange}
                    value={formik.values.newPasswordAgain}
                    className='focus:ring-yellow-400 focus:border-yellow-400 block w-full pl-10 sm:text-sm border-gray-300 rounded-md'
                    placeholder=''
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='card-bottom'>
            <Button submit>Save</Button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Password;
