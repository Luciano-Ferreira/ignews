import { query as q } from 'faunadb';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { fauna } from '../../../services/fauna';

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
  ],
  jwt: {
    signingKey: process.env.SIGNING_KEY,
  },
  callbacks: {
    async signIn(user, account, profile) {

      const { email } = user
      try {
        await fauna.query(
          q.Create(
            q.Collection('users'),
            { data: { email } }
          )
        )
        return true;

      } catch (err) {
        console.error(err);
        return false;
      }
    }
  }

})