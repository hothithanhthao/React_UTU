import React from 'react'

const Header = (props) => {
    return(
      <h1>{props.course.name}</h1>
    )
  }
  
  const Contents = (props) => {
    return(
      <div>
        <Part part={props.course.parts[0]}  />
        <Part part={props.course.parts[1]}  />
        <Part part={props.course.parts[2]}  />
      </div>  
    )
  }
  
  const Part = (props) => {
    return(
      <p>{props.part.name} {props.part.exercises}</p>
    )
  }
  
  const Total = (props) => {
    return(
      <p>Total {props.parts[0].exercises+props.parts[1].exercises+props.parts[2].exercises} exercises</p>
    )
  }
  const Course =(props)=>{
      return(
          <div>
              <Header course={props.course} />
              <Contents course={props.course} />
              <Total parts={props.course.parts}  />
          </div>
      )
  }
  
  export default Course;