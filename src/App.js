import { useEffect, useState } from "react";
import ShiftTable from "./ShiftTable";
import Modal from "./Modal";
import shiftList from "./data/shift_list.json";
import nurseList from "./data/nurse_list.json";

function App() {
  const [shifts, setShifts] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    requestShiftData();
    requestNurseData();
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const requestShiftData = async () => {
    /* WHEN SERVER IS CONNECTED */
    // const res = await fetch("/shifts");
    // const data = await res.json();
    // setShifts(data);

    /* INTERIM WORKAROUND */
    setShifts(shiftList);
  };
  const requestNurseData = async () => {
    /* WHEN SERVER IS CONNECTED */
    // const res = await fetch("/nurses");
    // const data = await res.json();
    // setNurses(data);

    /* INTERIM WORKAROUND */
    setNurses(nurseList);
  };

  return (
    <div className="App">
      <header>
        <h1>RN Shift Schedule</h1>
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
