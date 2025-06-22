import { useDispatch } from 'react-redux';
import ToastProvider from './components/common/ToastProvider';
import AppRoutes from './routes/AppRoutes';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { getUser } from './services/AuthService';
import { setCredentials } from './redux/slices/auth';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeUser = async () => {
      const token = Cookies.get('accessToken');
      if (token) {
        const user = await getUser();
        if (user) {
          dispatch(setCredentials({ user }));
        }
      }
    };

    initializeUser();
  }, []);

  return (
    <>
      <AppRoutes />
      <ToastProvider position="top-right" autoClose={3000} hideProgressBar={false} />
    </>
  );
};

export default App;
