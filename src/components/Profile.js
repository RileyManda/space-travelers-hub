import React from 'react';
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';

const Profile = () => {
  const missions = useSelector((state) => state.missions.missions);
  const joinedMissionsData = missions.filter((mission) => mission.reserved);

  return (
    <div className="profile-container">
      {joinedMissionsData.length > 0 ? (
        <Table striped bordered hover>
          <tbody>
            {joinedMissionsData.map((mission) => (
              <tr key={mission.mission_id}>
                <td>{mission.mission_name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No joined missions yet.</p>
      )}
    </div>
  );
};

export default Profile;
