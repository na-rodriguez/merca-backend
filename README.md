**To create mysql table contact**
*client field was created in order to have only 1 database*
*and not 2 databeses (porstgres and mysql) like exercise said*
CREATE TABLE `contact` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `celular` varchar(20) NOT NULL,
  `client` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
);

**To run dev environment**
*npm install //just first time*
npm start

**Create contacts(POST). Login first. Note: is working with this error:**
*Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client*
*that crash the application but the data is stored at the database (you can confirm that with get contacts service),*
*just run again the aplication and will continue working*
http://localhost:3000/api/contacts/

**Get contacts**
URL/api/contacts/

**Login**
URL/api/contacts/login

**Varibles needed at .env file:**
PORT

MYSQL_HOST
MYSQL_PORT
MYSQL_USER
MYSQL_PASSWORD
MYSQL_DATABASE

CLIENT_MACAPA_KEY
CLIENT_VAREJAO_KEY
CLIENT_VAREJAO_NAME
CLIENT_MACAPA_NAME
JWT_KEY