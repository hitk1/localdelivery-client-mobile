import defaultLight, { Theme } from './light'

export type ThemeNames = 'light'
export interface ThemeMeta {
    id: ThemeNames,
    name: string,
    theme: Theme
}

export const themes: readonly ThemeMeta[] = [
    {
        id: 'light',
        name: 'Default theme',
        theme: defaultLight
    }
]

export type { Theme }