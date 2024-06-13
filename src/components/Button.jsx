import PropTypes from "prop-types";

const Button = ({ label, color, onClick }) => {
  const labelText = label ? label : "Add Task";
  const bgColor = color ? color : "purple";

  return (
    <button 
      onClick={onClick}
      className="btn"
      style={{backgroundColor : bgColor}}
    >
        {labelText}
    </button>
  )
};

Button.propTypes = {
    //label: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button;
