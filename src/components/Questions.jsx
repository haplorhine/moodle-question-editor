import Form from "react-bootstrap/Form";

import { useRef, useState } from "react";
import Editor from "react-simple-wysiwyg";

const Question = ({ question, id }) => {
  const editorRef = useRef(null); // to make editor focusable
  const [html, setHtml] = useState(question.questiontext.text);
  const [questionName, setquestionName] = useState(question.name.text);

  console.log(html);
  return (
    <div className="rounded border bg-info-subtle border-info-subtle p-3 mb-3">
      <Form>
        <Form.Group className="mb-3" controlId={"questionformname" + id}>
          <Form.Label>Question Name</Form.Label>
          <Form.Control
            value={questionName}
            onChange={(event) => setquestionName(event.target.value)}
            type="text"
            placeholder=""
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label
            onClick={() => editorRef.current?.focus()}
            htmlFor={"questionformtext" + id}
          >
            Question Text
          </Form.Label>
          <Editor
            className="bg-white"
            ref={editorRef}
            onChange={(event) => setHtml(event.target.value)}
            id={"questionformtext" + id}
            value={html}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

const Questions = ({ filter, questions }) => {
  if (!questions) {
    return null;
  }

  const questionList = questions.map((question) => (
    <Question key={question.uuid} id={question.uuid} question={question} />
  ));

  return questionList;
};

export default Questions;
