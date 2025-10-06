import { useState } from 'react';
import { XMLParser } from "fast-xml-parser";
import Container from 'react-bootstrap/Container';
import ImportFile from './components/ImportFile';
import Questions from './components/Questions';
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


  const handleFileRead = text => {
        const options = {
          ignoreAttributes : false
        };
        const parser = new XMLParser(options);
        const jsonObj = parser.parse(text);
        setData(jsonObj);
  }

  
  return (
    <>
      <Container className="p-3">
        <Container className="p-5 mb-4 bg-light rounded-3">
          <h1 className="header">Moodle Question Editor</h1>
          { }
          <ImportFile onFileRead={handleFileRead} />

          <SearchBar visible={!!data}/>

          <Questions data={data}/>

        </Container>
      </Container>
    </>
  )
}

export default App
