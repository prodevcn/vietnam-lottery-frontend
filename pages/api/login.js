import {NextApiRequest, NextApiResponse, NextApiHandler} from 'next';

export default function (req, res) {
    console.log(req.body);
}