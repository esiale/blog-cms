import useInterceptAxiosErrors from '../../common/hooks/useInterceptAxiosErrors';

const ApiLoader = () => {
  const [loading] = useInterceptAxiosErrors();
  return <div>{loading ? 'loading' : 'not loading'}</div>;
};

export default ApiLoader;
