import { Outlet } from 'react-router-dom';

export default function LayoutClear() {
  return (
    <main className='layout-clear'>
      <Outlet />
    </main>
  );
}
