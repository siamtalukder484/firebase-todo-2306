import { useEffect, useState } from 'react'
import { getDatabase, ref, set ,push,onValue,remove,update  } from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  let [text, setText] = useState("")
  let [alltodo, setAlltodo] = useState([])
  let [isBtn, setIsBtn] = useState(true)
  let [allinfo, setAllinfo] = useState({})
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
        toast.success('Todo Created Successfully..', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          setText("")
      });
    }else{
      toast.error('Please Enter some text', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }

  //read operation
  useEffect(()=>{
    const todoRef = ref(db, 'alltodo');
    onValue(todoRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        arr.push({...item.val(), id: item.key})
      })
      setAlltodo(arr)
    });
  },[])

  // delete operation
  let handleDelete = (deleteid) => {
    remove(ref(db, "alltodo/" + deleteid)).then(()=>{
      toast.error('Delete Successfully...', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    })
  }

  // edit operation
  let handleEdit = (editinfo) => {
    setIsBtn(false)
    setText(editinfo.mytext)
    setAllinfo(editinfo);
  }

  let handleUpdate = () => {
    update(ref(db, "alltodo/" + allinfo.id),{
      ...allinfo,
      mytext: text, 
    }).then(()=>{
      setText("")
      setIsBtn(true)
      toast.success('Todo Update Successfully..', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    })
  }


  return (
    <>
    <ToastContainer/>
    <div>
      <h1 className='text-[red] bg-orange-500'>hello tailwind</h1>
    </div>
      <input onChange={handleForm} name='text' value={text} placeholder='Enter your task' />
      {isBtn
        ?
        <button onClick={handleSubmit} >Submit</button>
        :
        <button onClick={handleUpdate}>Update</button>
      }
      <div>
        <ul className=''>
          {alltodo.map((item,index)=>(
            <li key={index}>{item.mytext} 
            <button onClick={()=>handleDelete(item.id)}>Delete</button>
            <button onClick={()=>handleEdit(item)}>Edit</button></li>
          ))
          }
          
        </ul>
      </div>
    </>
  )
}

export default App
