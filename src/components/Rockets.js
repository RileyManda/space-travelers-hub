import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { fetchRockets, joinRocket, leaveRocket } from '../redux/rockets/rocketsSlice';

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

  const handleJoinLeaveRocket = (rocketId, isReserved) => {
    if (isReserved) {
      dispatch(leaveRocket(rocketId));
    } else {
      dispatch(joinRocket(rocketId));
    }
  };

  return (
    <div className="rocketImg">
      {rockets.map((rocket) => (
        <section key={rocket.id}>
          <img className="rimg" key={rocket.id} src={rocket.flickr_images} alt={rocket.name} />
          <div className="rnd">
            <h2 className="rname">{rocket.name}</h2>
            <p className="rdesk">{rocket.description}</p>
            <div className="align-button">
              {rocket.reserved ? (
                <Badge bg="secondary">reserved</Badge>
              ) : (
                <Badge bg="success" className="reserve">reserved</Badge>
              )}
            </div>
            <div className="align-button">
              {rocket.reserved ? (
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleJoinLeaveRocket(rocket.rocketId, true)}
                >
                  reserve rocket
                </Button>
              ) : (
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => handleJoinLeaveRocket(rocket.RocketId, false)}
                >
                  cancel Reservation
                </Button>
              )}

            </div>
          </div>
        </section>
      ))}
    </div>
  );
};
export default Rockets;
