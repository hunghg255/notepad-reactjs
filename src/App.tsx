import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import LayoutClear from './components/Layout/LayoutClear';
import PrivateRoute from './components/PrivateRoute';
import Checking from './containers/Checking';
import EmailVerification from './containers/EmailVerification';
import Pad from './containers/Pad';
import PadContent from './containers/Pads/PadContent';
import PadEmpty from './containers/Pads/PadEmpty';
import Signin from './containers/Signin';
import Signout from './containers/Signout';
import Signup from './containers/Signup';
import { AuthenProvider } from './providers/Authenticator';

const lz = React.lazy;

const LayoutSetting = lz(() => import('./components/Layout/LayoutSetting'));
const Profile = lz(() => import('./containers/AdvancedSettings/Profile'));
const Password = lz(() => import('./containers/AdvancedSettings/Password'));
const Plan = lz(() => import('./containers/AdvancedSettings/Plan'));
const NotFound = lz(() => import('./containers/NotFound'));

function App() {
  return (
    <div className='App'>
      <AuthenProvider>
        <Routes>
          <Route path='/' element={<LayoutClear />}>
            <Route index element={<Checking />} />
            <Route path='signin' element={<Signin />} />
            <Route path='signout' element={<Signout />} />
            <Route path='signup' element={<Signup />} />
            <Route path='email-verification' element={<EmailVerification />} />
          </Route>

          <Route path='/app' element={<Layout />}>
            <Route
              path='pad'
              element={
                <PrivateRoute>
                  <Pad />
                </PrivateRoute>
              }
            >
              <Route index element={<PadEmpty />}></Route>
              <Route path=':id' element={<PadContent />}></Route>
            </Route>
          </Route>

          <Route
            path='setting'
            element={
              <PrivateRoute>
                <React.Suspense fallback={<>...</>}>
                  <LayoutSetting />
                </React.Suspense>
              </PrivateRoute>
            }
          >
            <Route path='profile' element={<Profile />}></Route>
            <Route path='password' element={<Password />}></Route>
            <Route path='plan' element={<Plan />}></Route>
            <Route path='*' element={<NotFound />}></Route>
          </Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </AuthenProvider>
    </div>
  );
}

export default App;
