export function ErrorToast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-fade-in-down font-mono w-[90%] max-w-md">
      <div className="bg-red-950 border border-red-500 text-red-400 px-6 py-4 shadow-[0_0_15px_rgba(220,38,38,0.3)] flex items-center gap-3">
        <span className="text-xl font-bold">!</span>
        <p className="text-sm font-medium tracking-wide">{message}</p>
      </div>
    </div>
  );
}