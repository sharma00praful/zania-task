import SearchBar from "../../../components/TEST/SearchBar";
import "./style.css";

const Header = ({}) => {
  return (
    <div className="header-container">
      <button>New</button>
      <SearchBar />
      <button>Go</button>
      <button>&times;</button>
    </div>
  );
};
export default Header;

