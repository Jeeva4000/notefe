
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function CreateNotes() {
    const [note, SetNote] = useState({
        title: '',
        content: '',
        date: ''
    })
    const navigate = useNavigate()

    const onChangeInput = e => {
        const { name, value } = e.target;
        SetNote({ ...note, [name]: value })
    }

    const createNote = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('tokenStore')
            if (token) {
                const { title, content, date } = note;
                const newNote = {
                    title, content, date
                }
                await axios.post('https://nt-psow.onrender.com/api/notes', newNote, {
                    headers: { Authorization: token }
                })
                return navigate.push('/')
            }

        } catch (error) {
            window.location.href = "/"
        }
    }

    return (
        <div className='create-note'>
            <h2>Create Note</h2>
            <form onSubmit={createNote} autoComplete='off'>
                <div className='row'>
                    <label htmlFor='title'>Title</label>
                    <input type='text' value={note.title} id="title" name="title" required onChange={onChangeInput} />
                </div>
                <div className='row'>
                    <label htmlFor='content'>Content</label>
                    <textarea type='text' value={note.content} id="content" name="content" required rows="10" onChange={onChangeInput} />
                </div>
                <label htmlFor='title'>Date: {note.date} </label>
                <div className='row'>

                    <input type='date' id="date" name="date" required onChange={onChangeInput} />
                </div>
                <button type='submit'>Save</button>
            </form>
        </div>
    )
}
