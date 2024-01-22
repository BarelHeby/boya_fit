import React from "react";
import GymModel from "../../models/Gym";
function Gyms({ exerciseId }) {
  const [gyms, setGyms] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const user = sessionStorage.getItem("username")
    ? JSON.parse(sessionStorage.getItem("username"))
    : null;
  React.useEffect(() => {
    // if (user === null) {
    //   return;
    // }
    GymModel.get_by_user_exercise(5, exerciseId).then((gyms) => {
      setGyms(gyms?.map((gym) => GymModel.fromJson(gym)));
    });
  }, [exerciseId, user]);
  console.log(gyms);
  if (user === null) {
    return (
      <div className="text-center">
        <label> Login To View Closest Gyms To You</label>
      </div>
    );
  }
  return <div></div>;
}

export default Gyms;
