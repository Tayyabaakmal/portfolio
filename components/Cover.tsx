import Image from "next/image";

type Props = { src?: string | null; name: string; color: string; sizes?: string; aspect?: string; priority?: boolean; hint?: string };

/** Shows the real screenshot when it exists, otherwise a clearly-marked slot. */
export default function Cover({ src, name, color, sizes = "(min-width:768px) 40vw, 100vw", aspect = "aspect-[16/10]", priority, hint }: Props) {
  return (
    <div className={`relative w-full overflow-hidden ${aspect}`} style={{ background: color }}>
      {src ? (
        <Image src={src} alt={`${name} website screenshot`} fill sizes={sizes} priority={priority} className="object-cover object-top" />
      ) : (
        <div className="absolute inset-0 flex flex-col justify-between p-5 text-paper/90">
          <span className="display text-3xl md:text-4xl">{name}</span>
          {process.env.NODE_ENV !== "production" && hint && <span className="text-xs opacity-70">Add screenshot: {hint}</span>}
        </div>
      )}
    </div>
  );
}
