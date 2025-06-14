const PulseIndicator = () => {
  return (
    <div>
      <div className="flex items-center gap-2 animate-fade-in-up">
        <span className="text-sm text-gray-500">답변 준비 중...</span>
        <div className="w-3 h-3 bg-warm-red-700 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default PulseIndicator;
