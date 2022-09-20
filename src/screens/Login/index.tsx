import React from 'react'
import { Container, Text} from '@/components/atoms'
import { PasswordInput, TextInput,  } from '@/components/molecules'

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
                    textContentType: 'emailAddress',
                    keyboardType: 'email-address',
                    returnKeyType: 'next'
                }}
            />

            <PasswordInput
                name="password"
                label="Senha"
                textContentType='password'
                containerProps={{
                    mt: 'md'
                }}
                />
        </Container>
    )
}