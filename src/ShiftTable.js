const ShiftTable = ({ shifts, nurses }) => {
  return (
    <div id="shift-table">
      <table>
        <thead>
          <tr>
            <th>Shift</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Certification required</th>
            <th>Assigned nurse</th>
          </tr>
        </thead>
        <tbody>
          {shifts.length && nurses.length
            ? shifts.map((shift) => {
                const nurse = nurses.filter(
                  (nurse) => nurse.id === shift.nurse_id
                );
                const assigned = nurse[0] ? nurse[0] : null;
                const start = new Date(shift.start);
                const startDay = start.toLocaleDateString();
                const startTime = start.toLocaleTimeString();
                const end = new Date(shift.end);
                const endDay = end.toLocaleDateString();
                const endTime = end.toLocaleTimeString();

                return (
                  <tr key={shift.id}>
                    <td>{shift.name}</td>
                    <td>
                      {startDay} {startTime}
                    </td>
                    <td>
                      {endDay} {endTime}
                    </td>
                    <td>{shift.qual_required}</td>
                    {assigned ? (
                      <td>
                        {assigned.first_name} {assigned.last_name},{" "}
                        {assigned.qualification}
                      </td>
                    ) : (
                      <td></td>
                    )}
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default ShiftTable;
