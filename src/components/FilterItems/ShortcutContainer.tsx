interface ShortcutContainerProps {
  label: React.ReactNode;
  onClick: () => void;
}

export function ShortcutContainer(
  props: ShortcutContainerProps
) {
  const { onClick, label } = props;

  return (
    <div className="group">
      <button
        onClick={onClick}
        className={`flex items-center justify-between gap-1 rounded-lg bg-blue-100 px-3 py-1 group-hover:bg-danger-100`}
      >
        <p className="text-sm font-medium">{label}</p>
        <div
          className={`rounded-full bg-blue-400 p-1 group-hover:bg-danger-800`}
        >
					X
        </div>
      </button>
    </div>
  );
}
