import React,  { useEffect } from 'react';
import axios from "axios";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CsrfToken } from './types/types';
import { useAppSelector } from './app/hooks';
import { selectCsrfState } from "./slices/appSlice";
import { Auth } from './components/Auth';
import { Todo } from './components/Todo';

function App() {
  const csrf = useAppSelector(selectCsrfState);
  useEffect(() => {
    const getCsrfToken = async () => {
      const res = await axios.get<CsrfToken>(
        "http://tk2-410-46272.vs.sakura.ne.jp:8000/api/csrftoken"
      )
      axios.defaults.headers.common['X-CSRF-Token'] = res.data.csrf_token
    }
    getCsrfToken()
  }, [csrf])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Auth />
        </Route>
        <Route path="/todo">
          <Todo />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
