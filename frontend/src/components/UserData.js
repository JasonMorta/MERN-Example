import React, { useState } from 'react'

export default function UserData(props) {

  const [todo, setTodo] = useState(props.passData[1].todo)
  console.log('props', props)

  //Delete
  async function deleteItem(todo_item, index) {
    
    await fetch("/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        auth: `${sessionStorage.getItem("jwtToken")}`,
      },
      body: JSON.stringify({
        id: props.passData[1]._id,
        todo_item: todo_item,
      }),
    })
      .then((response) => response.json())
      .then((data) => { 
        console.log('data', data) 
        if (data[1] === "invalid token") {
          console.log('invalid token',) 
        } else {
          setTodo(data[1].todo)
        }
  
      })
    
      .catch((error) => {
        console.error("error")
        console.error(error)
      });
  }

  // render user todo list and display user email.
  //to-do: add a delete button for each todo item
  return (
    <div>
      <h2>{props.passData[1].email}</h2>
      {todo?.map((item, index) => (
          <div key={index}>
            <p>{item}</p>
            <button onClick={() => deleteItem(item, index)}>Delete</button>
          </div>
        ))

      }
    </div>

  )
}
