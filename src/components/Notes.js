import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './notes/Nav';
import Home from './notes/Home';
import CreateNotes from './notes/CreateNotes';
import EditNote from './notes/EditNote';

export default function Notes({ setIsLogin }) {
    return (
        <Router>
            <div className='notes-page'>
                <Header setIsLogin={setIsLogin} />
                <section>
                    <Routes>
                        <Route path='/' element={<Home />} exact />
                        <Route path='/create' element={<CreateNotes />} exact />
                        <Route path='/edit/:id' element={<EditNote />} exact />
                    </Routes>
                </section>
            </div>
        </Router>
    );
}
