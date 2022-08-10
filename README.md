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
| weapons | Array(Strings) (many-to-one, ref. WeaponData) | 
| ws (Weapson Skill)| Integer | 
| bs (Ballistic Skill) | Integer | 
| s (Strength) | Integer |
| t (Toughness) | Integer | 
| a (Attacks) | Integer | 
| w (Wounds) | Integer | 

*To be implemented later. 

### WeaponData
This table is referened by UnitData. 
| Column Name | Datatype | 
| ----------- | --------- | 
| name | String | 
| rangetype | String (enum: Melee, Ranged)|
| s (Strength) | Integer | 
| a (Attacks) | Integer | 
| d (damage) | Integer | 
| ap (Armor Penetration) | Integer | 
| specialrules | Array(Strings) (enum: (These shall be implemented and added to options))
