import React from 'react'
import * as Yup from 'yup'
import { TextInput } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'
import { FormHandles } from '@unform/core'
import { useOnboarding } from '@/hooks/onboarding'
import { ApiService } from '@/services/api'
import { Input, PrimaryButton } from '@/components'

import {
    OnboardingForm,
    Container
} from './styles'
import { IParamsOnboardingCreateAddress } from '@/services/api/interfaces'
import { KeyboardAvoidingView } from 'react-native'
import { getYupValidationErrors } from '@/common/validations/yupValidationError'
import { normalizeInputValue } from '@/common/utils'

interface IFormData {
    address: string
    number: string
    complement: string
    neighborhood: string
    zip_code: string
    ibge_code?: string
    customer_id?: string
    address_alias?: string
}

interface Props {
    handlePageChange(): void
}

const Address = ({ handlePageChange }: Props) => {
    const api = new ApiService()
    const {
        onboardingUserId,
        onboardingAddressId,
        saveAddressId
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

        let formatedData = normalizeInputValue<IFormData>(data)

        formatedData = {
            ...formatedData,
            zip_code: '15830000',
            ibge_code: '3538105',
            customer_id: onboardingUserId!
        }

        try {
            if (!data.address_alias)
                formatedData = {
                    ...formatedData,
                    address_alias: 'Endereço Principal'
                } as IParamsOnboardingCreateAddress

            setSubmiting(true)
            const { address_id, message } = await api.onboardingCreateAddress({
                address: formatedData.address,
                number: formatedData.number,
                complement: formatedData.complement,
                neighborhood: formatedData.neighborhood,
                zip_code: formatedData.zip_code,
                address_alias: formatedData.address_alias!,
                ibge_code: formatedData.ibge_code!,
                customer_id: formatedData.customer_id!,
            })
            console.log(message)
            await saveAddressId(address_id)

            handlePageChange()
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                formRef.current?.setErrors(getYupValidationErrors(error))
                return
            }

            console.log('Error on created address')
            console.log(error.message)
            console.log({error})

            Toast.show({
                text1: 'Erro inesperado ao cadastrar endereço',
                type: 'error',
                onPress: () => Toast.hide()
            })
        }

        setSubmiting(false)
    }, [])

    const fetchUserAddress = React.useCallback(async (addressId: string) => {
        setSubmiting(true)

        try {
            const { address } = await api.onboardingGetUserAddress(addressId)

            formRef.current?.setData({
                address: address.address,
                number: address.number,
                complement: address.complement,
                neighborhood: address.neighborhood,
                zip_code: address.zip_code,
                address_alias: address.address_alias
            })
        } catch (error) {
            console.log('Error on fetch user address data')
        } finally {
            setSubmiting(false)
        }
    }, [isSubmiting, formRef])

    const handleFocus = React.useCallback((inputRef: React.RefObject<{ name: string }>) => {
        const errors = formRef.current?.getErrors()

        if (errors) {
            delete errors[inputRef.current?.name as string]
            formRef.current?.setErrors(errors as any)
        }
    }, [])

    React.useEffect(() => {
        (async () => {
            if (onboardingAddressId)
                await fetchUserAddress(onboardingAddressId)
        })()
    }, [])

    return (
        <Container
            contentInsetAdjustmentBehavior='automatic'
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
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
                    keyboardType='name-phone-pad'
                    maxLength={255}
                    disabled={isSubmiting}
                    onFocus={() => handleFocus(aliasRef)}
                    onSubmitEditing={submitForm}
                />
                <Input
                    ref={null}
                    name="zip_code"
                    label="CEP"
                    value="15830-000"
                    disabled
                />
                <Input
                    ref={null}
                    name="city"
                    label="Cidade"
                    value="Pindorama"
                    disabled
                />
                <Input
                    ref={null}
                    name="state"
                    label="Estado"
                    value="SP"
                    disabled
                />
                <PrimaryButton
                    onPress={submitForm}
                    label="Continuar"
                    disabled={isSubmiting}
                    style={{
                        marginTop: 32,
                        marginBottom: 16
                    }}
                />
            </OnboardingForm>
        </Container>
    )
}

export { Address }