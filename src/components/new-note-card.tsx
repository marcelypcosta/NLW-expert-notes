import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void;
}

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShowOnBording, setShouldShowOnBording] = useState(true); // Estado para criar a nota
  const [content, setContent] = useState(""); // Estado para saber se possui conteúdo

  // Função para aparecer a área para escrever/gravar a nota
  function handleStartEditor() {
    setShouldShowOnBording(false);
  }

  // Função para quando o usuário apagar toda a nota voltar para primeira tela do Modal
  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value); // Pegando o valor que o usuário está digitando na nota

    if (event.target.value === "") {
      setShouldShowOnBording(true);
    }
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault();

    onNoteCreated(content); // Criando a nota recebendo o conteúdo (função do App())
    setContent(""); // Resetando o textarea quando salvo a nota
    setShouldShowOnBording(true) // Retornando para tela para criação

    toast.success("Nota criada com sucesso");
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md flex flex-col bg-slate-700 text-left p-5 gap-3 outline-none hover:ring-2 hover:ring-slate-600 hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto
          automaticamente.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-8 fixed bg-black/50" />
        <Dialog.Content className="fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] h-[60vh] w-full bg-slate-700 rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>
          <form onSubmit={handleSaveNote} className="flex-1 flex flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                Adicionar nota
              </span>
              {/* Condição ternária para criação da nota */}
              {shouldShowOnBording ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece{" "}
                  <button className="font-medium text-lime-400 hover:underline">
                    gravando uma nota em áudio
                  </button>{" "}
                  ou se preferir{" "}
                  <button
                    onClick={handleStartEditor}
                    className="font-medium text-lime-400 hover:underline"
                  >
                    utlize apenas texto.
                  </button>
                </p>
              ) : (
                <textarea
                  autoFocus
                  placeholder="Escreva aqui sua anotação..."
                  className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                  onChange={handleContentChanged}
                  value={content}
                />
              )}
            </div>
            {shouldShowOnBording ? (
              ""
            ) : (
              <button
                type="submit"
                className="w-full bg-lime-400 py-4 text-center text-sm text-slate-950 outline-none font-medium hover:bg-lime-500"
              >
                Salvar nota
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
