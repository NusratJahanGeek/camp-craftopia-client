import { useQuery } from '@tanstack/react-query';

const useUsers = () => {
  const { data: users = [], refetch, isLoading } = useQuery(
    ['users'],
    async () => {
      const res = await fetch('https://camp-craftopia-server.vercel.app/users');
      return res.json();
    }
  );

  return [users, refetch, isLoading];
};

export default useUsers;
