import {
    Avatar,
    AvatarBadge,
    AvatarGroup,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    WrapItem,
    Button,
    Box,
    Image,
    Flex,
    Text
} from '@chakra-ui/react';

import { HiOutlineUserCircle } from 'react-icons/hi';
import useAxiosPrivate from "../../hooks/useAxiosPrivate.jsx";



const ProfileMenu = () => {
    const axiosPrivate = useAxiosPrivate();
    const logOutHandler = async (e) => {
        e.preventDefault();
        const response = await  axiosPrivate.post('/logout');
        console.log(response.data);
    }
    return (

        <>
            <Menu w='800px'>
                 <MenuButton>
                <Avatar as={Box} name='Rohit Sadhu' bg='blue.100' >
                    <AvatarBadge borderColor='gray.200' bg='blue.300' boxSize='1em' />
                </Avatar>
                 </MenuButton >
                <MenuList w='350px'>
                    <Flex direction='col' justify={'center'} items={'center'}>

                        <Box>

                            <Image
                                boxSize='80px'
                                borderRadius='full'
                                src='https://placekitten.com/100/100'
                                alt='Fluffybuns the destroyer'
                                mt='5px'
                                mb='10px'
                            />
                        </Box>
                    </Flex>
                    <Flex direction='col' justify={'center'} items={'center'}>
                        <Box>
                            <Text align='center'>Rohit Sadhu</Text>
                            <Text align='center'>rohitsadhupersonal@gmail.com</Text>
                        </Box>
                    </Flex>
                    <MenuDivider />
                    <MenuItem w='full' minH='60px' >
                        <Flex w='full' direction='col' justify={'center'} items={'center'}>
                            <Flex gap={'15px'}>
                                <HiOutlineUserCircle size={28} />
                                <Text align='center' fontSize='xl' fontWeight='500' >My Account</Text>
                            </Flex>
                        </Flex>
                    </MenuItem>
                    <MenuDivider />
                    <Flex w='full' direction='col' justify={'center'} items={'center'}>
                        <WrapItem>
                            <Button bg='blue.300' ><Text color='gray.600' onClick={logOutHandler}>Log Out</Text></Button>
                        </WrapItem>
                    </Flex>
                </MenuList>
            </Menu >
        </>

    );
}

export default ProfileMenu;
