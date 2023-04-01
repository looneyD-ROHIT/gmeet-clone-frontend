import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    TabIndicator,
    Box,
    Flex,
    Text,
} from '@chakra-ui/react'
import {
    MdOutlineVideoCall,
} from "react-icons/md";
import { IconContext } from 'react-icons';
const MeetCarousel = () => {
    return (
        <Box w={'500px'}>
        <Tabs position="relative" variant="unstyled" >
            <TabList as={Flex} justifyContent={'space-evenly'}>
                <Tab fontSize={'lg'} fontWeight={500}>Get</Tab>
                <Tab fontSize={'lg'} fontWeight={500}>Set</Tab>
                <Tab fontSize={'lg'} fontWeight={500}>Go!</Tab>
            </TabList>
            <TabIndicator
                mt="-1.5px"
                height="4px"
                bg="blue.500"
                borderRadius="2px"
            />
            <TabPanels>
                <TabPanel>
                    <Text textAlign={'center'}>Check ✅ that you have stable internet connection 🛜 to proceed </Text>
                </TabPanel>
                <TabPanel>
                    <Text textAlign={'center'}>Create a new meeting 🤩, using Create Button  <button style={{ display: 'inline-block', position: 'relative', top: '3px' }}><MdOutlineVideoCall as={'span'} size={'20'} /></button>, or enter code &lt;/&gt; to join an existing meeting.</Text>
                </TabPanel>
                <TabPanel>
                    <Text textAlign={'center'}>Superb! 🚀 you now joined a meeting, as simple 👌 as that!</Text>
                </TabPanel>
            </TabPanels>
        </Tabs>
        </Box>
    );
}

export default  MeetCarousel;