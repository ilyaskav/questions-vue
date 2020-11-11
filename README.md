## Description
- Project created using Vue CLI
- Services currently are working with the local storage, but they can be easily replaced with API implementation without chanding other code, because they return  Promises
- Addition of a new topic implemented in a multi-select element, instead of modal dialog

## How to run
```
> npm install

> npm run serve
```

## Notes
To change current user, change 'CURRENT_USER_ID' in a method insertUsers() of test-data-seed-service.js

### Known issues
- It is possible to post an empty comment 
- It is possible to upvote you own comment (not sure whether it is an issue)