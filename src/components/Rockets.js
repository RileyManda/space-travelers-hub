import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRockets } from '../redux/rockets/rocketsSlice';

const Rockets = () => {
  const dispatch = useDispatch();
  const rockets = useSelector((state) => state.rockets.rockets);
  const isLoading = useSelector((state) => state.rockets.isLoading);
  const error = useSelector((state) => state.rockets.error);
  useEffect(() => {
    dispatch(fetchRockets());
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
    <div className="rocketImg">
      {rockets.map((rocket) => (
        <div key={rocket.id}>
          <img className="rimg" key={rocket.id} src={rocket.flickr_images} alt={rocket.name} />
          <section className="rnd">
            <h2 className="rname">{rocket.name}</h2>
            <p className="rdesk">{rocket.description}</p>
            <button className="button" type="button">Reserve Rocket</button>
          </section>
        </div>
      ))}
    </div>
  );
};
export default Rockets;
