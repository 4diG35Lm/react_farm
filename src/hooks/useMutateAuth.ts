import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useAppDispatch } from '../app/hooks';
import { resetEditedTask, toggleCsrfState } from '../slices/appSlice';
import { User } from '../types/types';

export const useMutateAuth = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const loginMutation = useMutation(
    async (user: User) => 
    await axios.post("http://tk2-410-46272.vs.sakura.ne.jp:8000/api/login", user, {
      withCredentials: true,
    }),    
    {
      onSuccess: () => {
        navigate('/todo',{state: {message: 'success', type: 'success'}})
      },
      onError: (err: any) => {
        alert(`${err.response.data.detail}\n${err.message}`)
        if (err.response.data.detail === 'The CSRF token has expired.') {
          dispatch(toggleCsrfState())
       }
      },
    }
  )
  const registerMutation = useMutation(
    async (user: User) => 
      await axios.post("http://tk2-410-46272.vs.sakura.ne.jp:8000/api/register", user),
    {
      onError: (err: any) => {
        alert(`${err.response.data.detail}\n${err.message}`);
        if (err.response.data.detail  === "The CSRF token has expired."){
          dispatch(toggleCsrfState());
        }
      },
    } 
  )
  const logoutMutation = useMutation(
    async () => 
      await axios.post(
        "http://tk2-410-46272.vs.sakura.ne.jp:8000/api/logout",
        {},
        {
          withCredentials: true,
        }
      ),
    {
      onSuccess: () => {
        navigate('/')
      },
      onError: (err: any) => {
        alert(`${err.response.data.detail}\n${err.message}`)
        if (err.response.data.detail === 'The CSRF token has expired.') {
          dispatch(toggleCsrfState())
          dispatch(resetEditedTask())
          navigate('/')
        }
      }, 
    }
  )
  return { loginMutation, registerMutation, logoutMutation }
}