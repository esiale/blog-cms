import ErrorMessage from './components/ErrorMessage';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      console.log(process.env);
      const token = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/login`,
        {
          username: data.username,
          password: data.password,
        }
      );
      console.log(token);
    } catch (err) {
      console.log(err.response);
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
