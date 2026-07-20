export default function FeatureCard({
  icon: Icon,
  title,
  description,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 cursor-pointer ${
        isHovered
          ? 'shadow-xl -translate-y-2 border-[#0F172A]/30'
          : 'shadow-sm hover:shadow-md'
      }`}
    >
      <div className="flex items-start gap-4">

        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-green-500">
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-[#0F172A] mb-1">
            {title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>

      </div>
    </div>
  );
}
