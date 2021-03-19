const { ApolloServer, gql } = require('apollo-server');
const azure = require('azure-storage')
const fs = require('fs')
const blobService = azure.createBlobService(AZURE_STORAGE_CONNECTION_STRING)


const typeDefs = gql`
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  type Query {
    uploads: [File]
  }
  type Mutation {
    singleUpload(file: Upload!): File!
  }
`;

const resolversMod = {
  Query: {
    uploads: (parent, args) => {},
  },
  Mutation: {
    singleUpload: (parent, args, context) => {
      return args.file.then(file => {
         const {createReadStream, filename, mimetype} = file

         let streamSize = parseInt(context.req.headers['content-length'])

         const fileStream = createReadStream()
        
         blobService.createBlockBlobFromStream('container-name',filename,fileStream,streamSize,(error,response) => {
          if(!error){
            console.log(response)
          }
         })
         return file;
      });
    },
  },
};


const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context:({req,res}) => ({
    req,
    res
  })
});

// server.listen().then(({ url }) => {
//   console.log(`\`🚀  Server ready at ${url}`);
// });

module.exports = resolversMod;