import { useQuery } from 'react-query';
import axios from 'axios';
import { useAppDispatch } from '../app/hooks';
import { resetEditedTask, toggleCsrfState } from '../slices/appSlice';
import { Task } from '../types/types';
import { useNavigate } from 'react-router-dom';

export const useQuerySingleTask = (id: string) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const getSingleTask = async (id: string) => {
    const { data } = await axios.get<Task>(
      "http://tk2-410-46272.vs.sakura.ne.jp:8000/api/todo/${id}",
      {
        withCredentials: true,
      }
    )
    return data
  }
  return useQuery({ 
    queryKey: ['single', id], 
    queryFn: () => getSingleTask(id), 
    enabled: !!id, 
    staleTime: Infinity, 
    //cacheTime: 300000, 
    onError: (err: any) => { 
      alert(`${err.response.data.detail}\n${err.message}`) 
      if ( 
        err.response.data.detail === 'The JWT has expired' || 
        err.response.data.detail === 'The CSRF token has expired.' 
      ) { 
        dispatch(toggleCsrfState()) 
        dispatch(resetEditedTask()) 
        navigate('/') 
      } 
    }, 
  })
}
