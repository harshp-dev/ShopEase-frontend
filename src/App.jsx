import ToastProvider from './components/common/ToastProvider';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <>
      <AppRoutes />
      <ToastProvider position="top-right" autoClose={3000} hideProgressBar={false} />
    </>
  );
};

export default App;
