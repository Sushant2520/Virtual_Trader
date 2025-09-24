import React from 'react'; import { Routes, Route, Navigate } from 'react-router-dom'; import Login from './pages/Login'; import Dashboard from './pages/Dashboard'; import History from './pages/History';
function Private({children}){ const token=localStorage.getItem('token'); return token?children:<Navigate to='/login'/>; }
export default function App(){ return (<Routes><Route path='/login' element={<Login/>}/><Route path='/history' element={<Private><History/></Private>} /><Route path='/' element={<Private><Dashboard/></Private>} /></Routes>); }
