const Questions = ({ data }) => {

  if (!data) {
    return null
  } 

  const questions = data.quiz.question;

  const questionList = questions.map(question => <pre className="rounded border">{JSON.stringify(question, null, 2)}</pre>)

  return questionList

}

export default Questions;
