# AREA API

Area is an application for automatisation.

Base url for Area api is :
```
http://lucaspoirel.ovh:8080/
```

## Authentication

### POST /auth/signin
permit to create an account for the AREA
```
curl --location --request POST 'http://lucaspoirel.ovh:8080/auth/signin' \
--header 'Content-Type: application/json' \
--data-raw '{
	"email":"lc637@a.com",
	"password":"test1234",
	"firstName":"lucas",
	"lastName":"comte"
}'
```

### POST /auth/login
request for login to the App
```
curl --location --request POST 'http://lucaspoirel.ovh:8080/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
	"email":"lc637@a.com",
	"password":"test1234"
}'
```

### POST /auth/genToken
generate a Jwt payload for oauth authentication

```
curl --location --request POST 'http://lucaspoirel.ovh:8080/auth/genToken' \
--header 'Content-Type: application/json' \
--data-raw '{
	"email":"marianov12@v12.fr",
	"client_id":"// your external client id"
}'
```

## USERS

### GET /users
getAll users
```
curl --location --request GET 'http://lucaspoirel.ovh:8080/users' \
--header 'Authorization: Bearer <token>' \
--data-raw ''
```

### DEL /users/delete
delete a user in entity
```
curl --location --request DELETE 'http://lucaspoirel.ovh:8080/users/delete' \
--header 'Authorization: Bearer <token>' \
--header 'Content-Type: application/json' \
--data-raw '{
	"id":"//userID"
}'
```

### PUT /users/:id
update user by id in entity

```
curl --location --request PUT 'http://lucaspoirel.ovh:8080/users/' \
--header 'Authorization: Bearer <token>' \
--header 'Content-Type: application/json' \
--data-raw '{
	"firstName":"",
	"lastName":"",
	"idList":[id]
}'
```

### GET /users/:id
get for one user
```
curl --location --request GET 'http://lucaspoirel.ovh:8080/users/' \
--header 'Authorization: Bearer <token>' \
--header 'Content-Type: application/json' \
--data-raw ''
```
## ACTIONS

### POST Action Reaction JSON for the DB

```
http://lucaspoirel.ovh:8080/action/pushActions
```

```
curl --location --request POST '' \
--header 'Content-Type: application/json' \
--data-raw '{
	"id": 1,
	"name": "Nom de l'\''action",
	"apiCall": "URL sur l'\''api du service",
	"body": "{
		\"token\":\"token de l'\''api pour IMGUR, spotify, github, slack\",
		\"name\": \"username du gars sur Imgur, Spotify, slack, trello\",
		\"ID\": \"seulement Trello pour le idList et le idBoard\",
	
	}",
	"headers": "nom du service",
	"response": "{response},
	"reaction": {"name": "Nom de la reaction", "apiCall": "URL sur l'\''api du back", "body": "{
		\"token\":\"token de l'\''api pour IMGUR, spotify, github, slack\",
		\"name\": \"username du gars sur Imgur, Spotify, slack, trello\",
		\"ID\": \"seulement Trello pour le idList et le idBoard\",
		\"type\": \"Seulement pour le type_artist spotify\"
	
	}",
	"headers": "Nom du service",
}'
```


### GET /action
get All actions

```
curl --location --request GET 'http://lucaspoirel.ovh:8080/action' \
--header 'Authorization: Bearer <token>' \
--data-raw ''
```

### GET /action/actionId/:id
get action by ID

```
curl --location --request GET 'http://lucaspoirel.ovh:8080/action/actionId/' \
--header 'Authorization: Bearer <token>' \
--data-raw ''
```

### GET /action/actUser/:userId
get All actions for a user by it's ID

```
curl --location --request GET 'http://lucaspoirel.ovh:8080/action/actUser/' \
--header 'Authorization: Bearer <token>' \
--data-raw ''
```

### GET /action/reaction/:userId
get All actions with link reactions for a user by it's ID

```
curl --location --request GET 'http://lucaspoirel.ovh:8080/action/react/' \
--header 'Authorization: Bearer <token>' \
--data-raw ''
```

### DEL /action/delete/:actionId Copy
delete an action entity by it's ID

```
curl --location --request DELETE 'http://lucaspoirel.ovh:8080/action/delete/66' \
--header 'Authorization: Bearer <token>' \
--data-raw ''
```

## REACTION

### GET /reaction
get All reactions

```
curl --location --request GET 'http://lucaspoirel.ovh:8080/reaction' \
--header 'Authorization: Bearer <token>' \
--data-raw ''
```

### GET /reaction/reactId/:id
get reaction by it's ID

```
curl --location --request GET 'http://lucaspoirel.ovh:8080/reaction/reactId/' \
--header 'Authorization: Bearer <token>' \
--data-raw ''
```

### GET /reaction/delete/:reactId
delete a reaction entity by it's ID

```
curl --location --request GET 'http://lucaspoirel.ovh:8080/action/launch' \
--header 'Authorization: Bearer <token>' \
--data-raw ''
```

## GITHUB

### GET /github/users/search
Get all data for the username selected

```
curl --location --request GET 'http://lucaspoirel.ovh:8080/github//search' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
--data-raw ''
```

### GET /github/users/repos
Get all the repository for the specified username

```
curl --location --request GET 'http://lucaspoirel.ovh:8080/github//repos' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
--data-raw '{
	"username":"lcomte"
}'
```

### GET /github/users/repos/select
Get all data for the selected repository(Nbr of stars, watchers, ...)

```
curl --location --request GET 'http://lucaspoirel.ovh:8080/github/lcomte/PSU_navy_2017/select' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
--data-raw '{
	"username":"lcomte",
	"repo_name":"PSU_navy_2017"
}'
```

### PUT /github/username/reponame
get All actions with link reactions for a user by it's ID

```
curl --location --request PUT 'http://lucaspoirel.ovh:8080/github//' \
--header 'Authorization: Bearer <token>' \
--header 'Content-Type: application/json' \
--data-raw '{
	"token": "token Github Api"
}'
```

### DEL /github/username/reponame
get All actions with link reactions for a user by it's ID

```
curl --location --request DELETE 'http://lucaspoirel.ovh:8080/github//' \
--header 'Authorization: Bearer <token>' \
--header 'Content-Type: application/json' \
--data-raw '{
	"token": "token Github Api"
}'
```

## TRELLO

### GET /trello/members/:username/:key/:oauth/boards
return list of all boards

```
curl --location --request GET 'http://lucaspoirel.ovh:8080/trello/members//boards' \
--header 'Authorization: Bearer <token>' \
--header 'Content-Type: application/json' \
--data-raw '{
	"token": "token trello Api",
	"oauth": "token utilisateur"
}'
```

### GET /trello/boards/:id/:key/:oauth
return all list from a board

```
curl --location --request GET 'http://lucaspoirel.ovh:8080/trello/idList/' \
--header 'Authorization: Bearer <token>' \
--header 'Content-Type: application/json' \
--data-raw '{
	"token": "token trello Api",
	"oauth": "token utilisateur",
	"ID": "ID du board"
}'
```

### GET /trello/idList/:id/:key/:oauth
return list of all cards

```
curl --location --request GET 'http://lucaspoirel.ovh:8080/trello/boards/' \
--header 'Authorization: Bearer <token>' \
--header 'Content-Type: application/json' \
--data-raw '{
	"token": "token trello Api",
	"oauth": "token utilisateur",
	"ID": "ID de la IDlist"
}'
```

### POST /trello/cards
```
curl --location --request POST 'http://lucaspoirel.ovh:8080/trello/cards' \
--header 'Authorization: Bearer <token>' \
--header 'Content-Type: application/json' \
--data-raw '{
	"token": "token trello Api",
	"oauth": "token utilisateur",
	"ID": "ID de la IDlist",
	"name": "nom de la carte"
}'
```

### POST /trello/boards
```
curl --location --request POST 'http://lucaspoirel.ovh:8080/trello/boards' \
--header 'Authorization: Bearer <token>' \
--header 'Content-Type: application/json' \
--data-raw '{
	"token": "token trello Api",
	"oauth": "token utilisateur",
	"name": "nom de la carte"
}'
```

### POST /trello/list
```
curl --location --request POST 'http://lucaspoirel.ovh:8080/trello/list' \
--header 'Authorization: Bearer <token>' \
--header 'Content-Type: application/json' \
--data-raw '{
	"token": "token trello Api",
	"oauth": "token utilisateur",
	"name": "nom de la liste",
	"ID": "ID du board ou mettre la liste"
}'
```

## SPOTIFY
### GET /spotify/me/:token
```
curl --location --request GET 'http://lucaspoirel.ovh:8080/spotify/me' \
--header 'Authorization: Bearer <token>' \
--header 'Content-Type: application/json' \
--data-raw '{
	"token": "token Spotify Api"
}'
```

### GET /spotify/search/:artist_name/:token
```
curl --location --request GET 'http://lucaspoirel.ovh:8080/spotify/search/' \
--header 'Authorization: Bearer <token>' \
--header 'Content-Type: application/json' \
--data-raw '{
	"token": "token Spotify Api"
}'
```

### PUT /spotify/follow/:type/:username
```
curl --location --request PUT 'http://lucaspoirel.ovh:8080/spotify/search/' \
--header 'Authorization: Bearer <token>' \
--header 'Content-Type: application/json' \
--data-raw '{
	"token": "token Spotify Api"
	"type": "artist ou User"
	"name": "name to follow"
}'
```

## SLACK
### GET /slack/listId/:token
```
curl --location --request GET 'http://lucaspoirel.ovh:8080/slack/listId' \
--header 'Authorization: Bearer <token>' \
--header 'Content-Type: application/json' \
--data-raw '{
	"token": "token slack Api"
}'
```

### POST /slack/create/:name
```
curl --location --request POST 'http://lucaspoirel.ovh:8080/slack/create/' \
--header 'Authorization: Bearer <token>' \
--header 'Content-Type: application/json' \
--data-raw '{
	"token": "token slack Api",
	"name": "nom de la conversation à creer"
}'
```

## IMGUR

### GET /imgur/getreputation/:token
```
curl --location --request GET 'http://lucaspoirel.ovh:8080/imgur/getreputation' \
--header 'Authorization: Bearer <token>' \
--header 'Content-Type: application/json' \
--data-raw '{
	"token": "token slack Api"
}'
```
