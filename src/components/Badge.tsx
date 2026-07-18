interface BadgeProps {
  text: string;
}

export default function Badge({ text }: BadgeProps) {
  return (
    <span
      style={{ background: "#5B3AFF" }}
      className="inline-block rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white leading-none"
    >
      {text}
    </span>
  );
}