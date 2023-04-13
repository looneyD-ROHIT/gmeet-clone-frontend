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
import { useState } from "react";

const MeetButtonGroup = (props) => {
    const [isFocussed, setIsFocused] = useState(false);
    const [meetCode, setMeetCode] = useState('');
    const codeAreaChangeHandler = (e) => {
        e.preventDefault();
        const code = e.target.value.trim();
        setMeetCode(code);
    }
    return (
        <Flex gap='10px' direction={{
            base: 'column',
            lg: 'row',
        }}>

            <Button display={{
                base: 'flex',
                lg: 'none'
            }}><span><MdOutlineVideoCall size={20} /></span>Create</Button>
            <Button display={{
                base: 'none',
                lg: 'flex'
            }} ><span><MdOutlineVideoCall size={24} /></span>Create</Button>
            <InputGroup w={{
                base: '250px',
                lg: '180px'
            }}>
                <InputLeftElement
                    pointerEvents='none'
                    children={<MdKeyboard size={24} color='gray.300' />}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                <Input type='text' placeholder='Enter Meet Code'
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={codeAreaChangeHandler}
                />
            </InputGroup>
            {
                ((isFocussed && !meetCode) || meetCode) && <Button onClick={props.onClick} w={{
                    base: 'full',
                    lg: '100px',
                }}>Join &nbsp; 🚀</Button>
            }

        </Flex>
    );
}
export default MeetButtonGroup;