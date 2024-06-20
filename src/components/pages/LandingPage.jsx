import React from "react";
import { getUserProfile } from "../../api/service";
import { SET_USER_PROFILE, IS_LOGGED_IN, IS_LOGGED_OUT } from "../../context/types";
import { Link } from "react-router-dom";
import TaskContext from "../../context/store";

const LandinPage = () => {
  const [loading, setIsLoading] = React.useState(false);

  const {
    state: { userProfile, isLoggedIn },
    dispatch,
  } = React.useContext(TaskContext);

  React.useEffect(() => {
    setIsLoading(true);
    getUserProfile()
      .then((res) => {
        dispatch({ type: SET_USER_PROFILE, payload: res.data });
        dispatch ({type: IS_LOGGED_IN});
      })
      .catch((_) => {
        dispatch({type: IS_LOGGED_OUT});
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="home-page">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum quod
        harum nostrum explicabo, animi sit beatae enim, impedit optio deleniti,
        quia incidunt numquam nulla. 
        <br />
        <br />
      </p>
      {loading && <p>Loading, please wait...</p>}
      {isLoggedIn && userProfile.name && (
        <div>
            <p>
                welcome, <b>{userProfile.name}</b>
            </p>
            <Link to="dashboard/tasks"> 
               <button className="btn"> Go to your tasks</button>
            </Link>
        </div>
      )}
      {!loading && !isLoggedIn && (
        <div>
            <Link to="/login">
                <button className="btn">Login</button>
            </Link>
            <Link to="/register">
                <button className="btn">Register</button>
            </Link>
        </div>
      )}
    </div>
  );
};

export default LandinPage;
