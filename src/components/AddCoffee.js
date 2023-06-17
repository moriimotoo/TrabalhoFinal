import React, { useState } from 'react';
import TaskService from "../service/coffee.services";
import { Form, InputGroup, Button } from "react-bootstrap";
import '../styles/AddCoffee.css';

export const AddCoffee = () => {

    const [taskItem, setTaskItem] = useState("");
    const [taskDescricao, setTaskDescricao] = useState("");
    const [taskPreco, setTaskPreco] = useState("");
    const [taskTamanho, setTaskTamanho] = useState("");

    
    const handleSubmit = async (e) => {

        e.preventDefault();

        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

        const newTask = {
            taskItem, taskDescricao, taskPreco, taskTamanho, date,
        }

        
        if (taskItem === "" || taskDescricao === "") {
            console.log("Dados insufientes");
            alert("Por favor, coloque os dados completos");
            return;
        }

        try {
            await TaskService.addTasks(newTask);
            setTaskItem("");
            setTaskDescricao("");
            setTaskPreco("");
            setTaskTamanho("");
        } catch (err) {
            console.log(err);
            return;
        }
    };

    return (
        <div id='mainDiv'>
            <form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                <h1 id='titulo'>NOVO ITEM</h1>
                    <InputGroup>
                        <Form.Control  type="text" placeholder="Item" value={taskItem} onChange={(e) => setTaskItem(e.target.value)} />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                    <InputGroup>
                        <Form.Control type="text" placeholder="Descrição" value={taskDescricao} onChange={(e) => setTaskDescricao(e.target.value)} />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                    <InputGroup>
                        <Form.Control type="text" placeholder="Preço" value={taskPreco} onChange={(e) => setTaskPreco(e.target.value)} />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                    <InputGroup>
                        <Form.Control type="text" placeholder="Tamanho" value={taskTamanho} onChange={(e) => setTaskTamanho(e.target.value)} />
                    </InputGroup>
                </Form.Group>

                <Button id='add-button' type="Submit">
                    Adicionar
                </Button>
            </form>
        </div>
    )
}
