import { useEffect, useState } from 'react';

import Modal from '../Modal';
import { IoInformationOutline } from 'react-icons/io5';
import { useModalStore } from '../../store/modal';
import { message } from '../message';

function Autoupdate() {
  const updateStatus = useModalStore((state) => state.modals.update);
  const setUpdateStatus = useModalStore((state) => state.setVisible);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(updateStatus);
  }, [updateStatus]);

  useEffect(() => {
    setUpdateStatus('update', visible);

    // eslint-disable-next-line
  }, [visible]);

  return (
    <>
      <Modal visible={visible} setVisible={setVisible}>
        <div className='sm:flex sm:items-start'>
          <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10'>
            <IoInformationOutline
              className='h-6 w-6 text-blue-600'
              aria-hidden='true'
            />
          </div>
          <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
            <h3 className='text-lg leading-6 font-medium text-gray-900 dark:text-gray-200'>
              New update available
            </h3>
            <div className='mt-2'>
              <p className='text-sm text-gray-500'>
                An update to the latest version is available. Would you like to
                install it now ?
              </p>
            </div>
          </div>
        </div>
        <div className='mt-5 sm:mt-4 sm:ml-10 sm:pl-4 sm:flex'>
          <button
            type='button'
            className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-yellow-900 bg-yellow-400 hover:bg-yellow-300 sm:w-auto sm:text-sm'
          >
            Update
          </button>
          <button
            type='button'
            className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white dark:bg-gray-600 dark:hover:bg-gray-700 dark:border-gray-600 dark:text-gray-100 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
            onClick={() => setVisible(false)}
            // ref={cancelButtonRef}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
}

export default Autoupdate;
