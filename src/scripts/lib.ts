
export interface SampleParams {
    path: string
    tags: string
    silencedByTags: string
    rootNote: string 
    loNote?: string 
    hiNote?: string 
    loVel?: string 
    hiVel?: string 
    loopStart?: string 
    loopEnd?: string 
    seqPosition?: string 
    loopEnabled?: string 
    tuning?: string
    start?: string
}


function getAtributes(element: Element): Object {
    return element.getAttributeNames().reduce((acc, name) => {
        return {...acc, [name]: element.getAttribute(name)}
    }, {})
}

export function parseSamples(elem_groups: Element): SampleParams[] {

    const groupsAttributes = getAtributes(elem_groups)
    const samples: SampleParams[] = []
    const elem_group_arr = elem_groups.getElementsByTagName("group")


    Array.prototype.forEach.call(elem_group_arr, function(elem_group) {

        const groupAttributes = getAtributes(elem_group)
        const elem_sample_arr = elem_group.getElementsByTagName("sample")

        Array.prototype.forEach.call(elem_sample_arr, function(elem_sample) {

            const sampleAttributes = getAtributes(elem_sample)
            const comp_atributes = Object.assign({}, groupsAttributes, groupAttributes, sampleAttributes)

            samples.push(<SampleParams>comp_atributes)
        });
    });

    return samples
}