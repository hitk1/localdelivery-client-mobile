import React from 'react'
import { Container, Text, TextInput} from '@/atoms'
import { backgroundColor, spacing } from '@shopify/restyle'

export default function LoginScreen(){
    return(
        <Container
            justifyContent="center"
            alignItems="center"
            px='sm'
>
            <TextInput
                name='email'
                label='Email'
                inputProps={{
                    maxLength: 10
                }}
            />

            <TextInput 
                name="password"
                label="Senha"
                containerProps={{
                    mt: 'md'

                }}
                />
        </Container>
    )
}