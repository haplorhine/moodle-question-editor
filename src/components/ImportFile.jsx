import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ImportFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = ({ target }) => {
    const targetFile = target.files[0] ? target.files[0] : null;
    setSelectedFile(targetFile);
  };

  const handleImport = () => {
    if (!selectedFile) {
      return;
    }
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
