import ErrorMessage from './components/ErrorMessage';
import useAuth from '../../common/hooks/useAuth';
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
  const from = location.state?.from?.pathname || '/';

  const onSubmit = async (userInfo) => {
    try {
      await signIn(userInfo);
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-full bg-ship-cove-50 flex flex-col justify-center items-center gap-6">
      <div className="text-3xl text-spun-pearl-800">Authorization</div>
      <form
        className="w-full max-w-sm flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          aria-label="Username"
          placeholder="Username"
          className="p-2 border-b-2 rounded-t border-spun-pearl-600 focus:outline-none transform focus:scale-105 transition-transform duration-200 ease-in-out"
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
          className="mt-7 p-2 border-b-2 rounded-t border-spun-pearl-600 focus:outline-none transform focus:scale-105 transition-transform duration-200 ease-in-out"
          type="password"
          {...register('password', { required: true, minLength: 6 })}
        />
        {errors.password && (
          <ErrorMessage error={'Password must be 6 characters or more.'} />
        )}
        <input
          className="mt-7 p-2 bg-spun-pearl-600 rounded-sm text-white font-bold hover:bg-spun-pearl-700 transition-bg duration-200 ease-in-out"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Login;
