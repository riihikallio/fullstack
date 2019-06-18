import React from 'react'

const Header = ({title}) => <h2>{title}</h2>

const Total = ({parts}) => {
  const total = parts.reduce((s, p) => s += p.exercises, 0)

  return <p><b>yhteensä {total} tehtävää</b></p>
}
  
const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Content = ({parts}) => parts.map(p => <Part part={p} key={p.id} />)

const Course = ({course}) => (
    <>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
)

export default Course