export function ErrorToast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed top-6 right-6 z-50 animate-bounce">
      <div className="bg-red-600 text-white px-6 py-4 rounded-xl shadow-lg border border-red-500 flex items-center space-x-3 max-w-md">
        <span className="text-lg font-bold">⚠️</span>
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  );
}