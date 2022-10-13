import { Input } from '@/components'
import { FormHandles } from '@unform/core'
import React from 'react'

import { OnboardingForm } from './styles'

interface Props {
    handlePageChange(): void
}

const Address = ({ }: Props) => {
    const formRef = React.useRef<FormHandles>(null)

    const [isSubmiting, setSubmiting] = React.useState(false)

    const onSubmit = React.useCallback(() => { }, [])

    return (
        <OnboardingForm
            ref={formRef}
            onSubmit={onSubmit}
        >
            <Input
                ref={null}
                name="name"
                label="Nome"
                placeholder='Insira seu nome'
                autoCorrect={false}
                autoCapitalize="words"
                returnKeyType='next'
                keyboardType='name-phone-pad'
                maxLength={300}
                disabled={isSubmiting}
            />
        </OnboardingForm>
    )
}

export { Address }