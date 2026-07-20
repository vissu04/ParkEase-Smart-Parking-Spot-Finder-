export default function StatCard({
  title,
  value,
  change,
  changeType = "up",
  description,
  subText,
}) {
  const isUp = changeType === "up";

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5 w-full">
      
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm text-gray-500 font-medium">{title}</h4>

        <span
          className={`text-xs px-2 py-1 rounded-full font-semibold
          ${isUp ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}
        >
          {isUp ? "↗" : "↘"} {change}
        </span>
      </div>
      <h2 className="text-2xl font-bold text-gray-900">{value}</h2>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
      <p className="text-xs text-gray-400 mt-1">{subText}</p>
    </div>
  );
}