import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastProvider = () => (
  <ToastContainer position="top-right" autoClose={1200} hideProgressBar={false} theme="colored" />
);

export default ToastProvider;
