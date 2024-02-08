import { useState } from "react";
import Logo from "./assets/logo-nlw-extends-notes.svg";
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";

interface Note {
  id: string;
  date: Date;
  content: string;
}

export function App() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem("notes"); // Busca o item 'notes

    // Condição que se tiver o item 'notes' retorna tudo que esta lá
    if (notesOnStorage) { 
      return JSON.parse(notesOnStorage);
    }
  }); // Definindo o formato do estado com lista '<Note[]> e mostrando todas as notas salvas no Local Storage

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(), // cria números aleatórios como string para ID, que nunca se repetem
      date: new Date(),
      content,
    };

    const notesArray = [newNote, ...notes];

    setNotes(notesArray); // Juntando a nota criada com as anteriores deixando em ordem de salvamento

    localStorage.setItem("notes", JSON.stringify(notesArray)); // Salvando as notas no Local Storage
  }

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={Logo} alt="NLW Expert" />

      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-3 auto-rows-[250px] gap-6">
        <NewNoteCard onNoteCreated={onNoteCreated} />
        {notes.map((note) => {
          return <NoteCard key={note.id} note={note} />;
        })}
      </div>
    </div>
  );
}
