import useAuth from '../../common/hooks/useAuth';

const Dashboard = () => {
  const { signOut } = useAuth();

  return (
    <div>
      Logged in
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
};

export default Dashboard;
