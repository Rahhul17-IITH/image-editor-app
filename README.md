#### Running the locally Hosted version  
Before running the project, you are supposed to add the following files,

.env:
```
AWS_REGION=
S3_BUCKET=
DYNAMODB_TABLE=
COGNITO_USER_POOL_ID=
COGNITO_CLIENT_ID=
REACT_APP_API_URL=

```

./frontend/src/aws-exports.js:
```
const awsExports = {
    Auth: {
      Cognito: {
        userPoolId: '',
        userPoolClientId: '',
        region: '',
        signUpVerificationMethod: '',
      }
    }
  };
  export default awsExports;
```


