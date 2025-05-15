import React from 'react';

const SelectVehicle = ({ onContinue }) => {
  return (
    <div className="absolute bottom-0">
      <div className="bg-white w-screen h-[60%] overflow-y-auto p-4 border rounded-t-3xl">
        <div className="space-y-4">
          {/* Vehicle Cards */}
          {['Auto', 'Bike', 'Sedan', 'SUV'].map((type, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-xl shadow hover:bg-gray-50 transition cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <img
                  src="https://tse3.mm.bing.net/th?id=OIP.Y_gX5xiVCzVgpmDuQ1h6ogHaEK&pid=Api&P=0&h=180"
                  alt={type}
                  className="h-[45px] object-cover rounded-md"
                />
                <div>
                  <div className="text-lg font-semibold">{`Uber ${type}`}</div>
                  <div className="text-sm text-gray-500">
                    {type === 'Auto'
                      ? 'Affordable and quick'
                      : type === 'Bike'
                      ? 'Cheapest ride'
                      : type === 'Sedan'
                      ? 'Comfortable for 4 people'
                      : 'Spacious & family-friendly'}
                  </div>
                </div>
              </div>
              <div className="text-lg font-semibold mr-2">
                {type === 'Auto'
                  ? '$10.45'
                  : type === 'Bike'
                  ? '$7.20'
                  : type === 'Sedan'
                  ? '$14.85'
                  : '$19.99'}
              </div>
            </div>
          ))}

          <button
            onClick={onContinue}
            className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectVehicle;
