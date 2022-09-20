# Student: Doan Xuan Truong
# StoreFood - Website

This is an online food store application. Specializing in providing fresh and fresh food, helping people to have a busy time to go to the market online to buy food quickly
 
## Endpoint APIs

### Auth APIs

````javascript
/**
 * @route POST /auth/login
 * @description Log in with username and password
 * @body {email, password}
 * @access public 
 */
````

````javascript
/**
 * @route POST /auth/seller
 * @description Log in with admin and password
 * @body {email, password}
 * @access public 
 */
````

### User APIs

````javascript
/**
 * @route POST /users
 * @description Register new user
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



### Seller APIs

````javascript
/**
 * @route POST /seller
 * @description Register new user
 * @body {nameSeller, email, password}
 * @access public 
 */
````


### products APIs

````javascript
/**
 * @route POST /products
 * @description Create a new products
 * @body {name, imge,describe,foods:[ foodProcessing,unprocessedFood], price,unit,amount}
 * @access Seller Login required
 */
````

````javascript
/**
 * @route GET /products?page=1&limit=10
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
 * @route PUT /products
 * @description Update a new products
 * @body {name, imge,describe,foods:[ foodProcessing,unprocessedFood], price,unit,amount}
 * @access Seller Login required
 */
````

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
 * @body {productName,userName,salary,unitPrice,sum}
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
 * @route GET /oders/:id
 * @description Get a Oders
 * @access public
 */
````


## Relational Diagram

![](https://i.imgur.com/vjgligM.png)