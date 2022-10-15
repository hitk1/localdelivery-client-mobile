import { Input, PrimaryButton } from '@/components'
import { useOnboarding } from '@/hooks/onboarding'
import React from 'react'
import { ApiService } from '@/services/api'
import { FormHandles } from '@unform/core'
import { TextInput } from 'react-native-gesture-handler'

import { OnboardingForm } from './styles'
import { IParamsOnboardingCreateAddress } from '@/services/api/interfaces'

interface IFormData {
    address: string
    number: string
    complement: string
    neighborhood: string
    zip_code: string
    alias_address: string
}

interface Props {
    handlePageChange(): void
}

const Address = ({ }: Props) => {
    const api = new ApiService()
    const {
        onboardingUserId
    } = useOnboarding()

    const formRef = React.useRef<FormHandles>(null)
    const addressRef = React.useRef<TextInput>(null)
    const numberRef = React.useRef<TextInput>(null)
    const complementRef = React.useRef<TextInput>(null)
    const neighborhoodRef = React.useRef<TextInput>(null)
    const zipCodeRef = React.useRef<TextInput>(null)
    const aliasRef = React.useRef<TextInput>(null)

    const [isSubmiting, setSubmiting] = React.useState(false)

    const submitForm = React.useCallback(() => formRef.current?.submitForm(), [formRef])

    const onSubmit = React.useCallback(async (data: IFormData) => {
        formRef.current?.setErrors({})

        let formatedData = JSON.parse(JSON.stringify(data))

        try {
            if (!data.alias_address)
                formatedData = {
                    ...formatedData,
                    ibge_code: '3538105',
                    address_alias: 'Endereço Principal',
                    customer_id: onboardingUserId
                } as IParamsOnboardingCreateAddress

            setSubmiting(true)
            await api.onboardingCreateAddress(formatedData)
        } catch (error) {
            console.log({ error })
        }

        setSubmiting(false)
    }, [])

    const fetchUserAddress = React.useCallback(async (userId: string) => {
        setSubmiting(true)

        try {
            const address = await api.onboardingGetUserAddress(userId)

            console.log(address)
        } catch (error) {
            console.log('Error on fetch user address data')
        } finally {
            setSubmiting(false)
        }
    }, [])

    const handleFocus = React.useCallback((inputRef: React.RefObject<{ name: string }>) => {
        const errors = formRef.current?.getErrors()

        if (errors) {
            delete errors[inputRef.current?.name as string]
            formRef.current?.setErrors(errors as any)
        }
    }, [])

    React.useEffect(() => {
        (async () => {
            if (onboardingUserId)
                await fetchUserAddress(onboardingUserId)
        })()
    }, [])

    return (
        <OnboardingForm
            ref={formRef}
            onSubmit={onSubmit}
        >
            <Input
                ref={addressRef}
                name="address"
                label="Endereço"
                placeholder='Insira o endereço'
                autoCorrect={false}
                autoCapitalize="words"
                returnKeyType='next'
                keyboardType='name-phone-pad'
                maxLength={300}
                disabled={isSubmiting}
                onFocus={() => handleFocus(addressRef)}
                onSubmitEditing={() => numberRef.current?.focus()}
            />
            <Input
                ref={numberRef}
                name="number"
                label="Número"
                placeholder='Insira o número'
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType='next'
                keyboardType='number-pad'
                maxLength={10}
                disabled={isSubmiting}
                onFocus={() => handleFocus(numberRef)}
                onSubmitEditing={() => complementRef.current?.focus()}
            />
            <Input
                ref={complementRef}
                name="complement"
                label="Complemento"
                placeholder='Insira o complemento (opcional)'
                autoCorrect={false}
                autoCapitalize="words"
                returnKeyType='next'
                keyboardType='name-phone-pad'
                maxLength={255}
                disabled={isSubmiting}
                onFocus={() => handleFocus(complementRef)}
                onSubmitEditing={() => neighborhoodRef.current?.focus()}
            />
            <Input
                ref={neighborhoodRef}
                name="neighborhood"
                label="Bairro"
                placeholder='Insira o bairro'
                autoCorrect={false}
                autoCapitalize="words"
                returnKeyType='next'
                keyboardType='name-phone-pad'
                maxLength={255}
                disabled={isSubmiting}
                onFocus={() => handleFocus(neighborhoodRef)}
                onSubmitEditing={() => zipCodeRef.current?.focus()}
            />
            <Input
                ref={zipCodeRef}
                name="zip_code"
                label="CEP"
                placeholder='Insira o Cep'
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType='next'
                keyboardType='number-pad'
                maxLength={8}
                disabled={isSubmiting}
                onFocus={() => handleFocus(zipCodeRef)}
                onSubmitEditing={() => aliasRef.current?.focus()}
            />
            <Input
                ref={aliasRef}
                name="address_alias"
                label="Apelido do endereço"
                placeholder='Endereço principal :)'
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType='next'
                keyboardType='number-pad'
                maxLength={255}
                disabled={isSubmiting}
                onFocus={() => handleFocus(aliasRef)}
                onSubmitEditing={submitForm}
            />
            <PrimaryButton
                onPress={submitForm}
                label="Continuar"
                disabled={isSubmiting}
                style={{
                    marginTop: 32
                }}
            />
        </OnboardingForm>
    )
}

export { Address }