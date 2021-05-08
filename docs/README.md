# AnimePI

> My goal for this API is to be utilized by those who would like to catalogue their Anime watching journey, and compare it with others that would like to do the same. This will enable us to more easily find recommendations for anime that fit in with what we already enjoy, along with opening up some new avenues for genre/title exploration!

## Resources
Resources one can use in this API include: 

**Shows** - Anime such as "Attack on Titan", "My Hero Academia"

**Genres** - Genres such as "Action", "Shonen", "Isekai"

**Platform** - Platforms that have anime such as "Crunchyroll", "Funimation", "Netflix"

## Methods
GET - Retrieve resources

POST - Create new resources

PATCH/PUT - Update/modify existing resources

DELETE - remove resources 

> POST, PATCH, DELETE permissions unavailable to general users

## Endpoints 

### /Shows

#### Attributes

**_id** - Id of the show

**title** - Title of the show

**publisher** - Publisher for the current show

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






