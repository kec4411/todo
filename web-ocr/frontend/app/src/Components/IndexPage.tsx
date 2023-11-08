import React, {ChangeEvent, memo, useCallback, useEffect, useState, ReactNode, VFC} from "react";
import {
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    useDisclosure, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, ModalFooter, FormHelperText,
} from "@chakra-ui/react";
import { TodoType } from "../types/api/TodoType";


export const IndexPage: VFC = memo(() => {
    const [todoName, setTodoName] = useState('');
    const [todos, setTodos] = useState<Array<TodoType>>([]);
    const onChangeTask = (e: ChangeEvent<HTMLInputElement>) => setTodoName(e.target.value);

    const getTodos = useCallback(async() => {
        const response: Response = await fetch(process.env.REACT_APP_API_SERVICE_URL + "/todos")
        await response.json()
            .then((r) => {
                setTodos(r)
            })
            .catch(() => {
                alert("undefined get Reasponse...")
            });
    },[]);

    const onClickAddTodo = () => {
        if (todoName === "") return;
        const newTodo = {
            "id": todos.length + 1,
            "summary": todoName
        }
        fetch(process.env.REACT_APP_API_SERVICE_URL + "/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTodo)
        }).then(() => {
            getTodos();
        }).catch(() => {
            alert("unknown posted error")
        })
        setTodoName("");
    };

    useEffect( () => {
        getTodos();
    },[getTodos]);


    return (
        <Flex
            align="center"
            color="gray.500"
            height="100vh"
            justify="center"
        >
            <Box
                w="400">
                <Stack spacing={6}>
                    <Heading
                        as="h1"
                        size="lg"
                        textAlign="center"
                    >TodoApp
                    </Heading>
                    <Box w={400}>
                        <Stack>
                            <Input
                                placeholder="Input taskname.."
                                value={todoName}
                                onChange={onChangeTask}
                            />
                            <Button
                                colorScheme="teal"
                                onClick={onClickAddTodo}
                            >Add</Button>
                            <Divider my={"5"}/>
                        </Stack>
                    </Box>
                    {todos.map((todo) => (
                        <Todo
                            key={todo.summary}
                            id={todo.id}
                            item={todo.summary}
                            getTodos={getTodos}
                        />
                    ))}
                </Stack>
            </Box>
        </Flex>
    )
});


type Props = {
    key: string;
    id: number;
    item: string;
    getTodos: () => void;
}

const Todo: VFC<Omit<Props, "key">> = memo((props) => {
    const { id, item, getTodos } = props;

    return (
        <>
            <Box>
                <Text>{item}</Text>
                <UpdateTodo
                    id={id}
                    item={item}
                    getTodos={getTodos}
                >Update</UpdateTodo>
                <DeletedTodo
                    id={id}
                    item={item}
                    getTodos={getTodos}
                >Delete</DeletedTodo>
            </Box>
        </>
    );
});

type UpdateProps = {
    id: number;
    item: string;
    getTodos: () => void;
    children: ReactNode;
}

const UpdateTodo: VFC<UpdateProps> = (props) => {
    const { id, item, getTodos, children } = props;
    const [ todo, setTodo ] = useState(item);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const onClickModalOpen = useCallback(() => onOpen(), [])

    const onChangeTodo = (e: ChangeEvent<HTMLInputElement>) => setTodo(e.target.value);
    const onClickUpdateTodo  = async(id: number, item: string) => {
        await fetch(process.env.REACT_APP_API_SERVICE_URL + `/todos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ summary: item })
        })
        onClose();
        getTodos();
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                autoFocus={false}
            >
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>Task Update</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <Stack>
                                <FormControl>
                                    <FormLabel>Task rename</FormLabel>
                                    <Input
                                        value={todo}
                                        onChange={onChangeTodo}
                                    ></Input>
                                </FormControl>
                            </Stack>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={() => onClickUpdateTodo(id, todo)}>Done</Button>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
            <Button mr="2" onClick={onClickModalOpen}>{children}</Button>
        </>
    );
};

type DeletedProps = {
    id: number;
    item: string;
    getTodos: () => void;
    children: ReactNode;
}

const DeletedTodo: VFC<DeletedProps> = (props) => {
    const { id, item, getTodos, children } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const onClickModalOpen = useCallback(() => onOpen(), [])

    const onClickDeletedTodo  = async(id: number) => {
        await fetch(process.env.REACT_APP_API_SERVICE_URL + `/todos/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })
        onClose();
        getTodos();
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                autoFocus={false}
            >
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>Task Delete</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <Stack>
                                <FormControl>
                                    <FormLabel>this task delete?</FormLabel>
                                    <FormHelperText>{item}</FormHelperText>
                                </FormControl>
                            </Stack>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={() => onClickDeletedTodo(id)}>Done</Button>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
            <Button onClick={onClickModalOpen}>{children}</Button>
        </>
    );
};

