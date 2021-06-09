import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
    const users = [
        {
            id: 0,
            name: 'Luciano'
        },
        {
            id: 1,
            name: 'Ferreira'
        },
        {
            id: 2,
            name: 'Silva'
        },
    ]

    return res.json(users)
}