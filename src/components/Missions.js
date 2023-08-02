import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { fetchMissions, joinMission, leaveMission } from '../redux/missions/missionsSlice';

const Missions = () => {
  const dispatch = useDispatch();
  const missions = useSelector((state) => state.missions.missions);
  const isLoading = useSelector((state) => state.missions.isLoading);
  const error = useSelector((state) => state.missions.error);

  const isMissionsDataAvailable = missions.length > 0;

  useEffect(() => {
    if (!isMissionsDataAvailable) {
      dispatch(fetchMissions());
    }
  }, [dispatch, isMissionsDataAvailable]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error:
        {' '}
        {error}
      </div>
    );
  }

  const handleJoinMission = (missionId, isReserved) => {
    if (isReserved) {
      dispatch(leaveMission(missionId));
    } else {
      dispatch(joinMission(missionId));
    }
  };

  return (
    <div className="missions-table-container">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ width: '10%' }}>Mission</th>
            <th style={{ width: '40%' }}>Description</th>
            <th style={{ width: '10%' }}>Status</th>
            <th style={{ width: '10%' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {missions.map((mission) => (
            <tr key={mission.mission_id} style={{ background: 'black', color: 'white' }}>
              <td>{mission.mission_name}</td>
              <td>{mission.description}</td>
              <td>
                {mission.reserved ? (
                  <Badge bg="success">Active member</Badge>
                ) : (
                  <Badge bg="secondary">NOT A MEMBER</Badge>
                )}
                {' '}
              </td>
              <td>
                {mission.reserved ? (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleJoinMission(mission.mission_id, true)}
                  >
                    Leave Mission
                  </Button>
                ) : (
                  <Button variant="outline-secondary" size="sm" onClick={() => handleJoinMission(mission.mission_id, false)}>
                    Join Mission
                  </Button>
                )}
                {' '}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Missions;
