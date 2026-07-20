export default function ChartCard({ title, loading, error, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 min-h-[380px]">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>

      {loading && (
        <div className="h-[300px] animate-pulse bg-gray-100 rounded-xl" />
      )}

      {error && (
        <div className="h-[300px] flex items-center justify-center text-red-500">
          Failed to load data
        </div>
      )}

      {!loading && !error && children}
    </div>
  );
}