# Army MathHammer
## Link to Hosted Site
http://armymathhammer-env.eba-h2t5uc2z.us-west-1.elasticbeanstalk.com

## Description
The premise of this application is to conduct probability and statistics on a user's army list in comparison to an enemy's list. Moreover, the analytics is operation on die rolls and determining the outcomes and probabilities thereof. For the incorporation of special rules such as re-rolls on a dice roll of 1 would automate the calculation for the Markov Chain, as these can be cumbersome. As there are many facets to these calculations, the application will start with calculations on a character basis and the facilitation of the creation of data entries into the database.

As this is a lengthy endeavour when view in its entirety, only the basic features have been incorporated. 

This application features a login in feature which remembers the user via a cookie session. The homepage gives an overview of the site and provides links to the existing features on the site. Currently, there are only options for calculating statistics and adding new character sheets and weapons. As the company who owns the copyright to specific character sheet data, the ability to edit and modify existing datasheets has not been implemented to avoid any uncessary complications. 

## Features to be Added
As the breadth of this subject is large, suffice it say, adding rosters/lists of character sheets as well as calculating the effect of multiple units simultaneously will be added. These roster/lists will be user defined and view able by all users for comparison at their leisure. 

Also, a tertiary data table will be added to help organize datasheets into sets of armies. This will help reduce the size of data returned from the server.


## Packages and Technologies
This applications build with Node.js uses React and React-Bootstrap for handling the front-end and styling. The backend is built with Express an d uses Sequelize for structuring and communicating with the Postgres server. Password hashing is facilitated wtih Bcrypt for hashing passwords. 

## Database Table Structures
Below is a list of the structure for the tables used in Postgres. 

### UnitData
This table references the WeaponData table in a many-to-one relationship, e.g., a unit can have more than one weapon. 

| Column Name | Datatype | 
| ----------- | --------- | 
| name | String | 
| army | String (one-to-many)*| 
| weapons | Array(Strings) (many-to-many, ref. WeaponData) | 
| weapon_skill| Integer | 
| ballistic_skill | Integer | 
| strength | Integer |
| toughness | Integer | 
| attacks | Integer | 
| wounds | Integer | 
| save | Integer | 

*To be implemented later. 

### WeaponData
This table is referened by UnitData. 
| Column Name | Datatype | 
| ----------- | --------- | 
| name | String | 
| units | Array(strings) (many-to-many, ref UnitData) |
| range_type | String (enum: Melee, Ranged)|
| strength | Integer | 
| attacks | Integer | 
| damage | Integer | 
| armor_penetration | Integer | 
| special_rules | Array(Strings) (enum: (These shall be implemented and added to options))


