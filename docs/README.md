# AnimePI
## V 1.0.0

> My goal for this API is to be utilized by those who would like to catalogue their Anime watching journey, and compare it with others that would like to do the same. This will enable us to more easily find recommendations for anime that fit in with what we already enjoy, along with opening up some new avenues for genre/title exploration!

***

## How to Use
Each valid route will need to follow the URL: https://scoopy-animepi.herokuapp.com/

Each route like /shows or /genres assumes those are appended to the end of the above url.

## Resources
Resources one can use in this API include: 


**Shows** - Anime such as "Attack on Titan", "My Hero Academia"<br>
Model:

    {
    "_id" : "Object Id",
    "title" : "String Title",
    "publisher" : "String Publisher",
    "genres" : [testGenreObject, testGenreObject],
    "platforms" : [testPlatformObject, TestPlatformObject]
    }

**Genres** - Genres such as "Action", "Shonen", "Isekai"<br>
Model:

    {
    "_id" : "Object Id",
    "name" : "String Genre Name",
    "shows" : [testShowObject, testShowObject]
    }

**Platforms** - Platforms that have anime such as "Crunchyroll", "Funimation", "Netflix"<br>
Model:

    {
    "_id" : "Object Id",
    "name" : "String Genre Name",
    "shows" : [testShowObject, testShowObject]
    }
***
## Methods
GET - Retrieve instances of resources

POST - Create new instances of resources

PUT - Update/modify existing resources

DELETE - remove existing resources 

## Endpoints 

### /shows

#### Valid Routes

**GET** `/shows` - Retrieves a list of all shows in the DB

**GET** `/shows/{showId}` - Retrieves a single show of the given Id
>replace {showId} with a valid Id of a show that exists in the db

**POST** `/shows` - Adds a new show to the db assuming the request is in the following JSON format:

    {
    "title" : "Show Title",
    "publisher" : "Show Publisher"
    }

> Note that all shows are initialized with empty genre and platform arrays automatically

**PUT** `/shows/{showId}` - Updates a title or publisher of an existing show. JSON request body should include "title" and/or "publisher" updates only. 

**PUT** `/shows/{showId}/add-genre` - Adds a Genre object to the list of genres under the show given by Id. Request body should adhere to the following format:

    {
    "genre" : "Action"
    }

>Note that the string passed must be an exact match to a 'name' of an already existing genre in the Genres collection.

**PUT** `/shows/{showId}/add-platform` - Adds a Platform object to the list of platforms under the show given by Id. Request body should adhere to the following format:

    {
    "platform" : "Netflix"
    }

>Note that the string passed must be an exact match to a 'name' of an already existing platform in the Platforms collection.

**DELETE** `/shows/{showId}` - Deletes a show of the given Id from the DB. 


### /genres

#### Valid Routes

**GET** `/genres` - Retrieves all genres

**GET** `/genres/{genreId}` - Retrieves the genre of the specified Id

**GET** `/genres/{genreId}/shows` - Returns a list of shows in that genre, with all of the shows' details populated. 

**POST** `/genres` - Adds a new genre to the db assuming the request body is in the following JSON format:

    {
    "name" : "Genre Name"
    }

> Note that the shows list will be initialized as empty and is not needed in the request body.  

**PUT** `/genres/{genreId}` - Updates the name of the Genre of the given Id. Request body should adhere to the following format: 

    {
    "name" : "Updated Genre Name"
    }

**DELETE** `/genres/{genreId}` - Deletes the genre of the given Id from the db.

### /platforms

#### Valid Routes

**GET** `/platforms` - Retrieves all platforms.

**GET** `/platforms/{platformId}` - Retrieves the platform of the specified Id

**GET** `/platforms/{platformId}/shows` - Returns a list of shows on the given platform, with all of the shows' details populated. 

**POST** `/platforms` - Adds a new platform to the db assuming the request body is in the following JSON format:

    {
    "name" : "Platform Name"
    }

> Note that the shows list will be initialized as empty and is not needed in the request body. 

**PUT** `/platforms/{platformId}` - Updates the name of the Platform of the given Id. Request body should adhere to the following format: 

    {
    "name" : "Updated Platform Name"
    }

**DELETE** `/platforms/{platformId}` - Deletes the platform of the given Id from the db.






