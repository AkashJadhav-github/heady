# heady

Steps to setup the project - 

1) Clone the repository using below command
https://github.com/AkashJadhav-github/heady

2) Go to the project directory and execute following commands
- npm install
- npm start

3) Now when the project is successfully running, you can try the following APIs

a) Adding new category

URL - localhost:3000/categories/
Method - POST
Body - { 
    "name": "Womens",
    "child_categories": [],
    "products": []
}

b) Fetch all teh categories

URL - localhost:3000/categories/all
Method - GET

c) Add Products to category/categories

URL - localhost:3000/products/
Method - POST
body -  [
    { 
        "id": 1,
        "name": "Jeans",
        "categories": ["5d0ba3187b399464cd7861e3", "5d0ba31c7b399464cd7861e4"],
        "price": 200,
        "colors": ["RED", "BLUE"]
    },
    ... (if you want to add multiple products at the same time)
]

d) Get Products of particular categories

URL - localhost:3000/products/getbycategory?category_name=Mens&category_id=5d0ba21dc99ff363fb03390d 
(here, either category name is required or category id is required. If both are passed, it checks with the category name)
Method - GET

e) Update product

URL -> localhost:3000/products/:id (here :id is the product id which we want to update)
Method - PUT
Body - {
    "name": "Jeanzzzz",
    "category_id": "5d0ba3187b399464cd7861e3",
    ....... (any number of params you want to update)
}
