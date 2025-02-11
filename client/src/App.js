import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateProduct from './pages/Admin/CreateProduct';
import CreateCategory from './pages/Admin/CreateCategory';
import Users from './pages/Admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Products from './pages/Admin/Products';

function App() {
  return (
    <>
      <ToastContainer /> {/* Display toast notifications */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        {/* Private Route */}
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='user' element={<Dashboard />} />
          <Route path='user/orders' element={<Orders />} />
          <Route path='user/profile' element={<Profile />} />
        </Route>
       
        <Route path='/dashboard' element={<AdminRoute />}>
          <Route path='admin' element={< AdminDashboard/>} />
          <Route path='admin/create-product' element={< CreateProduct/>} />
          <Route path='admin/products' element={< Products/>} />
          <Route path='admin/create-category' element={< CreateCategory/>} />
          <Route path='admin/users' element={< Users/>} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        {/* 404 Route */}
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
