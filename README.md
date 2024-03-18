# Backend Using Express.js, Node.js, MongoDB.

- This is the Dev-Branch to do the development and then we will merge this in the test branch to avoid the conflicts and then at last we will going to merge it into the main or master branch.

- npm init : To start the application completely all the way.
- Sara code server.js ki file ke andar hoga hmara
- node server.js  -- yh simple command hogi hmari jo ke use hogi to start the server.js file.
- Package.json mein jake hm script ki commands ko modify krdeinge aur usko hm apne hisab se bnadeinge all the way!
- npm i -d nodemon -- Nodemon install krrhe hain dev dependencies ke andar yhn pe.
- Ab yh hmein dev dependencies mein chahiye ahi hmne jo isko install kra hai wo hmne ise dependencies mein install krdia hai to ab hm isko uninstall kreinge -- npm uninstall nodemon.
- npm i -D nodemon -- isse hm dev dependencies mein install krleinge hm apne pass.
-  Nodemon ka faida yh hai ke server chalta rhega all the way.
- nodemon is a utility for Node.js that helps in the development process by automatically restarting your Node.js application when file changes in the directory are detected. It's particularly useful during development because it saves you from having to manually stop and restart your server every time you make changes to your code.
- scripts ko package.json mein jake update krdeinge all the way. - "server":"nodemon server.js" -- isko hm terminal mein -- npm run server - ke zariye se run krleinge all the way - ab hoga yh jb bhi kisi file mein koi change hoga to hmein koi masla nhi hoga aur hmein baar baar change nhi krna prega server bnd krke start to nodemon krlega hmare liye yh sb kuch.



### Installation Packages:
- express - to create the server - npm i express
- config - yh package help krta hai configuration set krne mein different environment mein jese development mein testing mein.
- express-validator - yh middlewear package hota hai jo ke req ki body mein jo chezein arhi hoti hain according to the requirement unko validate krleta hai yh.
- mongoose - yh mongodb ki queries ko run krne ke liye hoga use.
- jsonwebtoken - it is the token used for the authentication purpose.
- bcrypt - yh package hm use kreinge hashing krne ke liye password ki.

## Server.js file
- express import krlia hai aur app create krlai hai.
- app.listen ke through port assign kra hai sbse phle jispe hmara server run hoga.
- app.use(express.json({extended:true})) - isse hm sare data ko apne pass json mein lerhe hote hain - yh aik builtin middlewear function hai express ka express.json.

## MongoDB - Setup
- mongodb UI pe jake login krke cluster create krleinge.
- 1) wahin pe aik naya project bnaleinge hm 
- 2) wahin pe Database create krdeinge hm
- 3) phr hm us project se connect kreinge locally by the help of URI provided and the key and we will use these secrets in the .env.
- user aur password bhi bnadeinge hm aur phr hm ip address bhi define kreinge console pe hi - IP address se murad yh hai ke hm is cluster ko database ke knse computer se access kreinge aur uske liye development ke time pe hm apna ip address dedete hain computer ka aur phr uske bad hm jb yh chahte hain ke hmari application kahin se bhi access hojae phr hm change krdeinge cluster mein jake ip ko - yh sb kaam console pe chal rha hai.
- mongo secret config mein save krdia hai take call krlein wahan se.


## Routes
- yh api ke routes ka folder bnaleinge hm aur phr uske andar aik aur folder for that particular api bnaleinge aur phr isse hoga yh ke chezein asani se samajh ajaeingi aur phr hm apni apis bnaleinge.
- routes>auth/users/posts - yh 3 folders bnalie hain auth ke folder ke andar.
- route ke folder ke andar jake hm users ki file mein express.router ko use kreinge all the way.
- Basically jo hmne app.use se jo apne routes bnae hain na server.js file mein wo yhn pe routes folder ke andar jo files hain whn redirect krrhe hote hain aur wahan pe hm express.Router call kreinge aur phr us router pe get/post/update/delete ki apis ko run krleinge hm all the way.


## Database Design
- database connect krne ke liye mein config mein file bnaounga db.js
- is file ke andar hm mongodb ko connect krleinge mongoose ke through aur try catch mein connect kreinge aur dekheinge ke connect hoa hai ya nhi.
- export krdeinge file ko aur phr server.js mein calll krelinge file ko

- Hm Models create krleinge users ka aur posts ke data ka aur isse hoga yh ke jesa data hmein chahiye hoga wesa data hm dedeinge all the way.
- Mongoose.Schema - mein jo jo chezein hmein chahiye hain wo hm likhleinge aur whn hm mention krdeinge ke yh required hai ya nhi hai aur uske ilawa type kia hia us chez ki.
- Phr hm Schema ko model mein export krdeinge all the way.
- User Schema mein hmne name,email,password aur date ko add kra hai hmne aur phr model create krdia hai hmne.
- Post Schema mein hmne user knsa hai jiski post hai wo hmne lia hai mongoose.Schema.Types.ObjectId se lelia hai hmne, aur messag kia hai post ka aur date kia hai, aur phr hmne model create krdia hai iska.
- Jn files mein hmne models ko use krna hai database mein save krne ke liye data ko us jagah pe hm import krleinge model ko.
- 

## Apis:

#### SignUp Api in Users file:

- Data frontend se leinge hm request mein aur phr us data ko save kreinge database mein aur uske ilawa JWT return kreinge hm.
- Users jo chezein provide krega hmein us mein name/email/password hoga - yh sb data hmare pass request mein arha hota hai aur isko hm database mein save kreinge.
- Lekin passsword ko hm directly save nhi kreinge blke hmein hash krna hoga save krte we password ko aur jb login krega user to hm us password ko authenticate kreinge auth ki api mein.
- Express- validator ko use kreinge ke data kia arha hai hmare pass aur middleware mein validations lgaleinge aage process krne se phle data ko.
- passsword hash krke save krienge database mein
- user ke model ko import krke user ke schema ke hisab se jo data aega hmare pass usko save krdeinge hm database mein
- jWT return krdeinge hm front end pe


#### Login Api in Auth file:
- hm email aur password leinge as an input aur phr database mein check kreinge
- hash password save hai database mein hm usko unhash krke password ko compare kreinge all the way.
- if the password and the email matches in the database we will return the JWT token that will create a session.


#### Get API in Auth file -->> After login token agya hoga frontend pe usko hm save kreinge localStorage mein aur phr rrequest kreinge hm with token 
- Is mein frontend se JWT aega hmare pass token aur uske sath hmare pass yh request aegi aur hm user ka data find krleinge.
- JWT authorize jo krienge hm jo hmare pass araha hoga frontend pe se usko hm authorise kreinge using the middlewear function aur yh chalta rhega.
- JWT jo aega hmare pass hm usko authorize kreinge apne pass aur phr hm us JWT ke aane ke bad get krleinge data ko apne pass.
- Specific user ke data ko get krleinge data base se aur wo send krdeinge hm
- Id to hai hi nhi hmare pass hm jwt ki jo ID hai usse hi to get krrhe hain user ke data ko apne pass.



#### MiddleWear
- JWT token ko check krne ke liye hmare pass hoga yh middlewear aur is mein hm apne pass check kreinge.
- Aur isko hm check kreinge payload se jo ke payload mein id hogi hmare pass isko hm usse check kreinge.
- user.id pe jo hmne payload bnaya hai aur isko hmne reverse engineer krna hia aur jb isko hm check krleinge apne pass phr aage brhjaega process wrna Unauthorised ka error dedeinge hm.
- Midddlewear ke folder mein hm aik file bnaeinge auth.js ki.
- Middlewear mein hmare pass req,res,next hoga.
- next aik callback function hai builtin jo hmein return krdega.
- Yh front end se headers mein hmein send krna hoga hmessha - const token = req.headers("axiom-auth-token");
- jwt.verify se hmare pass payload agya hai jiske andar hmari id hogi payload ki aur jsike though hm token fing krleinge apna aur user ka data.
- req.header = ("axiom-auth-token") - yh key hai aur value hogi iski hmare pass JWt 
- yh hm frontend se post request krte we bhejeinge aur iske through hm id nikal leinge aur id ke through hm User ko find krleinge database se.
- Middlewear bnane ka faida yh hai sbse phle, hmare pass har API mein header mein joke "axiom-auth-token" hai usmein hmare pass jwt token arha hoga aur phr hm usse id middlewear mein nikal kr send krdeinge req.user.id aur phr findById ke method se hm database mein se user ka data nikal ke leaeinge apne pass.




#### Extra Learning:
- config kaam aise krta hai ke mein aik root pe folder bnaounga config - aur phr uske andar default.json ki file bnaounga aur production.json ki bnaounga aur uske bad jo configuration mein file mein apply krounga wo apply hojaeingi - aur iske andar hm mongo ke secret rkhleinge. - ab jbke meine mongoURI secret save krdia hai to ab meine jahan jahan pe is data ko use krna hoga mein likhounga config.get(mongoURI) - wo data ajaega.
- import/export hai advance javascript - hm node ki application mein use kreinge module.exports = connectDB;
- Router.use() requires a middleware function but got a Object -- yh error isliye arha hai kionke jb bhi hm router.use() ka istamal kreinge to ismein aik proper middlewear add kreinge aur us middlewear ke parameters req,res,next hnge.
- Express Validator mein check aur ValidationResult - yh do parameters hnge aur usse hoga yh ke hm check krleinge input aik se aur uske ilawa dosre se hm result ko check kreinge.
- check wale se hm validations lgadeinge data pe jo arha hoga hmare pass.
- checks lgaleinge hm middlewear mein apne pass phle hi take check krlein all the way ke data kia arha hai hmare pass all the way.
- phr hm checks se jo result aega usko bhi handle krleinge validation results ke andar.
- status 400 - bad request ka status hota hai.
- password hash krke save kreinge hm apne pass - bcrypt se salt bnega aur password hash krke save kreinge aur jb authentication ka time aega to hm password ko apne compare krleinge all the way aur hm authenticate krleinge usko us time pe.
- jwt create hoga payload se jo hm create kreinge all the way aur hm us payload se data apna extract bhi krskte hain.
- jwt create krne ke liye hmein secret key bhi chahiye hoti hai aur wo hm default config file me rkheinge apne pass.
- user ke schema mein hm email unique ka attribute lagaeinge
- Jb bhi database se connect hona hai to wo kaam hm kraeinge try/catch mein hmesha.
- Payload jo hm bnarhe hain user.id se to yh hmara middlewear mein kaam aega jake.
- Yh jo user ko login aur phr middlewear ko add krne wali jo technique hai hmare pass yh har jagah use hogi hmare pass.
- Aur yh jo Postman pe hmne APIs bnai hain yh bhi hmare pass use hngi aur hmne jo headers dale hain wo hmare pass hm axios se daleinge frontend pe.
- git rm -r --cached node_modules
- git commit -m "Remove node_modules directory from repository"
- By the help of above these commands I remove the node_modules from the github and added them in gitignore file at local.
- status-400 -- Bad request ka status hai yh hmare pass.
- When you set the "Content-Type" header to "application/json" in Postman, you are telling the server that the body of your request or response will be in JSON format. This allows the server to interpret the data correctly and handle it accordingly.






