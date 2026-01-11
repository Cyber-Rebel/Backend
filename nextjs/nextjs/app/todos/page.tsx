
import axios from "axios";
// you gate server side rendering 
async function todos() {
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos/")
    return response.data;
}

export default async function Todos() {

    const todosList = await todos();

    return <div>
        {todosList.map((todo: ITodo) => <Todo title={todo.title} completed={todo.completed} />)}
    </div>
}

interface ITodo {
    title: string;
    completed: boolean;
}

function Todo({title, completed}: ITodo) {
    return <div>
        {title} {completed ? "done!" : "not done"}
    </div>
}


// in here you don't use any useEffect or useState 
// like calling api  innot useEffect save in useSate and render
// const [todosList, setTodosList] = useState<ITodo[]>([]);
// useEffect(() => {
//     async function fetchTodos() {
//         const response = await axios.get("https://jsonplaceholder.typicode.com/todos/")
//         setTodosList(response.data);
//     }
//     fetchTodos();
// }, []);
// why we not do here because 
// first if you use 1 approach the (useEffect + useState) this will take away the benefits of server side rendering
// bacause the useEffect only run on client side 
// useEffect kahi server run nahi hota hae  only send div first 


