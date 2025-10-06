import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ImportFile = ({onFileRead}) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (ev) => {
    const file = ev.target.files[0] ? ev.target.files[0] : null;
    setSelectedFile(file);
  };

  const handleImport = () => {
    if (!selectedFile) {
      return;
    }

    selectedFile.text()
      .then(fileText => onFileRead(fileText));
  };

  return (
    <Form.Group controlId="formFile" className="mb-3">
      <Form.Label>Choose an XML file to import</Form.Label>
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
