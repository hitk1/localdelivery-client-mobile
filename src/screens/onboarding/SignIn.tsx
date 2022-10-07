import React from 'react'
import { Text, View } from 'react-native'
import { Form } from '@unform/mobile'
import { Input } from '@/components/Input'

const SignIn: React.FC = () => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <View
                style={{
                    width: '90%'
                }}
            >
                <Form
                    onSubmit={() => { }}
                >
                    <Input
                        name='teste'
                    />
                </Form>
            </View>
        </View>
    )
}

export { SignIn }