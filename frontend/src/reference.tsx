// import React, { useRef } from 'react';

// interface NewTodoProps {
//   onAddTodo: (todoText: string) => void;
// }

// const NewTodo: React.FC<NewTodoProps> = ({onAddTodo}) => {
//   const textInputRef = useRef<HTMLInputElement>(null);
//   const todoSubmitHandler = (e: React.FormEvent) => {
//     e.preventDefault();
//     const enteredText = textInputRef.current?.value;
//   }
  
//   return (
//     <form onSubmit={todoSubmitHandler}>
//       <div>
//         <label htmlFor="todo-text">Todo Text</label>
//         <input ref={textInputRef} id='todo-text' type="text"/>
//       </div>
//       <button type="submit">Add Todo</button>
//     </form>
//   );
// }

// export default NewTodo;




// import React from 'react';

// interface TodoListProps {
//   todos: {id:string, text:string }[],
//   todoDeleteHandler: (id: string, text: string) => void,
// }

// const TodoList:  React.FC<TodoListProps> = ({todos, todoDeleteHandler}) => {
//   return (
//     <ul>
//       {todos.map(todo => {
//         return (
//           <li key={todo.id}>
//             <span>{todo.text}</span>

//             {/* NOTE: This what the second parameter of .bind() does;  it lets you specify the first received parameter on the callback function given */}
//             <button onClick={todoDeleteHandler.bind(null, todo.id, todo.text)}>Delete</button>
//           </li>
//         )
//       })}
//     </ul>
//   )
// }

// export default TodoList;