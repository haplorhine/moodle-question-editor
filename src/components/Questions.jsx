import Form from 'react-bootstrap/Form';


const Question = ({ question }) => {
  console.log(question)
  return (
    <div className="rounded border bg-warning p-3">
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Question Name</Form.Label>
          <Form.Control value={question.name.text} type="text" placeholder="" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Question Text</Form.Label>
          <Form.Control value={question.questiontext.text} as="textarea" rows={3} />
        </Form.Group>
      </Form>

    </div>
  )

}







const Questions = ({ filter, questions }) => {

  if (!questions) {
    return null
  }



  const questionList = questions.map(question => <Question key={question.uuid} question={question} />)

  return questionList

}

export default Questions;
