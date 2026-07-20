const Loader = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="flex flex-col items-center gap-4">

        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>

        <p className="text-gray-600 text-sm">
          Loading parking data...
        </p>
      </div>
    </div>
  );
};

export default Loader;