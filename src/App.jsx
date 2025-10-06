import Container from 'react-bootstrap/Container';
import ImportFile from './components/ImportFile';

function App() {

  return (
    <>
      <Container className="p-3">
        <Container className="p-5 mb-4 bg-light rounded-3">
          <h1 className="header">Moodle Question Editor</h1>
          <ImportFile />
        </Container>
      </Container>
    </>
  )
}

export default App
