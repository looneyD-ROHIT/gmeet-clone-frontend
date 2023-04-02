import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    useToast
} from '@chakra-ui/react';
import { useState, useReducer } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Form, Formik } from 'formik';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { axiosPrivate } from '../../api/axios';
import { NavLink, useNavigate } from 'react-router-dom';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isDisabled: false,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'firstName': {
            return {
                firstName: action.value,
                lastName: state.lastName,
                email: state.email,
                password: state.password,
            }
        }
        case 'lastName': {
            return {
                firstName: state.firstName,
                lastName: action.value,
                email: state.email,
                password: state.password,
            }
        }
        case 'email': {
            return {
                firstName: state.firstName,
                lastName: state.lastName,
                email: action.value,
                password: state.password,
            }
        }
        case 'password': {
            return {
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email,
                password: action.value,
            }
        }
        case 'reset': {
            return initialState;
        }
        case 'submit': {
            return {
                ...state,
                isDisabled: action.value
            }
        }
    }
    return initialState;
}

const SignUpCard = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [isClicked, setIsClicked] = useState(false);

    // const axiosPrivate = useAxiosPrivate();

    const [formState, dispatchFormStateChanges] = useReducer(reducer, initialState);

    const navigate = useNavigate();

    const toast = useToast();

    const firstNameChangeHandler = (e) => {
        dispatchFormStateChanges({ type: 'firstName', value: e.target.value });
    }
    const lastNameChangeHandler = (e) => {
        dispatchFormStateChanges({ type: 'lastName', value: e.target.value });
    }
    const emailChangeHandler = (e) => {
        dispatchFormStateChanges({ type: 'email', value: e.target.value });
    }
    const passwordChangeHandler = (e) => {
        dispatchFormStateChanges({ type: 'password', value: e.target.value });
    }



    const signUpHandler = async (e) => {
        setIsClicked(true);
        dispatchFormStateChanges({ type: 'submit', value: true });
        e.preventDefault();
        // console.log(formState);
        try {
            const response = await axiosPrivate.post('/register', {
                firstName: formState.firstName,
                lastName: formState.lastName,
                email: formState.email,
                password: formState.password,
            })
            // console.log(response);
            if (response?.data?.success) {
                toast({
                    position: 'top',
                    title: 'Account Creation Successful :)',
                    description: "We've created an account for you.",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            } else {
                toast({
                    position: 'top',
                    title: 'Account Creation Failure :(',
                    description: (response?.data?.message) ? response?.data?.message : 'Request completion failed',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            }
            navigate('/login');
        } catch (err) {
            console.log('Error occurred in signing up: ' + err);
            toast({
                position: 'top',
                title: 'Account Creation Failure :(',
                description: (err.message) ? err.message : 'Request completion failed',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
        finally {
            dispatchFormStateChanges({ type: 'reset' });
            dispatchFormStateChanges({ type: 'submit', value: false });
            setIsClicked(false);
        }
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool features ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <HStack>
                            <Box>
                                <FormControl isDisabled={formState.isDisabled} id="firstName" isRequired>
                                    <FormLabel>First Name</FormLabel>
                                    <Input value={formState.firstName} type="text" id="firstName" name="firstName" onChange={firstNameChangeHandler} />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl isDisabled={formState.isDisabled} id="lastName" isRequired>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input value={formState.lastName} type="text" id="lastName" name="lastName" onChange={lastNameChangeHandler} />
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl isDisabled={formState.isDisabled} id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input value={formState.email} type="email" id="email" name="email" onChange={emailChangeHandler} />
                        </FormControl>
                        <FormControl isDisabled={formState.isDisabled} id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input value={formState.password} type={showPassword ? 'text' : 'password'} id="password" name="password" onChange={passwordChangeHandler} />
                                <InputRightElement h={'full'}>
                                    <Button
                                        isDisabled={formState.isDisabled || formState.password === ''}
                                        variant={'ghost'}
                                        onClick={() =>
                                            setShowPassword((showPassword) => !showPassword)
                                        }>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                isDisabled={formState.isDisabled || isClicked}
                                loadingText="Submitting"
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                onClick={signUpHandler}>
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>

                            <Box align={'center'}>
                                Already a user?
                                <Text
                                    color={'blue.400'}
                                    _hover={{
                                        textDecoration: "underline",
                                        color: "blue.600"
                                    }}
                                >
                                    <NavLink to={formState.isDisabled ? '#' : '/login'}>
                                        Login
                                    </NavLink>
                                </Text>
                            </Box>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}

export default SignUpCard;