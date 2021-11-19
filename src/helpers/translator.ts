type TranslatorPayloadType = {
    label: string
    dictionary: any
    labels: any
}

type translatorType = (labelData: TranslatorPayloadType) => string

export const translator: translatorType = ({label, dictionary, labels}) => {

    let labelKey: string | null = null

    Object.keys(dictionary).forEach(key => {
        if (dictionary[key] === label) {
            labelKey = key
        }
    })

    if (!labelKey) {
        return label
    }

    return labels[labelKey]
}