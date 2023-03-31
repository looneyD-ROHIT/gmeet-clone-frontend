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
import { Form, Formik } from 'Formik';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { axiosPrivate } from '../../api/axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/features/authSlice';

const initialState = {
    email: '',
    password: '',
    isDisabled: false,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'email': {
            return {
                email: action.value,
                password: state.password,
            }
        }
        case 'password': {
            return {
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

const LoginCard = () => {
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);

    const [isClicked, setIsClicked] = useState(false);

    // const axiosPrivate = useAxiosPrivate();

    const [formState, dispatchFormStateChanges] = useReducer(reducer, initialState);

    const navigate = useNavigate();

    const toast = useToast();

    const emailChangeHandler = (e) => {
        dispatchFormStateChanges({ type: 'email', value: e.target.value });
    }
    const passwordChangeHandler = (e) => {
        dispatchFormStateChanges({ type: 'password', value: e.target.value });
    }



    const loginHandler = async (e) => {
        setIsClicked(true);
        dispatchFormStateChanges({ type: 'submit', value: true });
        e.preventDefault();
        // console.log(formState);
        try {
            const response = await axiosPrivate.post('/login', {
                email: formState.email,
                password: formState.password,
            })
            // console.log(response);
            if (response?.data?.success) {
                dispatch(authActions.changeAuthData({ id: response?.data?.id, accessToken: response?.data?.accessToken }));
                toast({
                    position: 'top',
                    title: 'Logged In Successfully :)',
                    description: "You'r now logged in...",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            } else {
                dispatch(authActions.changeAuthData({ id: '', accessToken: '' }));
                toast({
                    position: 'top',
                    title: 'Log In Failure :(',
                    description: (response?.data?.message) ? response?.data?.message : 'Invalid Credentials',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            }
            navigate('/app');
        } catch (err) {
            console.log('Error occurred in logging in: ' + err);
            dispatch(authActions.changeAuthData({ id: '', accessToken: '' }));
            toast({
                position: 'top',
                title: 'Log In Failure :(',
                description: (err.message) ? err.message : 'Request ended with some error',
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
            <Stack spacing={8} mx={'auto'} maxW={'lg'} minW={{ base: 'none', md: '450px' }} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign in
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
                                onClick={loginHandler}>
                                Sign in
                            </Button>
                        </Stack>
                        <Stack pt={6}>

                            <Box align={'center'}>
                                New here?
                                <Text
                                    color={'blue.400'}
                                    _hover={{
                                        textDecoration: "underline",
                                        color: "blue.600"
                                    }}
                                >
                                    <NavLink to={formState.isDisabled ? '#' : '/register'}>
                                        Sign Up
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

export default LoginCard;