import  { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location?.pathname === "/dashboard") {
      navigate("/dashboard/tasks", { replace: true });
    }
  }, [navigate, location]);
  return( 
  <div>
    <Outlet />
  </div>
  )
};

export default Dashboard;
