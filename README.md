# Stock Prediction

The project is a fullstack nextjs application that is deployed on vercel with CI/CD features

## Project Summary

The project is used for:
- Predicting stock prices for a random timestamp for all stock exchanges predfined in a local path. --> "stocks_data" folder in the local project
- Downloading the data as csv files

Frontend:
- NextJS + bootstrap

Backend:
- NextJS severless functions

Hosting:
- Vercel with CI/CD features applied directly to the github repository

Frist API endpoint is defined in "app/api/stocks/route.js". It gets the numberOfFiles as request parameter. Then will look in every folder from "stocks_data" will get the number of files requested (if not possible because it requested too many files then it will return ones that are present).

Second API endpoint is defined in "app/api/stocks/predict/route.js". It gets the array of entries as parameter. Then it will calculate the "m" and "b" with the linear regression algorithm. With these values it will predict the next 3 values, add them to the existing array of entries and return it

## How to run it

This project is hosted on vercel and can be seen by following this link https://next-stock-prediction.vercel.app/

Local:
1. Clone this repository
```
git clone https://github.com/bogdan-stefan-2000/next-stock-prediction.git
```
2. Go to directory "next-stock-prediction" and open a terminal to run these commands
```
This project was made using node v20.17.0 and npm 10.8.3
npm i
npm run dev
```
3. The project shoul run locally on http://localhost:3000
