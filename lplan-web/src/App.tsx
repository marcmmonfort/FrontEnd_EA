import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import of Pages ...
import Home from './pages/home.page/home.page';
import LoginForm from './pages/login.page/login.page';
import RegisterForm from './pages/register.page/register.page';
import Feed from './pages/feed.page/feed.page';
import Discovery from './pages/discovery.page/discovery.page';
import Messages from './pages/messages.page/messages.page';
import CalendarEvents from './pages/calendarevents.page/calendarevents.page';
import Profile from './pages/profile.page/profile.page';
import PageNotFound from './pages/pagenotfound.page/pagenotfound.page';

// Import of Components ...
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import { Auth } from './models/auth.model';
import logo from './logo.svg';
import './App.css';
import { User } from './models/user.model';

function App() {
  const handleRegister = async (authData: any) => {
    // Aquí puedes enviar los datos del formulario a un servidor y procesar la respuesta
    console.log('Datos del formulario de REGISTRO:', authData);
  };
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<LoginForm onSubmit={function (auth: Auth): void {
            throw new Error('Function not implemented.');
          } } />} />
          <Route path='register' element={<RegisterForm onSubmit={handleRegister}/>} />
          <Route path='feed' element={<Feed />} />
          <Route path='discovery' element={<Discovery />} />
          <Route path='messages' element={<Messages />} />
          <Route path='calendarevents' element={<CalendarEvents />} />
          <Route path='profile' element={<Profile />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;