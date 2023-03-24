import * as React from 'react'
import { Box, Card, CardHeader, CardBody } from '@chakra-ui/react'
import { SPLASH_CONTENT_LOG, SPLASH_CONTENT_TAG, SPLASH_CONTENT_CUSTOM, SPLASH_CONTENT_TIMELINE, SPLASH_CONTENT_INSIGHT } from '../lang/en-gb';

function Splash() {
	return (
		<Box>
			<div className="my-2 mx-auto">
						<h1 className="text-center text-3xl mb-6">{SPLASH_CONTENT_LOG}</h1>
						<h2 className="text-center text-2xl mb-3">{SPLASH_CONTENT_TAG}</h2>
						<h3 className="text-center text-2xl mb-3">{SPLASH_CONTENT_CUSTOM}</h3>
						<h3 className="text-center text-2xl mb-3">{SPLASH_CONTENT_TIMELINE}</h3>
						<h3 className="text-center text-2xl mb-3">{SPLASH_CONTENT_INSIGHT}</h3>
			</div>
		</Box>
	);
}

export default Splash;