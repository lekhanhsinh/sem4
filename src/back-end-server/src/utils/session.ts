import { Express } from "express";
import session from "express-session";
import { ENVIRONMENT, SESSION_SECRET, SESSION_MAXAGE, DOMAIN } from "./secrets";

const initSession = (app: Express): void => {
    const sess: session.SessionOptions = {
        secret: SESSION_SECRET,
        cookie: {
            path: "/",
            maxAge: SESSION_MAXAGE,
            secure: ENVIRONMENT === "production",
            domain: `.${DOMAIN}`,
            httpOnly: false,
        },
        resave: true,
        saveUninitialized: true
    };
    app.use(session(sess));
};

export default initSession;