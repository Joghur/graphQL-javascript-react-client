# IQ96 web client

### Some files needed (not provided in repo):

Some URL's needed. Most importing is the SERVER_URL which is the address of the graphQL server

**./src/constants.js**

    export const IFRAME_URL = 'SOMEURL_OF_OLD_SITE';
    export const IFRAME_COUNTDOWN = 'SOMEURL_OF_OLD_SITE_COMPONENT';
    export const SERVER_URL = 'GRAPHQL_SERVER_URL';

**./src/utils/secrets.js**
get api info from firebase console

    export const config = {
      apiKey: APIKEY,
      authDomain: authDomain,
      projectId: projectId,
      storageBucket: storageBucket,
      messagingSenderId: messagingSenderId,
      appId: appId,
    };

    export const quiz = 'quiz result';

### TODO

- User.js - When creating or updating user
- "Error" handling when iq_server returns either a UserResponse with an errormessage or an actual error

### ISSUES

- firebase token not refreshed in header of apolloclient. This means server is getting outdated token and can't validate user when accessing data
