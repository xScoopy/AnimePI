# AnimePI

> My goal for this API is to be utilized by those who would like to catalogue their Anime watching journey, and compare it with others that would like to do the same. This will enable us to more easily find recommendations for anime that fit in with what we already enjoy, along with opening up some new avenues for genre/title exploration!

## Resources
Resources one can use in this API include: 

**Shows** - Anime such as "Attack on Titan", "My Hero Academia"

**Genres** - Genres such as "Action", "Shonen", "Isekai"

**Platform** - Platforms that have anime such as "Crunchyroll", "Funimation", "Netflix"

**User** - Users that utilize the API

**Publisher** - Publishers for anime such as "Funimation", "TV Tokyo"

## Methods
GET - Retrieve resources

POST - Create new resources

PATCH/PUT - Update/modify existing resources

DELETE - remove resources 

> POST, PATCH, DELETE permissions unavailable to general users

## Endpoints 

### /Shows

#### Attributes

**Title** - Title of the show

**Seasons** - Amount of seasons currently available (as of April 2021)

**Genres** - Genres applicable to the current show

**Publisher** - Publisher for the current show

**Release_Date** - Year the show was first released

**Platforms** - Platform the show plays on.
> Note that some platforms are paid services and require an active subscription to view some shows. 

**Watched_by** - List of users that have indicated they watched the show on AnimePI

**Favorited_by** - List of users that have favorited the show on AnimePI

#### Filters 

**genre** : filters by a given str type genre

**publisher** : filters by a given str type publisher

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

> A GET request to /Platform will return a list of the names of the platforms

### /Users

#### Attributes

**username** - username for a user

**shows_watched** - list of shows watched by that user

**shows_favorited** - list of shows favorited by that user

#### Filters

**show_watched** : filter by users who have watched a show

**show_favorited** : filter by users who have favorited a show




