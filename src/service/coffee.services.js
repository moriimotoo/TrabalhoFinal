import { db } from "../firebase-config"
import { doc, getDoc, getDocs, collection, addDoc, updateDoc, deleteDoc} from "firebase/firestore";

const coffeeCollectionRef = collection(db, "cafeteria");

class CoffeeService{

    getTask = (id) => {
        const taskDoc = doc(db, "cafeteria", id);
        return getDoc(taskDoc);
    }

    getAllTasks = () => {
        return getDocs(coffeeCollectionRef);
    }

    addTasks = (newTask) => {
        return addDoc(coffeeCollectionRef, newTask);
    }

    updateTask = (id, updatedTask) => {
        const taskDoc = doc(db, "cafeteria", id);
        return updateDoc(taskDoc, updatedTask);
    }

    deleteTask = (id) => {
        const taskDoc = doc(db, "cafeteria", id);
        return deleteDoc(taskDoc);
    }
}

export default new CoffeeService();