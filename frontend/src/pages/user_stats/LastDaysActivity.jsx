import React, { useEffect } from "react";
import User from "../../models/User";

function LastDaysActivity({ id }) {
  const [lastDaysActivity, setLastDaysActivity] = React.useState(null);
  useEffect(() => {
    async function fetchLastDaysActivity() {
      const lastDaysActivity = await User.getLastDaysActive(id);
      setLastDaysActivity(lastDaysActivity);
    }
    fetchLastDaysActivity();
  }, [setLastDaysActivity, id]);
  console.log(lastDaysActivity);
  return <div></div>;
}

export default LastDaysActivity;
