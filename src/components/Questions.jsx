const Questions = ({ filter, questions }) => {

  if (!questions) {
    return null
  } 

  

  const questionList = questions.map(question => <pre key={question.uuid} className="rounded border bg-warning p-3">{JSON.stringify(question, null, 2)}</pre>)

  return questionList

}

export default Questions;
