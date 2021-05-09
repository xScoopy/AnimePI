# AnimePI
## V 1.0.0

> My goal for this API is to be utilized by those who would like to catalogue their Anime watching journey, and compare it with others that would like to do the same. This will enable us to more easily find recommendations for anime that fit in with what we already enjoy, along with opening up some new avenues for genre/title exploration!

***
## Resources
Resources one can use in this API include: 

**Shows** - Anime such as "Attack on Titan", "My Hero Academia"<br>
Model:
> {
>
>"_id" : "Object Id",
>
>"title" : "String Title",
>
>"publisher" : "String Publisher",
>
>"genres" : [testGenreObject, testGenreObject],
>
>"platforms" : [testPlatformObject, TestPlatformObject]
>
>}

**Genres** - Genres such as "Action", "Shonen", "Isekai"<br>
Model:
> {
>
>"_id" : "Object Id",
>
>"name" : "String Genre Name",
>
>"genres" : [testShowObject, testShowObject]
>
>}

**Platforms** - Platforms that have anime such as "Crunchyroll", "Funimation", "Netflix"<br>
Model:
> {
>
>"_id" : "Object Id",
>
>"name" : "String Genre Name",
>
>"genres" : [testShowObject, testShowObject]
>
>}
***
## Methods
GET - Retrieve instances of resources

POST - Create new instances of resources

PUT - Update/modify existing resources

DELETE - remove existing resources 

## Endpoints 

### /Shows

#### Valid Routes

**GET** /shows - Retrieves a list of all shows in the DB

**GET** /shows/{showId} - Retrieves a single show of the given Id
>replace {showId} with a valid Id of a show that exists in the db

**POST** /shows - Adds a new show to the db assuming the request is in the following JSON format:
>{
>
>    "title" : "Show Title",
>
>    "publisher" : "Show Publisher"
>
>}

**genres** - Genres applicable to the current show

**platforms** - Platform the show plays on.
> Note that some platforms are paid services and require an active subscription to view some shows. 

#### Filters 

**genre** : filters by a given str type genre

**name**: filters by a given str name

**platform**: filters by platform


### /Genres

#### Attributes

**name** - Genre name

**shows** - List of shows belonging to that genre

#### Filters

**name** : filter by genre name

### /Platforms

#### Attributes

**name** - Platform name

**shows** - List of shows that appear on the platform






