const resolvers = {
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