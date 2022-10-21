export const normalizeInputValue = <T>(data: T) => {
    let formatedData = {} as T

    for (const [key, value] of Object.entries(data as any)) {
        //ts-ignore
        if (typeof (data as any)[key] != "string")
            formatedData = {
                ...formatedData,
                [key]: value
            }
        else
            formatedData = {
                ...formatedData,
                [key]: (value as string).trim()
            }
    }

    return formatedData
}