import express from "express";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import RequestWithUser from "../util/rest/request";
import jsonwebtoken from "jsonwebtoken";
import APP_CONSTANTS from "../constants";
import { json } from "envalid";

const authRoles = ["Developer","Designer"];

const authorize = () => {
    return async (
        req: RequestWithUser,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const token = getTokenFromRequestHeader(req);
            jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET);
            const currentPayload: any = jsonwebtoken.decode(token);
            console.log("cp", currentPayload);
            // const parsedPayload = JSON.parse(currentPayload as string);
            // console.log("p", parsedPayload)
            const isRolePresent: boolean = authRoles.includes(currentPayload.role)
            if(!isRolePresent) {
                throw new Error("User role not valid");
            }
            return next();
        } catch (error) {
            return next(new UserNotAuthorizedException());
        }
    };
};

const getTokenFromRequestHeader = (req: RequestWithUser) => {
    const tokenWithBearerHeader = req.header(
      `${APP_CONSTANTS.authorizationHeader}`
    );
    if (tokenWithBearerHeader) {
      return tokenWithBearerHeader.replace(`${APP_CONSTANTS.bearer} `, "");
    }
    return "";
   };
export default authorize;