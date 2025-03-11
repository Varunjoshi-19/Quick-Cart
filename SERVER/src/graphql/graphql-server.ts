import {ApolloServer} from "@apollo/server";
import { typedefs , resolvers} from "./schema"



async function createGraphQLSever() { 

const server = new ApolloServer({
     
typeDefs : typedefs,
resolvers : resolvers
})


await server.start();

return server;

}


export default createGraphQLSever;