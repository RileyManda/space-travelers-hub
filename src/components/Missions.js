import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMissions } from '../redux/missions/missionsSlice';

const Missions = () => {
  const dispatch = useDispatch();
  const missions = useSelector((state) => state.missions.missions);
  const isLoading = useSelector((state) => state.missions.isLoading);
  const error = useSelector((state) => state.missions.error);
  const [fetchCount, setFetchCount] = useState(0); // testing the number of times data is fectehd
  useEffect(() => {
    console.log('Dispatching fetchMissions...');
    dispatch(fetchMissions());
    setFetchCount((prevCount) => prevCount + 1);
  }, [dispatch]);

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
    <div>
      <div>
        Number of times data fetched:
        {' '}
        {fetchCount}
      </div>
      {missions.map((mission) => (
        <div key={mission.mission_id}>
          <h2>{mission.mission_name}</h2>
          <p>{mission.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Missions;
