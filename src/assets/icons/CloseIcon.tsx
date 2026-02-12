// src/assets/icons/CloseIcon.tsx

export default function CloseIcon({
  color,
  width,
  height,
}: {
  color?: string;
  width?: number;
  height?: number;
}) {
  if (!color) color = "#474747";
  if (!width) width = 18;
  if (!height) height = 18;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 3L3 15M3 3L15 15"
        stroke={color}
        strokeWidth="0.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
