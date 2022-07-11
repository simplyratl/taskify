import React from 'react'

interface Props{
    todo:string;
    setTodo:React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e:React.FormEvent) => void;
}

const InputFields:React.FC<Props> = ({todo, setTodo, handleAdd}) => {
  return (
    <form className='input' onSubmit={handleAdd}>
        <input 
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder='Enter a task' className='input__box'
        />
        <button className='input__submit' type='submit'>Add</button>
    </form>
  )
}

export default InputFields