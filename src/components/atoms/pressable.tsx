import { Theme } from '@/themes'
import { createBox } from '@shopify/restyle'
import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Pressable = createBox<Theme, TouchableOpacityProps>(TouchableOpacity)
export type PressableProps = React.ComponentProps<typeof Pressable>

export default Pressable