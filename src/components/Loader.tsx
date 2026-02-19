import pokeballImg from "../assets/pokeball.png";

type LoaderProps = {
  label?: string;
  size?: number;
  className?: string;
};

export default function Loader({
  label = "Chargement...",
  size = 64,
  className = "",
}: LoaderProps) {
  const style = { width: size, height: size };

  return (
    <div
      className={`flex flex-col items-center gap-3 text-white/80 ${className}`}
      role="status"
      aria-live="polite"
    >
      <div
        className="relative flex items-center justify-center pokeball-float"
        style={style}
      >
        <img
          src={pokeballImg}
          alt="Pokéball"
          className="relative w-full h-full object-contain drop-shadow-[0_8px_14px_rgba(0,0,0,0.35)]"
        />
      </div>
      {label ? (
        <p className="text-sm font-medium tracking-wide text-white/70">
          {label}
        </p>
      ) : null}
    </div>
  );
}
