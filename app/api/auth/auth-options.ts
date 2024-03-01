import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Provider } from "next-auth/providers/index";

const providers: Provider[] = [
    GoogleProvider({
        clientId: process.env.CREDENTIALS_GOOGLE_CLIENT_ID!,
        clientSecret: process.env.CREDENTIALS_GOOGLE_CLIENT_SECRET!,
    }),
];

export default {
    providers,
} satisfies NextAuthOptions;
