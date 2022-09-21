import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Container, Text, TouchableOpacity } from '@/components/atoms'
import { PasswordInput, TextInput, } from '@/components/molecules'
import { loginSchema } from './schemas'
import { Alert } from 'react-native'

export default function LoginScreen() {
    const form = useForm({
        resolver: yupResolver(loginSchema),
        mode: 'onBlur'
    })

    const onSubmit = React.useCallback(() => {
        console.log('do something')
    }, [])
    return (
        <Container
            justifyContent="center"
            alignItems="center"
            px='lg'
        >
            <FormProvider {...form}>
                <TextInput
                    name='email'
                    label='Email'
                    inputProps={{
                        placeholder: 'Insira seu email',
                        autoComplete: 'email',
                        autoCapitalize: 'none',
                        textContentType: 'emailAddress',
                        keyboardType: 'email-address',
                        returnKeyType: 'next',
                    }}
                />

                <PasswordInput
                    name="password"
                    label="Senha"
                    textContentType='password'
                    placeholder='Insira sua senha'
                    containerProps={{
                        mt: 'md'
                    }}
                />
            </FormProvider>
            <Box mt="xxl">
                <TouchableOpacity
                    label='Entrar'
                    onPress={onSubmit}
                    actionType="primary"
                />
            </Box>
        </Container>
    )
}