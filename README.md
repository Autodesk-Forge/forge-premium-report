
![Platforms](https://img.shields.io/badge/platform-windows%20%7C%20osx%20%7C%20linux-lightgray.svg)
[![License](http://img.shields.io/:license-mit-blue.svg)](http://opensource.org/licenses/MIT)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Stackoverflow](https://img.shields.io/badge/ask-stackoverflow-yellow.svg)](https://stackoverflow.com/questions/ask?tags=%5bautodesk-forge)

# Description

The sample helps viewing, building custom reports and exporting usage query  & export usage query API data in the form of tables, charts from Premium Reporting APIs.

Uses 3-legged oAuth2 with implicit grant to authenticate with Forge. 

![1663190060688](thumbnail.PNG)

### Pre-requisites

- Forge Account: Learn how to create a Forge Account, activate subscription and create an app at [this tutorial](http://learnforge.autodesk.io/#/account/)

- Visual Studio Code 

- Go Live Extension in Visual Studio Code.

- Tested to be working on: Chrome, IE Edge


- When logging into the web dashboard, you should login with the ID of an administrator with premium benefits (EBA).If you login with a user that does not have such roles, the API will return no data.



### Setup

- Create a [Forge app](https://learnforge.autodesk.io/#/account/?id=create-an-app ) with access to the Premium Reporting API.

- Take note of the Client ID which you need to enter as soon as you login.

-  Use http://localhost:5500 as redirect URL in Forge App.

- Clone or download the folder. Open the folder inside in Visual Studio Code.  

- Use http://localhost:5500 as redirect URL in the js/method.js file.

- Click Go live to run live server.

  ![1663191439013](golive.png)

  

### Meta Data Mapping


- Save your metadata in the JSON format in the root folder. 
- Here is the sample of metadata.
- Make changes as per your mapping in js/jsonToTable.js file.



### Deployment

The above sample is deployed on https://autodesk-forge.github.io/forge-premium-report/

To deploy your changed code use GitHub pages. Follow this [tutorial](https://www.youtube.com/watch?v=SKXkC4SqtRk)

Note- As soon as you deploy it the redirect URL becomes the deployment domain.

## Support

For support, please contact forge.help@autodesk.com.

## License

This sample is licensed under the terms of the [MIT License](https://tldrlegal.com/license/mit-license).
Please refer to [LICENSE](LICENSE) for more details.

## Written by

Deepali Srivastava, Forge Partner Development Group

