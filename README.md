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


## Server.js file
- express import krlia hai aur app create krlai hai.
- app.listen ke through port assign kra hai sbse phle jispe hmara server run hoga.
- app.use(express.json({extended:true})) - isse hm sare data ko apne pass json mein lerhe hote hain - yh aik builtin middlewear function hai express ka express.json.
- mongoose - yh mongodb ki queries ko run krne ke liye hoga use.
- jsonwebtoken - it is the token used for the authentication purpose.

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


#### Extra Learnig:
- config kaam aise krta hai ke mein aik root pe folder bnaounga config - aur phr uske andar default.json ki file bnaounga aur production.json ki bnaounga aur uske bad jo configuration mein file mein apply krounga wo apply hojaeingi - aur iske andar hm mongo ke secret rkhleinge. - ab jbke meine mongoURI secret save krdia hai to ab meine jahan jahan pe is data ko use krna hoga mein likhounga config.get(mongoURI) - wo data ajaega.
- import/export hai advance javascript - hm node ki application mein use kreinge module.exports = connectDB;
- Router.use() requires a middleware function but got a Object -- yh error isliye arha hai kionke jb bhi hm router.use() ka istamal kreinge to ismein aik proper middlewear add kreinge aur us middlewear ke parameters req,res,next hnge.
- 



