import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css';
import Login from './components/Login';
import Notes from './components/Notes';
// import { Router } from 'react-router-dom';

function App() {

  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem('tokenStore')
      if (token) {
        const verified = await axios.get('https://nt-psow.onrender.com/users/verify', {
          headers: { Authorization: token }
        })
        console.log(verified)
        setIsLogin(verified.data)
        if (verified.data === false) return localStorage.clear()
      } else {
        setIsLogin(false)
      }
    }
    checkLogin()
  }, [])

  return (
    <div className="App">

      {
        isLogin
          ? <Notes setIsLogin={setIsLogin} />
          : <Login setIsLogin={setIsLogin} />
      }

    </div>
  );
}

export default App;



// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Notes from './components/Notes';
// import Login from './components/Login';
// import axios from 'axios';

// function App() {
//   const [isLogin, setIsLogin] = useState(false);

//   useEffect(() => {
//     const checkLogin = async () => {
//       const token = localStorage.getItem('tokenStore');
//       if (token) {
//         try {
//           const verified = await axios.get(
//             'https://nt-psow.onrender.com/users/verify',
//             {
//               headers: { Authorization: token },
//             }
//           );
//           console.log(verified);
//           setIsLogin(verified.data);
//           if (verified.data === false) return localStorage.clear();
//         } catch (error) {
//           console.error('Error verifying token:', error);
//         }
//       } else {
//         setIsLogin(false);
//       }
//     };
//     checkLogin();
//   }, []);

//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/notes" element={isLogin ? <Notes setIsLogin={setIsLogin} /> : <Login setIsLogin={setIsLogin} />} />
//           <Route path="/" element={isLogin ? <Notes setIsLogin={setIsLogin} /> : <Login setIsLogin={setIsLogin} />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
