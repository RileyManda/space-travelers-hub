import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
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
    <div>
      {rockets.map((rocket) => (

        <div key={rocket.id}>
          <h2>{rocket.name}</h2>
          <p>{rocket.type}</p>
          {rocket.flickr_images.map((image) => (
            <img key={image} src={image} alt={rocket.name} />
          ))}
        </div>

        <section key={rocket.id}>
          <img className="rimg" key={rocket.id} src={rocket.flickr_images} alt={rocket.name} />
          <div className="rnd">
            <h2 className="rname">{rocket.name}</h2>
            <p className="rdesk">{rocket.description}</p>
            <div className="align-button">
              <Button variant="primary" size="sm">Reserve Rocket</Button>
            </div>

          </div>
        </section>

      ))}
    </div>
  );
};
export default Rockets;
