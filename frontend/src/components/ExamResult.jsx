export default function ExamResult (props) {
  const { type, date } = props
  return (
    <div>
      <p>{type} | {date}</p>
    </div>
  )
}