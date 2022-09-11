import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";

export async function refreshAccessToken(token) {
  try {
    const response = await fetch(process.env.BACKEND_TOKEN_REFRESH, {
      method: "POST",
      body: JSON.stringify({ refresh: token.refreshToken }),
      headers: {
        "content-type": "application/json",
      },
    });
    const refreshedTokens = await response.json();
    console.log(refreshedTokens);
    if (!response.ok) {
      console.log("WHAAA");
    }
    return {
      ...token,
      accessToken: refreshedTokens.access,
      refreshToken: refreshedTokens.refresh ?? token.refreshToken,
      accessExpires: Date.now() + 1000 * 60 * 10,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const nextAuthOptions = (req, res) => {
  return {
    // pages: {
    //   signIn: "/auth/signin",
    //   signOut: "/auth/signout",
    //   error: "/auth/error", // Error code passed in query string as ?error=
    //   verifyRequest: "/auth/verify-request", // (used for check email message)
    //   newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
    // },
    providers: [
      Credentials({
        name: "Credentials",
        credentials: {
          email: {
            label: "Email",
            type: "text",
            placeholder: "john@gmail.com",
          },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          const { email, password } = credentials;

          const response = await fetch(process.env.BACKEND_TOKEN_OBTAIN, {
            method: "POST",
            body: JSON.stringify({ email, password }),

            headers: {
              "content-type": "application/json",
            },
          });
          let user = await response.json();
          if (user.access) {
            return user;
          }
          return null;
        },
      }),

      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      }),
    ],
    callbacks: {
      async jwt({ token, user, account, profile, isNewUser }) {
        if (user) {
          if (account.provider === "google") {
            const { access_token, id_token } = account;
            try {
              const response = await fetch(process.env.BACKEND_GOOGLE, {
                method: "POST",
                body: JSON.stringify({ access_token, id_token }),

                headers: {
                  "content-type": "application/json",
                },
              });
              let data = await response.json();
              console.log(data);
              token.accessToken = data.access_token;
              token.refreshToken = data.refresh_token;
              token.email = data.user.email;
              token.first_name = data.user.first_name;
              token.accessExpires = Date.now() + 1000 * 60 * 10;
              console.log("funtion login");
              return token;
            } catch (error) {
              console.log("error caught");
              return token;
            }
          }
          if (account.provider === "facebook") {
            const { access_token, id_token } = account;
            try {
              const response = await fetch(process.env.BACKEND_FACEBOOK, {
                method: "POST",
                body: JSON.stringify({ access_token, id_token }),

                headers: {
                  "content-type": "application/json",
                },
              });
              let data = await response.json();
              console.log(data);
              token.accessToken = data.access_token;
              token.refreshToken = data.refresh_token;
              token.accessExpires = Date.now() + 1000 * 50;
              console.log("function refresh");
              return token;
            } catch (error) {
              console.log("error caught");
              return token;
            }
          } else {
            token.accessToken = user.access;
            token.refreshToken = user.refresh;
            token.email = user.email;
            token.first_name = user.first_name;
            token.accessExpires = Date.now() + 1000 * 60 * 10;
            return token;
          }
        }
        if (Date.now() < token.accessExpires) {
          console.log("token havent expired");
          console.log(token.accessToken);
          return token;
        }

        return refreshAccessToken(token);
      },
      async session({ session, user, token }) {
        return {
          ...session,
          accessToken: token.accessToken,
          email: token.email,
          first_name: token.first_name,
        };
      },
    },
  };
};

export default (req, res) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};
