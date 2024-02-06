import { NavLink, useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

const Courses = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const parsed = queryString.parse(location.search);

  return (
    <>
      <nav className="courses">
        
      </nav>
    </>
  );
};

export default Courses;
