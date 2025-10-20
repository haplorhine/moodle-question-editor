import Form from "react-bootstrap/Form";

const SearchBar = ({ value, visible, onChange }) => {
  if (!visible) {
    return null;
  }
  return (
    <>
      <Form.Label htmlFor="searchBar">Search Question</Form.Label>

      <Form.Control
        value={value}
        type="text"
        id="searchBar"
        className="mb-5"
        onChange={onChange}
      />
    </>
  );
};

export default SearchBar;
