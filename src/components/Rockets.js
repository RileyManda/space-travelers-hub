import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { fetchRockets, showContent } from '../redux/rockets/rocketsSlice';

const Rockets = () => {
  const dispatch = useDispatch();
  const rockets = useSelector((state) => state.rockets.rockets);
  const isLoading = useSelector((state) => state.rockets.isLoading);
  const error = useSelector((state) => state.rockets.error);
  useEffect(() => {
    if (rockets.length === 0) {
      dispatch(fetchRockets());
    }
  }, [dispatch, rockets.length]);
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
        <section key={rocket.id}>
          <img className="rimg" key={rocket.id} src={rocket.flickr_images} alt={rocket.name} />
          <div className="rnd">
            <h2 className="rname">{rocket.name}</h2>
            <p className="rdesk">
              {rocket.reserved ? <span className="reserved-span">Reserved</span> : ''}
              {' '}
              {rocket.description}
            </p>
            <div className="align-button">
              {!rocket.reserved && (
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => {
                  dispatch(showContent({ id: rocket.id, reserved: !rocket.reserved }));
                }}
              >
                Reserve Rocket
              </Button>
              ) }
              {rocket.reserved && (
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => {
                  dispatch(showContent({ id: rocket.id, reserved: !rocket.reserved }));
                }}
              >
                Cancel Reservation
              </Button>
              ) }
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};
export default Rockets;
