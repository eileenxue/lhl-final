export default function ExamResult (props) {
  const { type, start_date } = props
  return (
    <div>
      <p>{type} | {start_date}</p>
    </div>
  )
}