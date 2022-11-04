import { useState, useEffect } from "react";
import { FiAlertTriangle } from "react-icons/fi";

const Modal = ({ shifts, nurses, toggleModal }) => {
  const [selectedShift, setSelectedShift] = useState("");
  const [selectedNurse, setSelectedNurse] = useState("");
  const [qualErrorMsg, setQualErrorMsg] = useState(false);
  const [schedErrorMsg, setSchedErrorMsg] = useState(false);

  useEffect(() => {
    return () => {
      // reset selected shift & nurse after modal close
      setSelectedShift("");
      setSelectedNurse("");
    };
  }, []);

  const nurseQualsVerified = () => {
    const quals = {
      CNA: 1,
      LPN: 2,
      RN: 3,
    };
    const shiftData = shifts.filter((shift) => shift.id == selectedShift);
    const nurseData = nurses.filter((nurse) => nurse.id == selectedNurse);
    return (
      quals[shiftData[0].qual_required] <= quals[nurseData[0].qualification]
    );
  };

  // const nurseSchedVerified = () => {
  //   const nurseData = nurses.filter((nurse) => nurse.id === selectedNurse)[0];
  //   // already assigned shifts
  //   const assignedShifts = shifts.filter(
  //     (shift) => shift.nurse_id === nurseData.id
  //   );
  //   // desired shift
  //   const shiftData = shifts.filter((shift) => shift.id == selectedShift);
  //   const shiftStart = shiftData[0].start;
  //   const shiftEnd = shiftData[0].end;
  //   // check if desired shift start time or end time lies between any of assigned shifts
  //   for (let i = 0; i < assignedShifts.length; i++) {
  //     const shift = assignedShifts[i];
  //     if (
  //       (shift.start >= shiftStart && shift.start <= shiftEnd) ||
  //       (shift.end >= shiftStart && shift.end <= shiftEnd)
  //     )
  //       return false;
  //   }
  //   return true;
  // };

  const assignShift = async () => {
    // close modal windown when 'save assignment' clicked
    toggleModal();
    // update database with assignment
    try {
      await fetch(`/shifts/${selectedShift}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nurseID: selectedNurse,
        }),
      });
    } catch (err) {
      console.error("error saving shift: ", err);
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
            // if nurse is qualified & available, submit form
            if (nurseQualsVerified()) assignShift();
            // if not, display error message(s)
            if (!nurseQualsVerified()) setQualErrorMsg(true);
            // if (!nurseSchedVerified()) setSchedErrorMsg(true);
          }}
        >
          <label htmlFor="shift">
            <p>Shift</p>
            <select
              id="shift"
              value={selectedShift}
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
          {qualErrorMsg ? (
            <div className="error-msg">
              <span>
                <FiAlertTriangle color="orange" fontSize="1.5em" />
              </span>
              This nurse isn't qualified to work the chosen shift
            </div>
          ) : null}
          <button>SAVE ASSIGNMENT</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
