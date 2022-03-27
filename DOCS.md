# backend v0.0.0



- [Assessment](#assessment)
	- [Create assessment](#create-assessment)
	- [Delete assessment](#delete-assessment)
	- [Retrieve assessment](#retrieve-assessment)
	- [Retrieve assessments](#retrieve-assessments)
	- [Update assessment](#update-assessment)
	
- [Auth](#auth)
	- [Authenticate](#authenticate)
	
- [Fields](#fields)
	- [Create fields](#create-fields)
	- [Delete fields](#delete-fields)
	- [Retrieve fields](#retrieve-fields)
	- [Update fields](#update-fields)
	
- [General](#general)
	- [Create general](#create-general)
	- [Delete general](#delete-general)
	- [Retrieve general](#retrieve-general)
	- [Retrieve generals](#retrieve-generals)
	- [Update general](#update-general)
	
- [Group](#group)
	- [Create group](#create-group)
	- [Delete group](#delete-group)
	- [Retrieve group](#retrieve-group)
	- [Retrieve groups](#retrieve-groups)
	- [Update group](#update-group)
	
- [Information](#information)
	- [Create information](#create-information)
	- [Delete information](#delete-information)
	- [Retrieve information](#retrieve-information)
	- [Update information](#update-information)
	
- [User](#user)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Update password](#update-password)
	- [Update user](#update-user)
	


# Assessment

## Create assessment



	POST /asses


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| priority			| 			|  <p>Assessment's priority.</p>							|
| year			| 			|  <p>Assessment's year.</p>							|
| title			| 			|  <p>Assessment's title.</p>							|
| description			| 			|  <p>Assessment's description.</p>							|
| descriptionHTML			| 			|  <p>Assessment's descriptionHTML.</p>							|
| status			| 			|  <p>Assessment's status.</p>							|
| type			| 			|  <p>Assessment's type.</p>							|
| url			| 			|  <p>Assessment's url.</p>							|
| formula			| 			|  <p>Assessment's formula.</p>							|
| aggregate			| 			|  <p>Assessment's aggregate.</p>							|
| countrows			| 			|  <p>Assessment's countrows.</p>							|

## Delete assessment



	DELETE /asses/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve assessment



	GET /asses/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve assessments



	GET /asses


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update assessment



	PUT /asses/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| priority			| 			|  <p>Assessment's priority.</p>							|
| year			| 			|  <p>Assessment's year.</p>							|
| title			| 			|  <p>Assessment's title.</p>							|
| description			| 			|  <p>Assessment's description.</p>							|
| descriptionHTML			| 			|  <p>Assessment's descriptionHTML.</p>							|
| status			| 			|  <p>Assessment's status.</p>							|
| type			| 			|  <p>Assessment's type.</p>							|
| url			| 			|  <p>Assessment's url.</p>							|
| formula			| 			|  <p>Assessment's formula.</p>							|
| aggregate			| 			|  <p>Assessment's aggregate.</p>							|
| countrows			| 			|  <p>Assessment's countrows.</p>							|

# Auth

## Authenticate



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|

# Fields

## Create fields



	POST /field


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| assesID			| 			|  <p>Fields's assesID.</p>							|
| title			| 			|  <p>Fields's title.</p>							|
| variable			| 			|  <p>Fields's variable.</p>							|
| isReadOnly			| 			|  <p>Fields's isReadOnly.</p>							|

## Delete fields



	DELETE /field/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve fields



	GET /field


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update fields



	PUT /field/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| assesID			| 			|  <p>Fields's assesID.</p>							|
| title			| 			|  <p>Fields's title.</p>							|
| variable			| 			|  <p>Fields's variable.</p>							|
| isReadOnly			| 			|  <p>Fields's isReadOnly.</p>							|

# General

## Create general



	POST /generals


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| academy			| 			|  <p>General's academy.</p>							|
| year			| 			|  <p>General's year.</p>							|
| director			| 			|  <p>General's director.</p>							|
| executiveResource			| 			|  <p>General's executiveResource.</p>							|
| executivePlanning			| 			|  <p>General's executivePlanning.</p>							|
| executiveAffairs			| 			|  <p>General's executiveAffairs.</p>							|
| executiveDepartment			| 			|  <p>General's executiveDepartment.</p>							|
| leaderQA			| 			|  <p>General's leaderQA.</p>							|

## Delete general



	DELETE /generals/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve general



	GET /generals/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve generals



	GET /generals


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update general



	PUT /generals/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| academy			| 			|  <p>General's academy.</p>							|
| year			| 			|  <p>General's year.</p>							|
| director			| 			|  <p>General's director.</p>							|
| executiveResource			| 			|  <p>General's executiveResource.</p>							|
| executivePlanning			| 			|  <p>General's executivePlanning.</p>							|
| executiveAffairs			| 			|  <p>General's executiveAffairs.</p>							|
| executiveDepartment			| 			|  <p>General's executiveDepartment.</p>							|
| leaderQA			| 			|  <p>General's leaderQA.</p>							|

# Group

## Create group



	POST /groups


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| 			|  <p>Group's name.</p>							|
| role			| 			|  <p>Group's role.</p>							|

## Delete group



	DELETE /groups/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve group



	GET /groups/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve groups



	GET /groups


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update group



	PUT /groups/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| 			|  <p>Group's name.</p>							|
| role			| 			|  <p>Group's role.</p>							|

# Information

## Create information



	POST /information


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| title			| 			|  <p>Information's title.</p>							|
| isURL			| 			|  <p>Information's isURL.</p>							|
| URL			| 			|  <p>Information's URL.</p>							|
| detail			| 			|  <p>Information's detail.</p>							|

## Delete information



	DELETE /information/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve information



	GET /information


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update information



	PUT /information/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| title			| 			|  <p>Information's title.</p>							|
| isURL			| 			|  <p>Information's isURL.</p>							|
| URL			| 			|  <p>Information's URL.</p>							|
| detail			| 			|  <p>Information's detail.</p>							|

# User

## Create user



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| username			| String			|  <p>User's username.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| role			| String			| **optional** <p>User's role.</p>							|

## Delete user



	DELETE /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve current user



	GET /users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve user



	GET /users/:id


## Retrieve users



	GET /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update password



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with username and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Update user



	PUT /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|


