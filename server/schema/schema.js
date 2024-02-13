const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql')
const { projects, clients } = require('../sampleData')

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID}, 
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    })
});