## Hello there!

This section is an example of how to make OpenAI API calls to get results and display them.

To access this section from the project you must go to the URL [http://localhost:3000/demo](http://localhost:3000/demo) (or the port you are using).

### Setup

You need to add an `API-KEY` to use `openai.com` services.

To do this, first generate an `ApiKey` from [here](https://platform.openai.com/account/api-keys)

You should create a new secret key and copy it, as you will not be able to see it again.

When you started the project, a `.env.local` file should be created, inside it set the `NEXT_PUBLIC_OPENIA_API_KEY` key with the secret key.

You can see an example in the `.env` file.

Do not share your secret passwords. Do not add your secret keys in the repository files.

### Api calls

The API calls are inside the `services` folder.

As a general rule, promises are returned in each API call, which you will be able to call from the different components or pages and use them in the way you require.
