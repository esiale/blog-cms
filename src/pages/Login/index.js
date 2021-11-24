import ErrorMessage from './components/ErrorMessage';
import ax from '../../common/config/axios/axiosConfig';
import { set, useForm } from 'react-hook-form';
import { error, setError } from '../../common/hooks/useApiError';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const token = await ax.post(`/user/login`, {
        username: data.username,
        password: data.password,
      });
    } catch (err) {}
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
