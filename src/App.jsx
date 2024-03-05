import { useState } from 'react'
import { getDatabase, ref, set ,push,onValue } from "firebase/database";


function App() {

  let [text, setText] = useState("")
  let [alltodo, setAlltodo] = useState([])
  const db = getDatabase();
  
  let handleForm = (e) =>{
    setText(e.target.value);
  }

  //write operation
  let handleSubmit = () =>{
    if(text !== ""){
      set(push(ref(db, 'alltodo')), {
          mytext: text,
      }).then(()=>{
        console.log("success");
      });
    }else{
      console.log("text ny");
    }
  }

  //read operation

  const TodoRef = ref(db, 'alltodo');
onValue(TodoRef, (snapshot) => {
  let arr = []
  const data = snapshot.val();
  snapshot.val().forEach((item)=>{
    console.log(item);
  })
  // console.log(typeof data);
});


  return (
    <>
      <input onChange={handleForm} name='text' placeholder='Enter your task' />
      <button onClick={handleSubmit} >Submit</button>
    </>
  )
}

export default App
