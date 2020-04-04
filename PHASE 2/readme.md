# Project Title: Starbucks Assist
This project is an online ordering system wherein customer's can have a convenient time to pick-up their order. They no longer need to wait for their drink or even wait in line as they can use the system to order it ahead. In the system, customers will need an account first before being able to order any drink. The customers will also be able to see the new products that are released by Starbucks also known as the Barista's recommendation. This project aims to give customers a sense of ease and convenience in picking up their order as it will be ready once they pick it up allowing them to save time and skip waiting lines.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites
Software requirements that need to be downloaded: 
* [NodeJS & npm](https://www.npmjs.com/get-npm)
* [MongoDB Community Edition](https://docs.mongodb.com/manual/administration/install-community/)
* Any text editor for JavaScript, HTML & CSS (VSCode, Atom, SublimeText, etc.)

# Installing
1. Clone this repository: 
    ```shell
    https://github.com/unisse-courses/s15-mp8.git
    ```

2. Open command prompt and locate to the folder of `s15-mp8`

3. Type in the command prompt to change the directory to folder PHASE 2
    ```shell
    cd PHASE 2
    ```

4. Once you are in PHASE 2’s folder, type in command prompt to install all the dependencies in the package.json
    ```shell
    npm install
    ```


5. Once you've already downloaded the dependencies needed for the project, type `npm run dev`. It will display 
    ```shell
    App listening at port 3000
    MongoDB connected
    ```

6. Navigate to `http://localhost:3000/` in the browser to view the app

7. To stop the server, simply key in `CTRL + C` for windows or `control(^) + C` for Mac

# Running the tests
## Login as an Admin
```
Email : starbucks_assist@gmail.com
Password: admin123
```

## Login as a Customer 
```
Email: fmc@gmail.com
Password: 123
```

# Deployment

This modal will be displayed once the user clicks on a specific drink. The user will be able to choose the size which are ranging from tall, grande, and venti. The user will be also asked to input the quantity of how many drinks he/she wants. Lastly, the user will be able to add some requests. By default, all the drinks in the menu are cold. If the user would like it to be hot, he/she can indicate it in the requests portion of the modal.
![alt text](screens/order-drink.png)

For the admin, he/she will be able to update the menu by editing or adding a drink. The admin will be able to choose a picture from his/her files. Also, the admin will be able to enter a name for the drink and each of their respective prices based on the sizes. Once the admin is done filling up the requirements, by clicking the update button, the drink will be updated. 
![alt text](screens/edit-drink.png)

In view cart, if the customer has additional requests that he/she forgot to indicate during ordering, he/she can still update his/her request.
![alt text](screens/drink-request.png)

The background of the icons will be color green when it is active which means that there’s an order being processed under the logged in customer. Also, active orders from the logged in customer will be listed down under the respective statuses. However, if there is no order being processed the background of the icons will be grey. 
![alt text](screens/order-status.png)

For customers, they will be able to add their favourite drinks in their profile. If they click add drink, a modal will appear and customers can choose which drink they count as their favourite. Once done, it will appear on their profiles and there can be up to five favourite drinks.
![alt text](screens/favorites.png)

In the settings, customers will be able to change their information such as their name, nickname, email address, phone number, password, and display photo. The customer will be able to choose from his/her files to be uploaded as their display photo. Once the customer is done, he/she can save it and the changes will occur. 
![alt text](screens/account-settings.png)


## Built with
* [Bootstrap](https://getbootstrap.com/) - CSS framework
* [MongoDB](https://www.mongodb.com/) - Database
* [Handlebars](https://handlebarsjs.com/) - Templating
* [Nodejs](https://nodejs.org/en/) - Javascript runtime

## Authors
* GO, Ainsley
* LOPEZ, Frances 
* SEE, Sophia

## Acknowledgements
* Ms. Unisse Chua for guiding us in our project. Also, for always replying fast when we have any questions. Thank you!
* Starbucks as it served as an inspiration for conducting this application.


