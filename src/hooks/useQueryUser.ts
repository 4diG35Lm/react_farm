import { useQuery } from 'react-query';
import axios from 'axios';
import { UserInfo } from '../types/types';
import { useNavigate } from 'react-router-dom';

export const useQueryUser = () => {
  const navigate = useNavigate();
  const getCurrentUser = async () => {
    const { data } = await axios.get<UserInfo>( 
      "http://tk2-410-46272.vs.sakura.ne.jp:8000/api/user",
      {
        withCredentials: true,
      }
    )
    return data
  }
  return useQuery({
    queryKey: 'user',
    queryFn: getCurrentUser,
    staleTime: Infinity,
    onError: () => navigate('/'),
  }) 
}