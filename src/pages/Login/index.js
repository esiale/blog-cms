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
      // navigate(from, { replace: true });
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('username', { required: true, maxLength: 20 })} />
        {errors.username?.type === 'required' && (
          <ErrorMessage error="Username is required." />
        )}
        {errors.username?.type === 'maxLength' && (
          <ErrorMessage error="Username must be shorter than 20 characters." />
        )}
        <input
          type="password"
          {...register('password', { required: true, minLength: 6 })}
        />
        {errors.password && (
          <ErrorMessage error={'Password must be 6 characters or more.'} />
        )}
        <input type="submit" />
      </form>
    </div>
  );
};

export default Login;
