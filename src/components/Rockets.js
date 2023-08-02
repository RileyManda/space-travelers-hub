import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRockets } from '../redux/rockets/rocketsSlice';

const Rockets = () => {
  const dispatch = useDispatch();
  const rockets = useSelector((state) => state.rockets.rockets);
  const isLoading = useSelector((state) => state.rockets.isLoading);
  const error = useSelector((state) => state.rockets.error);

  const isrocketsDataAvailable = rockets.length > 0;

  useEffect(() => {
    if (!isrocketsDataAvailable) {
      dispatch(fetchRockets());
      console.log(fetchRockets, "fetched");
    }
  }, [dispatch, isrocketsDataAvailable]);

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
      {rockets.map((rocket) => (
        <div key={rocket.id}>
          <h2>{rocket.name}</h2>
          <p>{rocket.type}</p>
          <p>{rocket.flickr_images}</p>
        </div>
      ))}
    </div>
  );
};

export default Rockets;
