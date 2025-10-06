import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import ImportFile from './components/ImportFile';
import Form from 'react-bootstrap/Form';

const SearchBar = ({visible}) => {
  if (!visible) {
    return null;
  }
  return (
    <>
      <Form.Label htmlFor="searchBar">Search Question</Form.Label>
      <Form.Control
        type="text"
        id="searchBar"
        className="mb-5"
      />
    </>
  );
};

function App() {
  const [data, setData] = useState(null);

  const importedXML = data ? <pre>{JSON.stringify(data, null, 2)}</pre> : "";

  
  return (
    <>
      <Container className="p-3">
        <Container className="p-5 mb-4 bg-light rounded-3">
          <h1 className="header">Moodle Question Editor</h1>
          { }
          <ImportFile setAppData={setData} />

          <SearchBar visible={!!data}/>

          {importedXML}

        </Container>
      </Container>
    </>
  )
}

export default App
