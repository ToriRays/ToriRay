# Employee Data Navigation
An application to navigate hypothetical employee data.

## Implemented features
Following four views have been implemented:
   - Full employees list
   - Hierarchical relationship among employees
   - Employee without manager
   - Manager who is not a valid employee

Even though not in the original requirements, following feature is added to make the solution more versatile:   
   - Multiple topmost managers, rather than just one CEO, are allowed and presented their hierarachies
   
Unit test. end-to-end test and end-user test have been coverned.
   
## Installation
Go to GitHub where the codes are reposited [3], click "Clone or download" button on the right to download Zip for local installation.

## Execution
There three ways to execute the application.

### via Plunker 
Hosted remotely at Plunker, which produced URL [1] for direct execution.

### index.html
If installed locally as suggested, open index.html file with Firefox or Microsoft Edge.
NB Google Chrome is yet not supported, due to following error "Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https." 

### light weight http-server
AS long as local machine already got nodeJS installed, http-server's setup at local machine allows point-to-point test to be conducted locally without having to host the application remotedly.<br/>
Follow the next instructions excerpted from [4]

We need a standalone Command Propmt windows, then,<br/>
_cd (to where the application is extracted and installed)_ <br/>
_npm install serve -g_ <br/>
_serve_

Once it is done, we can hit the application page through URL __localhost5000__ or IPaddress:5000
NB Pressing "Ctl C" will stop theserver, while _serve_ is to restart it again.

## Code review
Two ways to review the codes:
   - either at this Github repository [3], 
   - or that under Plunker [2], which also shows preview of execution result. 

## Technologies in use
### AngularJS
Angular JS ver 1.2.0 has been utilised in this application, noteworthily following directives have been employed:
   - ng-app - designates the root element of the application and is typically placed near the root element of the page - e.g. on the <body> or <html> tags
   - ng-controller - attaches a controller class to the view
   - ng-show - enables conditional display of selected image's details 
   - ng-repeat - implements images thumbnail
   - ng-model - binds view into model required by an input that specifies keywords (tags) for search
   - ng-switch & ng-switch-when - conditionally swaps DOM structure on your template based on a scope expression
   - ng-selected - sets the selected attribute on the element
   - ng-change - evaluates the given expression when the user changes the input

### Recursion
Recusion technique has been applied in traversing employee data for reasoning hierarchial relationship holistically.

### Jasmine 
Jasmine v4.1.0 is used for unit-testing.

### Protractor
Protractor v5.3.2 is used to end-to-end test.

## Design of employee data input
Simplistic JSON-based flat files have been facilitated as inputs of employee data and for configuring viewing options.

## File structure
Three sub-directories and fight files are briefed below.

### e2e-test-protractor-5.3.2
Contains end-to-end testing libary and custome-made codes, which are based on Protractor 5.3.2. More to elaborate in testing sections.

### image
Contains image files for documentation.

### unittest-jasmine-standalone-3.1.0
Contains unit-test coes, which are based on Jasmine 3.1.0 in standalone mode. More to elaborate in testing sections.

### README.md
This file you are reading.

### employeeData-depth5.json
The main JSON file seralises employee data as an import input data to the applicatiin. As a virtual superset of employeeData.json explained next, this contains extrat data to conver extra more general/exceptional scenarios. 

### employeeData.json
As hinted earlier, this input data file only reflects original scenarios.  

### index.html
The default executable if http-server is set up locally.

### renderOptions.json
Another attempt of modulising input data in a eralised form, except this is an auxliary responsible of configuring viewing options.

### script-ok.js
JavaScript codes of this application.

### sryle.css
Cascading Style Sheets.

## Test
### Unit Test
Based on Jasmine 3.1.0, all unit test codes are placed under _unittest-jasmine-standalone-3.1.0_. <br/>
Coventionally, it has following further two sub-directories:
   - _src_ - for JavaScript code unde test 
      - fundamentally, what's URL of app under test. In our case, due to the setup of http-server, it would be __localhost:5000__.
      - any extended timeout required? Especially when asynchrous communication is applied.
      - what/how to test.      
   - _spec_ - for specifying how the unit tests are oiing to proceed
      - framework - _Jasmine_ is chosen,
      - browser - what type of browser to use behind the scene. _Firefox_ is chosen.
      - seleniumAddress - http://localhost:4444/wd/hub has been pre-configured.
      - which spec file in use - _empData-spec.js_, in our case.
 
Finally, issue following command and look into on-screen message for test outcome.
__protractor conf.js__

Standalone, file __SpecRunner.html__ that integrates what to test and how to test is the one to open with a web browse to proceed the unit test.

### Point-to-point test
_e2e-test-protractor-5.3.2_ contains codes of point-to-point test.
Quite similar to Jamesine, following two files serve critical purposes:
   - _empData-spec.js_ 
      - URL of application under test.
      - any extra timeout required? If working asynchroous mode.
      - what to test and how to test.
   - _conf.js_ 
      - framework - _Jasmine v3.1.0_ is chosen.
      - seleniumAddress- URL of selenium has to integrate with.
      - browserName - name of browser to use behind the scene. _Firefox_ is chosen.
The test is based on _Protract 5.3.2_, for whose setup please refer to [5].<br/>

Again, we better have a standalone Command Prompt window to execute following three commands.
   - _npm install -g protractor_
   - _webdriver-manager update_
   - _webdriver-manager start_

Under the host
Issue next command:

### End-use test
Two JSON-based flat files have been built to govern differenct scenarios.
   - employeeData.json - contains indentical content as examplied in the original requirement document
   - employeeData-depth5.json - currently used as a test case, a superset of above file, covering following extra scenarios:
      - Manager who is not a valid employee - this isn't covered in the original requirement document
      - Multiple topmost managers, rather than just one CEO, can also be handled
      - Hierarchy level has been extended to five

#### End-user test result
With <a href="employeeData-depth5.json">employeeData-depth5.json</a> as input employee data, the view-selection specific reponses are as shown in screenshots list below.<br/> 
   - <a href="image/fulllist.PNG">Full employees list</a> 
   - <a href="image/hierarchy.PNG">Hierarchical relationship among employees</a> 
   - <a href="image/employeeWithMgr.PNG">Employee without manager</a> 
   - <a href="image/mgrInvalidEmployee.PNG">Manager who is not a valid employee</a>

## ToDo
| item | Description | Implemented? (Y/N) |
| ---:|:-------------|:-----:|
|T1| To generically determine number of td (HTML term: table cell) elemnts in order to allow unlimted hierarchy levels. Currently it is  fixed as five. | N |
|T2| More test cases for both unit test and point-to-point test. Specially when we overcome the shortcoming of Protractor's documentation.| N |

## Reference 
[1] https://run.plnkr.co/plunks/XWhiNS/
[2] https://embed.plnkr.co/XWhiNS/
[3] https://github.com/SpenserKao/Employee-Data-Navigation<br/>
[4] https://stackoverflow.com/questions/29528922/how-to-create-a-localhost-server-to-run-an-angularjs-project<br/>
[5] https://www.protractortest.org/#/tutorial
