import { Express } from "express";
import session from "express-session";
import { ENVIRONMENT, SESSION_SECRET, SESSION_MAXAGE } from "./secrets";

const initSession = (app: Express): void => {
    const sess = {
        secret: SESSION_SECRET,
        cookie: {
            maxAge: SESSION_MAXAGE,
            secure: ENVIRONMENT === "production"
        },
        resave: true,
        saveUninitialized: true
    };
    app.use(session(sess));
};

export default initSession;