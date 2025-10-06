import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import ImportFile from './components/ImportFile';

function App() {
  const [data, setData] = useState(null);

  const importedXML = data ? <pre>{JSON.stringify(data, null, 2)}</pre> : "";

  return (
    <>
      <Container className="p-3">
        <Container className="p-5 mb-4 bg-light rounded-3">
          <h1 className="header">Moodle Question Editor</h1>
          <ImportFile setAppData={setData} />

          {importedXML}

        </Container>
      </Container>
    </>
  )
}

export default App
