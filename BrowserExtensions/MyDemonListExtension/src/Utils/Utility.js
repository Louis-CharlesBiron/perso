function capitalize(str) {
    return str.replaceAll(/(?:\s|^)[a-z]/g,x=>x.toUpperCase())
}

export {capitalize}
