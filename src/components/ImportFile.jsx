import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { XMLParser } from "fast-xml-parser";

const ImportFile = ({setAppData}) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (ev) => {
    const targetFile = ev.target.files[0] ? ev.target.files[0] : null;
    setSelectedFile(targetFile);
    setAppData(null);
  };

  const parseXML = text => {
        console.log("parsing: ", text)
        const parser = new XMLParser();
        const jsonObj = parser.parse(text);
        setAppData(jsonObj);
  }

  const handleImport = () => {
    if (!selectedFile) {
      return;
    }

    selectedFile.text()
      .then(fileText => parseXML(fileText));
  };

  return (
    <Form.Group controlId="formFile" className="mb-3">
      <Form.Label>Default file input example</Form.Label>
      <Form.Control type="file" onChange={handleFileChange} />
      <Button
        className="mt-2"
        variant="primary"
        onClick={handleImport}
        disabled={!selectedFile}
      >
        Import
      </Button>
    </Form.Group>
  );
};

export default ImportFile;
