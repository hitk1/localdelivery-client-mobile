import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Container, TouchableOpacity } from '@/components/atoms'
import { PasswordInput, TextInput, } from '@/components/molecules'
import { loginSchema } from './schemas'
import { StackScreenProps } from '@/commom/navigators/routes-params'


export default function LoginScreen({ navigation }: StackScreenProps ) {
    const form = useForm({
        resolver: yupResolver(loginSchema),
        mode: 'onBlur'
    })

    const onSubmit = React.useCallback(() => {
        console.log('do something')
    }, [])

    const gotoCreateAccount = React.useCallback(() => navigation.navigate('Onboarding'), [navigation])

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
                    returnKeyType="send"
                    containerProps={{
                        mt: 'md'
                    }}
                />
            </FormProvider>
            <Box
                mt='xxxl'
                mx="sm"
            >
                <TouchableOpacity
                    label="Entrar"
                    onPress={onSubmit}
                    actionType='secondary'
                    mb="md"
                />
                <TouchableOpacity
                    label='Criar conta'
                    onPress={gotoCreateAccount}
                    actionType="primary"
                />
            </Box>
        </Container>
    )
}