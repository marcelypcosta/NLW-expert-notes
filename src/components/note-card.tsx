export function NoteCard() {
  return (
    <button className="rounded-md text-left bg-slate-800 p-5 space-y-3 outline-none overflow-hidden relative hover:ring-2 hover:ring-slate-600 hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-lime-400">
      <span className="text-sm font-medium text-slate-300">Há 2 dias</span>
      <p className="text-sm leading-6 text-slate-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
        facilis iste dicta eum quisquam laborum ratione voluptatibus vitae quam
        esse nemo consequatur sunt quaerat, dolore natus dolor eveniet maiores!
        Ab. Dicta rem odio exercitationem cumque sed? Fugiat obcaecati amet
        earum perferendis aperiam, totam at placeat! Atque non iste quos dolor
        exercitationem culpa cum, ea ratione repudiandae. Ratione odit
        necessitatibus ipsam?
      </p>
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-slate-800/0 to-slate-950/60 pointer-events-none" />
    </button>
  );
}
