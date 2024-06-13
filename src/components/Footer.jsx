import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <hr />
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/about">About</Link>
      </div>
      <p>Copyright &copy; {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
