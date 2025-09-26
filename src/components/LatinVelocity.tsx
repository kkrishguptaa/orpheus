import ScrollVelocity from './ui/scroll-velocity';

export default function LatinVelocity() {
  const texts = ['Carpe Diem', 'Memento Mori', 'Cogito, Ergo Sum'];
  return (
    <div className="py-12">
      <ScrollVelocity texts={texts} />
    </div>
  );
}
