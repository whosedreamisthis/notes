import React from 'react';

export default function NoteItem({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <>
      <div className="note-item">
        <div className="notes-header">
          <button>x</button>
        </div>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </>
  );
}
