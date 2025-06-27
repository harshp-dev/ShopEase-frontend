import { useDispatch, useSelector } from 'react-redux';
import ToastProvider from './components/common/ToastProvider';
import AppRoutes from './routes/AppRoutes';
import { useEffect,useRef } from 'react';
import Cookies from 'js-cookie';
import { fetchMe } from './redux/slices/auth';
import { useLocation } from 'react-router-dom';
import LoadingSpinner from './components/common/LoadingSpinner';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);

  const token = Cookies.get('accessToken');
  const hasFetched = useRef(false);

  const isAuthRoute = ['/login', '/register', '/forgot-password', '/reset-password'].some((path) =>
    location.pathname.startsWith(path)
  );

  useEffect(() => {
    if (token && !hasFetched.current) {
      dispatch(fetchMe());
      hasFetched.current = true;
    }
  }, [dispatch, token]);

  if (loading && token && !isAuthRoute) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <AppRoutes />
      <ToastProvider position="top-right" autoClose={3000} hideProgressBar={false} />
    </>
  );
};

export default App;
