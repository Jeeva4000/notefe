// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function EditNote({ match }) {
//     const [note, setNote] = useState({
//         title: '',
//         content: '',
//         date: '',
//         id: ''
//     });
//     const navigate = useNavigate();

//     useEffect(() => {
//         const getNote = async () => {
//             const token = localStorage.getItem('tokenStore');
//             if (match && match.params && match.params.id) {
//                 try {
//                     const res = await axios.get(`https://nt-psow.onrender.com/api/notes/${match.params.id}`, {
//                         headers: { Authorization: token }
//                     });
//                     setNote({
//                         title: res.data.title,
//                         content: res.data.content,
//                         date: new Date(res.data.date).toLocaleDateString(),
//                         id: res.data._id
//                     });
//                 } catch (error) {
//                     console.error('Error fetching note:', error);

//                 }
//             }
//         };
//         getNote();
//     }, [match]);

//     const onChangeInput = (e) => {
//         const { name, value } = e.target;
//         setNote({ ...note, [name]: value });
//     };

//     const editNote = async (e) => {
//         e.preventDefault();
//         try {
//             const token = localStorage.getItem('tokenStore');
//             if (token) {
//                 const { title, content, date, id } = note;

//                 // Check if any of the required fields are empty
//                 if (!title || !content || !date) {
//                     console.error('Please fill in all the fields');
//                     return;
//                 }

//                 const newNote = {
//                     title,
//                     content,
//                     date: new Date(date).toISOString(),
//                 };

//                 await axios.put(`https://nt-psow.onrender.com/api/notes/${id}`, newNote, {
//                     headers: { Authorization: token }
//                 });

//                 navigate('/');
//             }
//         } catch (err) {
//             console.error('Error editing note:', err);
//         }
//     };
//     return (
//         <div className="create-note">
//             <h2>Edit Note</h2>
//             <form onSubmit={editNote} autoComplete="off">
//                 <div className="row">
//                     <label htmlFor="title">Title</label>
//                     <input type="text" value={note.title} id="title"
//                         name="title" required onChange={onChangeInput} />
//                 </div>

//                 <div className="row">
//                     <label htmlFor="content">Content</label>
//                     <textarea type="text" value={note.content} id="content"
//                         name="content" required rows="10" onChange={onChangeInput} />
//                 </div>

//                 <label htmlFor="date">Date: {note.date} </label>
//                 <div className="row">
//                     <input type="date" id="date"
//                         name="date" onChange={onChangeInput} />
//                 </div>

//                 <button type="submit">Save</button>
//             </form>
//         </div>
//     )
// }



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function EditNote({ match }) {
    const [note, setNote] = useState({
        title: '',
        content: '',
        date: '',
        id: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const getNote = async () => {
            const token = localStorage.getItem('tokenStore');
            if (match && match.params && match.params.id) {
                try {
                    const res = await axios.get(`https://nt-psow.onrender.com/api/notes/${match.params.id}`, {
                        headers: { Authorization: token }
                    });
                    setNote({
                        title: res.data.title,
                        content: res.data.content,
                        date: new Date(res.data.date).toISOString().split('T')[0], // Format date correctly
                        id: res.data._id
                    });
                } catch (error) {
                    console.error('Error fetching note:', error);
                }
            }
        };
        getNote();
    }, [match]);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setNote((prevNote) => ({ ...prevNote, [name]: value }));
    };

    const editNote = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('tokenStore');
            if (token) {
                const { title, content, date, id } = note;

                // Check if any of the required fields are empty
                if (!title || !content || !date) {
                    console.error('Please fill in all the fields');
                    return;
                }

                const newNote = {
                    title,
                    content,
                    date: new Date(date).toISOString(),
                };

                await axios.put(`https://nt-psow.onrender.com/api/notes/${id}`, newNote, {
                    headers: { Authorization: token }
                });

                navigate('/');
            }
        } catch (err) {
            console.error('Error editing note:', err);
        }
    };

    return (
        <div className="create-note">
            <h2>Edit Note</h2>
            <form onSubmit={editNote} autoComplete="off">
                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" value={note.title} id="title"
                        name="title" required onChange={onChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" value={note.content} id="content"
                        name="content" required rows="10" onChange={onChangeInput} />
                </div>

                <label htmlFor="date">Date: {note.date} </label>
                <div className="row">
                    <input type="date" id="date"
                        name="date" value={note.date} onChange={onChangeInput} />
                </div>

                <button type="submit">Save</button>
            </form>
        </div>
    );
}
