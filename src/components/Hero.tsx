import HeroBackdrop from "./HeroBackdrop";

export default function Hero() {
  return (
    <div className="snap-center overflow-x-clip relative flex min-h-[90vh] items-center justify-center">
      <div className="z-10 text-white space-y-8">
        <h1 className="font-display text-7xl sm:text-8xl md:text-9xl">
          Orpheus
        </h1>
        <p className="text-lg font-semibold">
          Collection of Poems — <i>Krish Gupta</i>
        </p>
      </div>

      <HeroBackdrop />
    </div>
  );
}
