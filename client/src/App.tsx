import React, { useState } from 'react';
import NoteItem from './note-item';
import './App.css';
import './note-item';
const { v4 } = require('uuid');
type Note = {
  id: number;
  title: string;
  content: string;
};
const App = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: 'First Title',
      content: 'First content and so on and so forth',
    },
    {
      id: 2,
      title: '2 Title',
      content: '2 content and so on and so forth',
    },
    {
      id: 3,
      title: '3 Title',
      content: '3 content and so on and so forth',
    },
    {
      id: 4,
      title: '4 Title',
      content: '4 content and so on and so forth',
    },
  ]);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const note: Note = {
      title,
      content,
      id: v4(),
    };
    setNotes([note, ...notes]);
    setTitle('');
    setContent('');
  };
  return (
    <div className="app-container">
      <form className="note-form" onSubmit={handleSubmit}>
        <input
          value={title}
          placeholder="title"
          required
          onChange={(e: React.FormEvent) => {
            setTitle((e.target as HTMLInputElement).value);
          }}
        ></input>
        <textarea
          value={content}
          placeholder="Content"
          rows={10}
          required
          onChange={(e: React.FormEvent) => {
            setContent((e.target as HTMLInputElement).value);
          }}
        ></textarea>
        <button type="submit">Add Note </button>
      </form>

      <div className="notes-grid">
        {notes.map((note) => (
          <NoteItem key={note.id} title={note.title} content={note.content} />
        ))}
      </div>
    </div>
  );
};

export default App;
