const ProgressBar = ({ step, steps }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((label, index) => (
        <div key={index} className="flex items-center w-full">
          <div className="flex flex-col items-center text-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                index <= step ? "bg-[#ff8c00]" : "bg-gray-300"
              }`}
            >
              {index + 1}
            </div>
            <span className="text-xs mt-1">{label}</span>
          </div>

          {index !== steps.length - 1 && (
            <div className="flex-1 h-1 mx-2 bg-gray-300">
              <div
                className="h-1 bg-[#ff8c00]"
                style={{ width: step > index ? "100%" : "0%" }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;