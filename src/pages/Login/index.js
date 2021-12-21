import ErrorMessage from './components/ErrorMessage';
import useAuth from '../../common/hooks/useAuth';
import Footer from '../Layout/components/Footer';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn } = useAuth();
  const from = location.state?.from?.pathname || '/posts';

  const onSubmit = async (userInfo) => {
    try {
      await signIn(userInfo);
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-50 h-full flex flex-col justify-center items-center gap-6">
      <div className="text-3xl">Authorization</div>
      <form
        className="w-full max-w-sm flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          aria-label="Username"
          placeholder="Username"
          className="bg-gray-200 p-2 border-b-2 rounded-t border-ship-cove-600 focus:outline-none transform focus:scale-105 transition-transform duration-200 ease-in-out"
          {...register('username', { required: true, maxLength: 20 })}
        />
        {errors.username?.type === 'required' && (
          <ErrorMessage error="Username is required." />
        )}
        {errors.username?.type === 'maxLength' && (
          <ErrorMessage error="Username must be shorter than 20 characters." />
        )}
        <input
          aria-label="Password"
          placeholder="Password"
          className="bg-gray-200 mt-7 p-2 border-b-2 rounded-t border-ship-cove-600 focus:outline-none transform focus:scale-105 transition-transform duration-200 ease-in-out"
          type="password"
          {...register('password', { required: true, minLength: 6 })}
        />
        {errors.password && (
          <ErrorMessage error={'Password must be 6 characters or more.'} />
        )}
        <input
          className="mt-7 p-2 bg-ship-cove-500 rounded-sm text-white font-bold hover:bg-ship-cove-700 transition-bg duration-200 ease-in-out cursor-pointer"
          type="submit"
        />
      </form>
      <Footer />
    </div>
  );
};

export default Login;
