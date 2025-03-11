import mutations from "./components/mutations";
import queries from "./components/queries";
import resolver from "./components/resolvers";
import customTypedefs from "./components/typedefs";

export const typedefs = `#graphql 


type Query {

${queries}

}






`

export const resolvers = { 


Query : {

...resolver.queries
},



}