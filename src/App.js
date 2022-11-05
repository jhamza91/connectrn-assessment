import { useEffect, useState } from "react";
import ShiftTable from "./ShiftTable";
import Modal from "./Modal";

function App() {
  const [shifts, setShifts] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // fetch list of shifts and nurses and save to state on app load
    requestShiftData();
    requestNurseData();
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const requestShiftData = async () => {
    const res = await fetch("/shifts");
    const data = await res.json();
    setShifts(data);
  };
  const requestNurseData = async () => {
    const res = await fetch("/nurses");
    const data = await res.json();
    setNurses(data);
  };

  return (
    <div className="App">
      <header>
        <h1>Nurse Shift Schedule</h1>
      </header>
      <button onClick={toggleModal}>SET SHIFT ASSIGNMENT</button>
      <ShiftTable shifts={shifts} nurses={nurses} />
      {showModal ? (
        <Modal shifts={shifts} nurses={nurses} toggleModal={toggleModal} />
      ) : null}
    </div>
  );
}

export default App;
