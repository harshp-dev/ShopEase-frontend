import { useDispatch, useSelector } from 'react-redux';
import ToastProvider from './components/common/ToastProvider';
import AppRoutes from './routes/AppRoutes';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { fetchMe } from './redux/slices/auth';
import Loading from './components/common/Loading';

const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      dispatch(fetchMe());
    }
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <AppRoutes />
      <ToastProvider position="top-right" autoClose={3000} hideProgressBar={false} />
    </>
  );
};

export default App;
