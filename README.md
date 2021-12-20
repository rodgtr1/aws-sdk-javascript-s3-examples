### This is the reference code for blog post: 

To get started:

1. First, clone the repo and run npm install. 
2. Sign into your AWS account and create a new IAM user with the appropriate S3 permissions. Since this is a demo I’ll create a user called svc.s3 with programmatic access (save your keys). And for permissions I’ll give it AmazonS3FullAccess.
3. Create a new S3 bucket
4. Clone the .envsample file, rename it to .env, and add the appropriate values.
5. Run npm start and open the browser to http://localhost:3000.
6. Finally, set the CORS policy on your S3 bucket to allow the browser to access it (limit as needed).
```
[
  {
    "AllowedHeaders": [ "*" ],
    "AllowedMethods": [ 
      "HEAD", "GET", "PUT", "POST", "DELETE"
    ],
    "AllowedOrigins": [ "localhost:3000"]
  }
]
```
