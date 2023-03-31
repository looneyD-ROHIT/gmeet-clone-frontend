import {
    Flex,
    Button,
    Spacer,
    InputGroup,
    InputLeftElement,
    Input,
} from '@chakra-ui/react';
import {
    MdKeyboard,
    MdOutlineVideoCall
} from 'react-icons/md';
const MeetButtonGroup = () => {
    return (
            <Flex gap='10px'>

                <Button w={'250px'}><span><MdOutlineVideoCall size={24}/></span>Create Meet</Button>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<MdKeyboard color='gray.300' />}
                    />
                    <Input type='text' placeholder='Enter Code' />
                </InputGroup>
                <Button>Join</Button>
            </Flex>
    );
}
export default MeetButtonGroup;