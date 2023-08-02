import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { fetchMissions } from '../redux/missions/missionsSlice';

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
                <Button variant="secondary" size="sm">Not A Member</Button>
                {' '}
              </td>
              <td>
                <Button variant="outline-secondary">Join Mission</Button>
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
