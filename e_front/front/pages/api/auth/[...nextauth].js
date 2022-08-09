import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"


export async function refreshAccessToken(token) {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/token/refresh/",
      {
        method: 'POST',
        body: JSON.stringify( { refresh: token.refreshToken } ),    
        headers: {
            'content-type': 'application/json'
        }})
        const refreshedTokens = await response.json()
        console.log(refreshedTokens)
        if (!response.ok) {
          console.log('WHAAA')
        }
        return {
          ...token,
          accessToken: refreshedTokens.access,
          refreshToken: refreshedTokens.refresh ?? token.refreshToken ,
          accessExpires: Date.now() + 1000 * 50,
        }
      } catch (error) {
        return {
          ...token,
          error: 'RefreshAccessTokenError',
        }
      }
    }


const nextAuthOptions = (req, res) => {
  return {
  providers: [
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

        async jwt ( { token, user, account, profile, isNewUser } ) {
          if (user) {
            if (account.provider === 'google') {
            const access_token = account.access_token
            const id_token = account.id_token
                  try {  
                    const response = await fetch(
                        'http://127.0.0.1:8000/api/google/', 
                        {
                        method: 'POST',
                        body: JSON.stringify({ access_token, id_token }),
                       
                        headers: {
                            'content-type': 'application/json'
                        }
                    })
                    let data = await response.json()

                    token.accessToken = await data.access_token
                    token.refreshToken = await data.refresh_token
                    token.accessExpires  = Date.now() + 1000 * 50
                    console.log('function refresh')

                return token
                } 
                catch (error) {
                    console.log('error caught')
                    return token
                }
              }
              if (account.provider === 'facebook') {
                const access_token = account.access_token
                const id_token = account.id_token
                      try {  
                        const response = await fetch(
                            'http://127.0.0.1:8000/api/facebook/', 
                            {
                            method: 'POST',
                            body: JSON.stringify({ access_token, id_token }),
                           
                            headers: {
                                'content-type': 'application/json'
                            }
                        })
                        let data = await response.json()
                        console.log(data)
                        token.accessToken = await data.access_token
                        token.refreshToken = await data.refresh_token
                        token.accessExpires  = Date.now() + 1000 * 50
                        console.log('function refresh')
    
                    return token
                    } 
                    catch (error) {
                        console.log('error caught')
                        return token
                    }
                  }
          }
          if (Date.now() < token.accessExpires) {  
            console.log('token havent expired')   
            console.log(token.accessToken)
            return token
          }

          return refreshAccessToken(token)
        },
          async session ( { session, user, token } ) {
            session.accessToken = token.accessToken
            return session
          }
      }
      }
    }

export default (req, res) => {
  return NextAuth(req, res, nextAuthOptions(req, res))
    }
