import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const useBookings = () => {
    const {user} = useContext(AuthContext);

    const { refetch, data: bookings = [] } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const response = await fetch(`http://localhost:5000/bookings?email=${user?.email}`)
            return response.json();
        },
      })

      return [bookings, refetch]
    
}

export default useBookings;