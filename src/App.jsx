import { useState } from 'react';
import { XMLParser } from "fast-xml-parser";
import Container from 'react-bootstrap/Container';
import ImportFile from './components/ImportFile';
import Questions from './components/Questions';
import Form from 'react-bootstrap/Form';


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

function App() {
  const [data, setData] = useState(null);
  const [filter, setFilter] = useState('')

  console.log(data)
  //todo implement 
  // const filteredData = data.filter(data => data.name.toLowerCase().includes(filter.toLowerCase()))

  const filterChange = ev => setFilter(ev.target.value)

  const handleFileRead = text => {
    const options = {
      ignoreAttributes: false
    };
    const parser = new XMLParser(options);

    const jsonObj = parser.parse(text);
    // debugger;

    jsonObj.quiz.question = jsonObj.quiz.question.map(question => ({
      ...question,
      uuid: crypto.randomUUID(),
      answer: question.answer?.map(answer => ({ ...answer, uuid: crypto.randomUUID() })), // ? means optional chaining
    }));
    setData(jsonObj);
  }


  return (
    <>
      <Container className="p-3">
        <Container className="p-5 mb-4 bg-light rounded-3">
          <h1 className="header">Moodle Question Editor</h1>
          
          <ImportFile onFileRead={handleFileRead} />

          <SearchBar onChange={filterChange} visible={!!data} />
          {/* <SearchBar value={filter} onChange={filterChange} visible={true} /> */}
          
          {filter && data ? "Questions containing: " + filter : data ? "All questions:" : null}

          <Questions filter={filter} data={data} />

        </Container>
      </Container>
    </>
  )
}

export default App
