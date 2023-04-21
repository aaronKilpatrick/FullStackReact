const Course = ({courses}) => {
    return (
      <div>
        {courses.map(course =>
          <div key={course.id}>
            <Header header={course.name} />
            <Content parts={course.parts}/>
          </div>
        )}
      </div>
    )
  }
  
  const Header = ({header}) => <h2>{header}</h2>
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map((part) => 
          <Part name={part.name} exercises={part.exercises} key={part.id} />
        )}
        <Total parts={parts} />
      </div>
    )
  }
  
  const Total = ({parts}) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  
    return (
      <p>Total of {total} exercises</p>
    )
  }
  
  const Part = ({name, exercises}) => <p>{name} {exercises}</p>

  export default Course