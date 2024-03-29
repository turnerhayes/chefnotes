import { Awaitable, NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { Provider } from "next-auth/providers/index";

const checkUser = async (
    email: string,
    password: string,
    name: string
): Promise<User|null> => {
    // TODO: Do actual authentication. This is here just for development
    // purposes
    const user: User = {
        id: email,
        name,
        email,
    };

    return user;
};

const providers: Provider[] = [
    GoogleProvider({
        clientId: process.env.CREDENTIALS_GOOGLE_CLIENT_ID!,
        clientSecret: process.env.CREDENTIALS_GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            name: {
                label: "Name:",
            },
            email: {
                label: "Email:",
            },
            password: {
                label: "Password:"
            },
        },
        async authorize(credentials, req) {
            if (!credentials) {
                throw new Error(`No credentials submitted`);
            }
            const {name, email, password} = credentials;

            const user = await checkUser(email, password, name);
            return user;
        },
    }),
];

export default {
    providers,
} satisfies NextAuthOptions;
