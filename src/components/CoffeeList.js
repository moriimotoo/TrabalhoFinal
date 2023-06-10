import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import CoffeeService from "../service/coffee.services";

export const CoffeeList = () => {

    const [cafeteria, setCafeteria] = useState([]);
    const [existingTaskId, setExistingTaskId] = useState("");
    const [existingTaskItem, setExistingTaskItem] = useState("");
    const [existingTaskDescricao, setExistingTaskDescricao] = useState("");
    const [existingTaskPreco, setExistingTaskPreco] = useState("");
    const [existingTaskTamanho, setExistingTaskTamanho] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getTasks();
    }, [cafeteria])

    
    const handleUpdate = async () => {

        
        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

        
        if (existingTaskItem === "" || existingTaskDescricao === "") {
            console.log("Required data missing");
            alert("Please fill the required details");
            return;
        }

        const updatedTask = {
            taskItem: existingTaskItem,
            taskDescricao: existingTaskDescricao,
            taskPreco: existingTaskPreco,
            taskTamanho: existingTaskTamanho,
            date
        }

        
        try {
            await CoffeeService.updateTask(existingTaskId, updatedTask);
        } catch (err) {
            console.log(err);
            return;
        }
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    }

    
    const getTasks = async () => {
        try {
            const data = await CoffeeService.getAllTasks();
            setCafeteria(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (err) {
            console.log(err);
            return;
        }
    }

    
    const editTask = async (id, item, descricao, preco, tamanho) => {
        setOpen(true);
        setExistingTaskId(id);
        setExistingTaskItem(item);
        setExistingTaskDescricao(descricao);
        setExistingTaskPreco(preco);
        setExistingTaskTamanho(tamanho);
    }

    
    const showConfirm = async (id) => {
        if (window.confirm('Tem certeza que quer excluir?')) {
            try {
                await CoffeeService.deleteTask(id)
            } catch (err) {
                console.log(err);
                return;
            }
        }
    }

    return (
        <div id='tableDiv'>
            <h1> CAFÉS</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" >Item</TableCell>
                            <TableCell align="left">Descrição</TableCell>
                            <TableCell align="left">Tamanho</TableCell>
                            <TableCell align="left">Preço</TableCell>
                            <TableCell align="left">Editar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cafeteria.map(task => (
                            <TableRow
                                key={task.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{task.taskItem}</TableCell>
                                <TableCell align="left">{task.taskDescricao}</TableCell>
                                <TableCell align="left">{task.taskTamanho}</TableCell>
                                <TableCell align="left">{task.taskPreco}</TableCell>
                                <TableCell align="left">
                                    <Stack direction="row" spacing={2}>
                                        <Button id='editarbutton' onClick={(e) => editTask(task.id, task.taskItem, task.taskDescricao, task.taskTamanho, task.taskPreco)}>
                                            Editar
                                        </Button>

                                        <Button className="delete" id='delete' onClick={(e) => showConfirm(task.id)} >
                                            Excluir
                                        </Button>
                                    </Stack>
                                </TableCell>
                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleUpdate}>
                <h1 align="center">Atuzalizar</h1>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                    <TextField autoFocus margin="dense" value={existingTaskItem} label="Alterar item" type="text" fullWidth variant="standard" onChange={(e) => setExistingTaskItem(e.target.value)} />
                    <TextField autoFocus margin="dense" value={existingTaskDescricao} label="Descrição" type="text" fullWidth variant="standard" onChange={(e) => setExistingTaskDescricao(e.target.value)}/>
                    <TextField autoFocus margin="dense" value={existingTaskPreco} label="Preço" type="text" fullWidth variant="standard" onChange={(e) => setExistingTaskPreco(e.target.value)} />
                    <TextField autoFocus margin="dense" value={existingTaskTamanho} label="Tamanho" type="text" fullWidth variant="standard" onChange={(e) => setExistingTaskTamanho(e.target.value)} />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>Cancelar</Button>
                    <Button onClick={handleUpdate}>Salvar</Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}
