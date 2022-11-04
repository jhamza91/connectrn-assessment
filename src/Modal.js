import { useState, useEffect } from "react";
// import Portal from "./Portal";

const Modal = ({ shifts, nurses, toggleModal }) => {
  const [selectedShift, setSelectedShift] = useState("");
  const [selectedNurse, setSelectedNurse] = useState("");

  useEffect(() => {
    return () => {
      setSelectedShift("");
      setSelectedNurse("");
      console.log("nurse after close", selectedNurse);
      console.log("shift after close", selectedShift);
    };
  }, []);

  const assignShift = async () => {
    console.log("selectedShift", selectedShift);
    console.log("selectedNurse", selectedNurse);
    toggleModal();
    try {
      await fetch(`/shifts/${selectedShift}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          nurseID: selectedNurse,
        },
      });
    } catch (err) {
      console.log("error sending shift update to database: ", err);
    }
  };

  return (
    <div id="modal">
      <div id="modal-content">
        <button id="close-modal-button" onClick={toggleModal}>
          X
        </button>
        <h1>Set Shift Assignment</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            assignShift();
          }}
        >
          <label htmlFor="shift">
            <p>Shift</p>
            <select
              id="shift"
              // value={selectedShift}
              onChange={(e) => setSelectedShift(e.target.value)}
            >
              <option />
              {shifts.map((shift) => (
                <option key={shift.id} value={shift.id}>
                  {shift.name}: {shift.start}-{shift.end} ({shift.qual_required}
                  )
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="nurse">
            <p>Nurse</p>
            <select
              id="nurse"
              value={selectedNurse}
              onChange={(e) => setSelectedNurse(e.target.value)}
              onBlur={(e) => setSelectedNurse(e.target.value)}
            >
              <option />
              {nurses.map((nurse) => (
                <option key={nurse.id} value={nurse.id}>
                  {nurse.first_name} {nurse.last_name}, {nurse.qualification}
                </option>
              ))}
            </select>
          </label>
          <button>SAVE ASSIGNMENT</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
