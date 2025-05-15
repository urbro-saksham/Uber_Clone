import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import SearchPanel from "./SearchPanel";
import SelectVehicle from "./SelectVehicle";

const UserHome = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [FindingDriver, setFindingDriver] = useState(false);
  const searchPanelRef = useRef(null);
  const closeIconRef = useRef(null);
  const tl = useRef(null);

  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true });

    // Expand search panel
    tl.current.to(
      searchPanelRef.current,
      {
        height: "70%",
        padding: 24,
        duration: 0.3,
        ease: "power2.out",
      },
      0
    );

    // Fade in close icon
    tl.current.to(
      closeIconRef.current,
      {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      },
      0
    );
  }, []);

  function BackwardButtonOnVehicleSelector(e) {
    e.preventDefault();
    setShow(true);
  }

  const togglePanel = (open, onCloseComplete) => {
    setPanelOpen(open);
    if (open) {
      tl.current.eventCallback("onReverseComplete", null);
      tl.current.play();
    } else {
      tl.current.reverse();
      if (onCloseComplete) {
        tl.current.eventCallback("onReverseComplete", onCloseComplete);
      }
    }
  };

  const FindTripHandler = (e) => {
    e.preventDefault();
    togglePanel(false, () => {
      setShow(false);
    });
  };

  const handleContinue = () => {
    setFindingDriver(true);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Map Background */}
      <img
        src="https://static.vecteezy.com/system/resources/previews/000/271/674/original/vector-polygonal-world-map.jpg"
        alt="map"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Logo */}
      <img
        className="w-16 absolute left-5 top-5 z-10"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="logo"
      />

      {/* Bottom Form and Search Panel */}
      <div className="absolute bottom-0 left-0 w-full flex flex-col justify-end h-screen z-10">
        {!FindingDriver &&
          (show ? (
            <div className="h-[40%] p-6 bg-white relative rounded-t-2xl shadow-lg">
              <h5
                ref={closeIconRef}
                onClick={() => togglePanel(false)}
                className="absolute opacity-0 right-6 top-6 text-2xl cursor-pointer"
              >
                <i className="ri-arrow-down-wide-line"></i>
              </h5>
              <h4 className="text-2xl font-semibold">Find a trip</h4>
              <form className="relative py-3">
                <div className="absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
                <input
                  onClick={() => togglePanel(true)}
                  className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
                  type="text"
                  placeholder="Add a pick-up location"
                />
                <input
                  onClick={() => togglePanel(true)}
                  className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
                  type="text"
                  placeholder="Enter your destination"
                />
              </form>
              <button
                className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full"
                onClick={FindTripHandler}
              >
                Find Trip
              </button>
            </div>
          ) : (
            <div className="w-screen h-[60%] relative">
              <button
                className="absolute top-0 left-3.5 z-10"
                onClick={BackwardButtonOnVehicleSelector}
              >
                <i className="absolute ri-arrow-left-line top-3"></i>
              </button>
              <SelectVehicle onContinue={handleContinue} />
            </div>
          ))}

        {/* Finding Driver UI */}
        {FindingDriver && (
          <div className="bg-white h-[40%] p-6 rounded-t-2xl shadow-lg text-center">
            <h2 className="text-2xl font-semibold mb-2">Finding a driver...</h2>
            <p className="text-gray-600">
              Please wait while we connect you with a nearby driver.
            </p>
            <div className="mt-4">
              <i className="ri-loader-4-line animate-spin text-3xl text-gray-500"></i>
            </div>
            <button
              onClick={() => setFindingDriver(false)}
              className="mt-6 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Sliding Search Panel */}
        <div
          ref={searchPanelRef}
          className="bg-white h-0 overflow-hidden w-full"
        >
          <div className="text-center text-gray-600">
            <SearchPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
