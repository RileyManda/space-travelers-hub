import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const missions = useSelector((state) => state.missions.missions);
  const joinedMissionsData = missions.filter((mission) => mission.reserved);

  return (
    <div className="profile-container">
      <h2>My Joined Missions</h2>
      {joinedMissionsData.length > 0 ? (
        <ul>
          {joinedMissionsData.map((mission) => (
            <li key={mission.mission_id}>
              {mission.mission_name}
              {' '}
            </li>
          ))}
        </ul>
      ) : (
        <p>No joined missions yet.</p>
      )}
    </div>
  );
};

export default Profile;
