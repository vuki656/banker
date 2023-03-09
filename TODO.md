## NEXT

-   [ ] Tests
    -   [x] Category
    -   [x] User
    -   [ ] Transaction
    -   [ ] Context

## BACKLOG

-   [ ] What about testing that stuff is actually created in the database
-   [ ] Fetch rates fn seems out of place
-   [ ] Internal errors/filter them from logger -- https://www.apollographql.com/docs/apollo-server/data/errors/
    -   They expose apollo errors, use that? wbu other erros not from apollo?
    -   [ ] How to throw more complex errors?? Should you throw a normal error, graphql error??? what???
-   [ ] Imports?? Handle things like syncCron file where we are importing from transaction resolver

## Later

-   [ ] Eslint for gql files
-   [ ] How to share deps between workspaces
-   [ ] Clean up codegen packages on web, you prob don't need all of them
-   [ ] API aliases
-   [ ] Try to make keywords just a string array on category
-   [ ] Setup prometheus and other cool tracking/tracing stuff
-   [ ] Figure out how to use pm2 better
