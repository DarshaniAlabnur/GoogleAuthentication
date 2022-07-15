// import { Request, Response, NextFunction } from 'express'
// import res from 'express/lib/response';
// import user from '../../models/user';

// class UserLogin {
//     create = async (request: Request, response: Response, next: NextFunction) => {
//         try {
//             const { userName, password } = req.body
//             const output = await User.create(req.body);
//             console.log(output);
//             res.send({ message: "user added successfully", data: output });
//         } catch (error){
//             return response
//             .status(400)
//             .json({ status: 'Bad Request', message: error });
//         }
//     }
// }
// import * as jwt from 'jsonwebtoken';

// class UserController{
//     createToken(req, res, next) {
//         const token = jwt.sign(req.body, { expiresIn: '12h' });
//         console.log(token);
//         res.status(200).send("Welcome ");
//         return res.status(200).send({ message: 'Token successfully created', data: { token }, status: 'success'});
//         }
// }
// export default new UserController();
