import { MantineColorScheme, MantineColorSchemeManager } from '@mantine/core'
import { Cookies } from 'next-client-cookies'

type SchemeSubscriber = (colorScheme: MantineColorScheme) => void

export class ColorSchemeManager implements MantineColorSchemeManager {
    private _subscribers: Map<SchemeSubscriber, SchemeSubscriber> = new Map()

    public defaultScheme: MantineColorScheme | undefined

    constructor(
        private cookies: Cookies,
        public key: string = '_scheme',
    ) {
        this.defaultScheme = (this.cookies.get(this.key) as MantineColorScheme | undefined) || 'light'
    }

    private setScheme = (value: MantineColorScheme) => {
        const currentValue = this.cookies.get(this.key)
        if (currentValue === value) return
        this.cookies.set(this.key, value)
        this._subscribers.forEach((subscriber) => {
            subscriber(value)
        })
    }

    get = (defaultValue: MantineColorScheme): MantineColorScheme => {
        return (this.cookies.get(this.key) as MantineColorScheme) || defaultValue
    }
    set = (value: MantineColorScheme) => {
        this.setScheme(value)
    }
    subscribe = (onUpdate: SchemeSubscriber) => {
        this._subscribers.set(onUpdate, onUpdate)
    }
    unsubscribe: () => void = () => {
        this._subscribers.clear()
    }
    clear = () => {
        this.unsubscribe()
        this.cookies.remove(this.key)
    }
}