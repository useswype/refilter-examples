interface ShortcutContainerProps {
  label: React.ReactNode;
  onClick: () => void;
}

export function ShortcutContainer(props: ShortcutContainerProps) {
  const { onClick, label } = props;

  return (
    <div className="group">
      <button
        onClick={onClick}
        className="flex items-center justify-between gap-1 rounded-lg bg-blue-100 px-3 py-1 group-hover:bg-red-200"
      >
        <p className="text-sm me-1 font-medium">{label}</p>
        <div className="rounded-full flex items-center justify-center bg-blue-400 p-1.5 group-hover:bg-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="6"
            height="6"
            viewBox="0 0 6 6"
            fill="none"
          >
            <path
              d="M4.75 1L1 4.75"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M1 1L4.75 4.75"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </button>
    </div>
  );
}
