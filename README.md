# Flora — Flower Bouquet Store

Flora is a responsive flower shop website that displays a catalog of bouquets received from a deployed REST API.

## Live links

* [Live website](https://romanborys.github.io/UMT-markup-practice-Roman_Borys/)
* [Frontend repository](https://github.com/RomanBorys/UMT-markup-practice-Roman_Borys)
* [Backend API](https://umt-markup-practice-roman-borys-backend.onrender.com/api/bouquets)
* [Swagger documentation](https://umt-markup-practice-roman-borys-backend.onrender.com/api-docs/)

## Features

* Responsive layout for desktop, tablet, and mobile devices
* Dynamic bouquet catalog loaded from the backend API
* Initial rendering of 8 bouquets
* “Show More” button that displays 4 additional bouquets
* Product details modal
* Bouquet details loaded by bouquet ID
* Static bestsellers slider
* Reviews slider
* Mobile navigation menu
* Order form modal
* Loading, empty, and error states
* Keyboard support for dynamic product cards

## Technologies

* HTML5
* CSS3
* JavaScript
* JavaScript modules
* Axios
* GitHub Pages
* REST API

## API integration

The bouquet catalog is loaded from:

```text
GET https://umt-markup-practice-roman-borys-backend.onrender.com/api/bouquets
```

A single bouquet is loaded from:

```text
GET https://umt-markup-practice-roman-borys-backend.onrender.com/api/bouquets/:id
```

The frontend uses the following bouquet fields:

```text
id
title
description
price
photoURL
favorite
```

## Project structure

```text
.
├── assets/
│   ├── icons/
│   └── images/
├── css/
│   └── styles.css
├── js/
│   ├── api/
│   ├── modal/
│   ├── render/
│   ├── sliders/
│   ├── state/
│   ├── load-more.js
│   ├── main.js
│   └── menu.js
├── index.html
└── README.md
```

## Running locally

1. Clone the repository:

```bash
git clone https://github.com/RomanBorys/UMT-markup-practice-Roman_Borys.git
```

2. Open the project directory:

```bash
cd UMT-markup-practice-Roman_Borys
```

3. Start the project with a local development server, for example VS Code Live Server.

4. Open the local address in a browser:

```text
http://127.0.0.1:5500
```

The backend CORS configuration must allow the local frontend origin.

## Deployment

The frontend is deployed with GitHub Pages from the `main` branch.

## Author

Roman Borys

* [GitHub profile](https://github.com/RomanBorys)
