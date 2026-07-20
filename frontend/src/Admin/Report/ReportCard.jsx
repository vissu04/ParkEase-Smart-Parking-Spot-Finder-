export default function ReportCard({ title, children, action }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{title}</h2>
        {action}
      </div>
      {children}
    </div>
  );
}