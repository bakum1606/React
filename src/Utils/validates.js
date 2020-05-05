import React from 'react'

 export const required = value => {
    if (value) return undefined
    return 'Field is required'
}

export const maxLength = (max) => value => {
    if (value.length > max)  return `More than ${max}`
    return undefined
}