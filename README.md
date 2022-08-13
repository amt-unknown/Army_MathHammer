# Army MathHammer

## Description
The premise of this application is to conduct probability and statistics on a user's army list in comparison to an enemy's list. Moreover, the analytics is operation on die rolls and determining the outcomes and probabilities thereof. For the incorporation of special rules such as re-rolls on a dice roll of 1 would automate the calculation for the Markov Chain, as these can be cumbersome. As there are many facets to these calculations, the application will start with calculations on a character basis and the facilitation of the creation of data entries into the database.

## Database Table Structures
Below is a list of the structure for the tables used in Postgres. 

### UnitData
This table references the WeaponData table in a many-to-one relationship, e.g., a unit can have more than one weapon. 

| Column Name | Datatype | 
| ----------- | --------- | 
| name | String | 
| army | String (one-to-many)*
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
