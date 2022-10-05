# Student: Doan Xuan Truong
# StoreFood - Website

## User Stories

### Background

This is an online food store application. Specializing in providing fresh and fresh food, helping people to have a busy time to go to the market online to buy food quickly.

With this application website, you can sell your own food items


### Authentication
- As a user, i can sign in, with my email and password
- As a user, i can register for a new account, email, password
- As a user, i can stay signed in with refreshing page


### Users

- As a user, the role is a buyer, I can see the user's profile
- As a user, the role is a buyer, I can update my profile into Avatar, Name, Phone, address, City, Country
- As a user,the role of a seller, I can see my profile
- As a user, the role of a seller, I can update my profile logo, shopname, company, phone, address.

### Product

- As a user the role is a buyer, I can see a list of all products
- As a user the role is a buyer, I can see the search function according to the product name
- As a user, the role of a buyer, I can see the details of a product
- As a user, the role of a seller, I can see the list of products I am selling
- As a user, the role of a seller, I can add new products
- As a user, the role of a seller, I can update the information of a product I am selling
- As a user, the role of a seller, I can delete my product

### Cart
- As a user, the role of a buyer, I can add products to the cart
- As a user, the role of a buyer, I can see the list of products in the cart
- As a user, the role of a buyer, I can add or reduce the number of products in the cart
- As a user, the role of a buyer, I can delete the product that does not want to buy in the cart

### Order
- As a user, the role of a buyer, I can order an order to my address and phone number
- As a user, the role of a buyer, I can see the list of my order
- As a user, the role of a seller, I can see the list of orders I have sold.
- As a user, the role of a seller, I can update the status for my orders

 
## Endpoint APIs

### Auth APIs

````javascript
/**
 * @route POST /auth/loginUser
 * @description Log in with username and password
 * @body {email, password}
 * @access public 
 */

````

### User APIs

````javascript
/**
 * @route POST /users/buyer
 * @description Register new user buyer
 * @body {name, email, password}
 * @access public 
 */
````

````javascript
/**
 * @route POST /users/seller
 * @description Register new user seller
 * @body {name, email, password}
 * @access public 
 */
````

````javascript
/**
 * @route GET /users/me
 * @description Get current user info
 * @access Login required
 */
````

````javascript
/**
 * @route GET /users/:id
 * @description Get a user profile
 * @access Login required
 */
````

````javascript
/**
 * @route PUT /users/seller/:id
 * @description Update user seller profile
 * @body {name, avataUrl,address}
 * @access Login required
 */
````



### products APIs

````javascript
/**
 * @route POST /products
 * @description Create a new products
 * @body {name, imge,describe,foods:[ Processing,Unprocessed, Vegetable], price,unit,amount}
 * @access Seller Login required
 */
````

````javascript
/**
 * @route GET /products?page=1&limit=10&name=`$productName`
 * @description Get products with pagination
 * @access public
 */

````

````javascript
/**
 * @route GET /products/:id
 * @description Get a product
 * @access public
 */

````

````javascript
/**
 * @route GET /products/:id?page=1&limit=10&name=`$productName`
 * @description Get products with pagination
 * @access public
 */
````

```javascript
/**
 * @route GET /products/detail/:id
 * @description Get a product
 * @access public
 */
```

```javascript
/**
 * @route PUT /products
 * @description Update a new products
 * @body {name, imge,describe,foods:[ foodProcessing,unprocessedFood], price,unit,amount}
 * @access Seller Login required
 */
```

```javascript
/**
 * @route DELETE /products/:id
 * @description Delete a product
 * @access Login required
 */

```

### Cart APIs

```javascript
/**
 * @route POST /cart
 * @description Create a new cart
 * @body {productId:Types.ObjectId, authorUser:Types.ObjectId,amount}
 * @access Seller Login required
 */
```

```javascript
/**
 * @route GET /cart?page=1&limit=10&name=`$productName`
 * @description Get cart with pagination
 * @access public
 */

```
```javascript
/**
 * @route PUT /cart
 * @description Update a new cart
 * @body {amount}
 * @access Seller Login required
 */
```

```javascript
/**
 * @route DELETE /cart/:id
 * @description Delete a cartProduct
 * @access Login required
 */
```

### Oders APIs

````javascript
/**
 * @route POST /oders
 * @description Create a new Oders
 * @body {productName,userName,amount0.}
 * @access Login required
 */
````

````javascript
/**
 * @route GET /oders?page=1&limit=10
 * @description Get Oders with pagination
 * @access public
 */

````

````javascript
/**
 * @route GET /oders/seller?page=1&limit=10
 * @description Get Oders with pagination
 * @access public
 */
````

````javascript
/**
 * @route GET /oders/:id
 * @description Get a Oders
 * @access public
 */
````

````javascript
/**
 * @route PUT /oders
 * @description Update a new oders
 * @body {name, imge,describe,foods:[ foodProcessing,unprocessedFood], price,unit,amount}
 * @access Seller Login required
 */
````

````javascript
/**
 * @route DELETE /oders/:id
 * @description Delete a oder
 * @access Login required
 */
````


## Relational Diagram

![](https://i.imgur.com/ddzBCBs.png)
