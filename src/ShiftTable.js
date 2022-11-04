/* 
Nurse List
[{
  "id": 1,
  "first_name": "Danny",
  "last_name": "Kennelly",
  "email": "dkennelly0@4shared.com",
  "username": "dkennelly0",
  "qualification": "RN"
}

Shift List
[{
  "id": 1,
  "start": "2021-08-01T00:00:00Z",
  "end": "2021-08-01T04:00:00Z",
  "nurse_id": null,
  "qual_required": "LPN",
  "name": "MedSurg 1"
}
*/

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
          {shifts.length
            ? shifts.map((shift) => {
                const nurse = nurses.filter(
                  (nurse) => nurse.id === shift.nurse_id
                );
                const assigned = nurse[0] ? nurse[0] : null;
                return (
                  <tr key={shift.id}>
                    <td>{shift.name}</td>
                    <td>{date}</td>
                    <td>{shift.end}</td>
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
