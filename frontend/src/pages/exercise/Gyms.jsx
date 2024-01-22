import React from "react";
import GymModel from "../../models/Gym";
function Gyms({ exerciseId }) {
  const [gyms, setGyms] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    GymModel.get_by_user_exercise(1, exerciseId).then((gyms) => {
      console.log(gyms);
      setGyms(gyms);
      setLoading(false);
    });
  }, [exerciseId]);
  return <div></div>;
}

export default Gyms;
