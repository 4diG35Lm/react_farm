import { useQuery } from "react-query";
import axios from "axios";
import { Task } from "../types/types";

export const useQueryTasks = () => {
  const getTasks = async () => {
    const { data } =  await axios.get<Task[]>(
      "http://tk2-410-46272.vs.sakura.ne.jp:8000/api/todo",
      {
        withCredentials: true,
      }
    )
    return data
  }
  return useQuery<Task[], Error>({
    queryKey: 'tasks',
    queryFn: getTasks,
    staleTime: Infinity,
  })
}