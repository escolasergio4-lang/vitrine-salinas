export default function Loading({ message = "Carregando..." }: { message?: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-4"></div>
        <p className="text-white text-xl">{message}</p>
      </div>
    </div>
  );
}
