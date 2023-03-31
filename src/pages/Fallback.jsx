import { NavLink } from 'react-router-dom';
import { Box } from '@chakra-ui/react'
const Fallback = () => {
    return <Box>
        <Box>
            <a href='/'>
                HOME
            </a>
        </Box>
        <br />
        <br />
        <br />
        <br />
        <Box>
            You were logged out, due to security reasons!!!
        </Box>
    </Box>
}

export default Fallback;