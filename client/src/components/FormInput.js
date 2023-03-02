import * as React from 'react'
import { Box, Input, Text } from '@chakra-ui/react';

function FormInput({ label, placeholder, value, type, isValid, onChange, min, max, ...rest }) {

  return (
    <Box className='mb-4' w='100%' {...rest} >
      <Text mb='0.5rem'>{label}</Text>
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
				type={type}
				min={min || 5}
				max={max || 30}
				isRequired
				isInvalid={!isValid}
      />
    </Box>
	)
}

export default FormInput;
