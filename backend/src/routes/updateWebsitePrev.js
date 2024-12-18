import { getDbConnection } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export const saveWebPrev = {
    path: '/api/save-webprev/',
    method: 'post',
    handler: async (req, res) => {

       
        const { authorization } = req.headers;
        const { id, websiteId, imageUri } = req.body;

        if (!authorization) {
            return res.status(401).json({ message: "No Authorization header sent." })
        }

      
        const token = authorization.split(" ")[1];

        jwt.verify(
            token,
            process.env.JWT_SECRET,
            async (err, decoded) => {
                if (err) return res.status(401).json({ message: "Unable to verify user" });

                const { id: _id } = decoded;


                if (id !== _id) {
                    return res.status(403).json({ message: "Does not have privilage to modify website" });
                }

                const db = getDbConnection(process.env.API_DB_NAME);
                const result = await db.collection("websites").findOneAndUpdate(
                    {
                        "_id": ObjectId(websiteId)
                    },
                    { $set: { prevImgUri: imageUri } },
                    { returnOriginal: false }
                );


                res.status(200).json({ message: "Image updated" })

            }
        )


    }
}