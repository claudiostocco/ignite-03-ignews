import { NextApiRequest, NextApiResponse } from 'next'

const users = (req: NextApiRequest, resp: NextApiResponse) => {
    const users = [
        {
            name: 'Claudio',
            age: 39,
            genere: 'Male'
        },
        {
            name: 'Simone',
            age: 37,
            genere: 'Female'
        },
        {
            name: 'Lucas',
            age: 17,
            genere: 'Male'
        },
        {
            name: 'Daniel',
            age: 11,
            genere: 'Male'
        },
    ]

    resp.json(users)
}

export default users