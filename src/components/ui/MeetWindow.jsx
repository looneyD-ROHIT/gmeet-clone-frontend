import { Card, CardBody, CardHeader, Heading, Box, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import VideoChatPanel from "../cards/VideoChatPanel.jsx";
import socket from '../../config/socketConfig.jsx';

const MeetWindow = (props, ref) => {

    return (
        <>
            <Flex justifyContent={'space-around'} items={'center'} paddingX={'50px'} paddingY={'50px'}>
                <Card boxShadow={'dark-lg'} w={{
                    base: '500px',
                    md: '80vw'
                }} h={{
                    base: '500px',
                    md: '80vh'
                }}>
                    <CardHeader>
                        <Heading size='md' textAlign={'center'}>Meet Window</Heading>
                    </CardHeader>
                    <CardBody as={Flex} justifyContent={'space-around'} items={'center'}>
                        <VideoChatPanel />
                    </CardBody>
                </Card>
            </Flex>
            <button onClick={props.onClick}>Cancel</button>
        </>
    );
}

export default MeetWindow;