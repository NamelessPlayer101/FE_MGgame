import { Link } from "react-router-dom";

function Menu() {
  return (
    <div className="menu">
      <div className="header">MG</div>
      <div className="content">
        <Link to="/chat" className="item-menu">
          Chat
        </Link>
        <Link to="/game" className="item-menu">
          Game
        </Link>
      </div>
    </div>
  );
}

export default Menu;
