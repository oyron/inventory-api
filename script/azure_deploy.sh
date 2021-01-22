#!/bin/bash

#az login
az account set --subscription "S060-IT-Professional-Network"
az group create -l "Norway East" -n API-demos
az appservice plan create --name Library-API-SP --resource-group API-demos --sku B1
az webapp create --resource-group API-demos --plan Library-API-SP --name lib --runtime "NODE|10.15" --deployment-local-git
git remote add azure https://oyron@lib.scm.azurewebsites.net/lib.git
git push azure master
az ad app create --display-name library-api --homepage http://localhost:3100 --identifier-uris http://www.equinor.com/library-api


az webapp create --resource-group OYRON-POC --plan Library-API-SP --name library-api --deployment-container-image-name oyronpoc.azurecr.io/library-api:v1