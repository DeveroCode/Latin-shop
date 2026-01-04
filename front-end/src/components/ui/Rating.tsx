export default function Rating() {
  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: 6 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="#FFD700"
          stroke="#FFD700"
          strokeWidth="1.5"
          className="w-3 h-3 transition-transform duration-300 group-hover:scale-110"
        >
          <path d="M10 1.5l2.9 5.9 6.6.9-4.8 4.6 1.1 6.5L10 16.5l-5.8 3 1.1-6.5-4.8-4.6 6.6-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}
