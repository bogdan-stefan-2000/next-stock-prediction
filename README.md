# Stock Prediction

The project is a fullstack nextjs application that is deployed on vercel with CI/CD features

## Project Summary

The project is used for:
- Predicting stock prices for a random timestamp for all stock exchanges predfined in a local path. --> "stocks_data" folder in the local project
- Downloading the data as csv files

Frist API endpoint is defined in "app/api/stocks/route.js". It gets the numberOfFiles as request parameter. Then will look in every folder from "stocks_data" will get the number of files requested (if not possible because it requested too many files then it will return ones that are present).

Second API endpoint is defined in "app/api/stocks/predict/route.js". It gets the array of entries as parameter. Then it will calculate the "m" and "b" with the linear regression algorithm. With these values it will predict the next 3 values, add them to the existing array of entries and return it
