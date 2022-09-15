# HELSINKI CITY BIKE APP
Web application displaying city bike journeys and stations in Helsinki area.

### **Features implemented:**
- CSV reading, validating and importing to database
- Journeys displayed in table with pagination + journey filtering by date of return or departure
- Stations displayed in table with pagination + station related information in collapsible rows

Journeys view             | 
:-------------------------:|:-------------------------:
 ![](https://i.imgur.com/XIO1Ybr.png)  |

## 👏SETTING UP THE APP:

💻**Prerequisites:**
- React
  - Node Package Manager
- Java
  - JDK 17
- MySQL

**STEP 1**: Clone the repo <br>

**STEP 2**: Download data to work with<br>

>Data for stations:<br>
>https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv<br>
>
>Data for journeys:<br>
>https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv<br>
>https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv<br>
>https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv<br>

**STEP 3**: Save the data into a folder called *data* and insert it into the *resources* folder of the Java application (*server* folder in repo).

**STEP 4**: Create a database in MySQL
> **Note** <br>
> Name the database to *bikeapp* or if you decide to choose other name for that, the *application.properties* in the Java application must be modified accordingly.
> Same applies to the database type (if you want to use different platform for your database).

**STEP 5**: Edit the *application.properties* (username and password possibly need to be changed based on your configuration)

**STEP 6**: Run the java application.

> **Note** <br>
> The importing requires some time, but next time when you run the application and the data has been successfully created in the database the importing won't be executed again.

**STEP 7**: Once the data has been successfully imported into the database, launch the frontend application (*client* folder). <br>

>*Install node modules*<br>
>```npm install```<br>
>
>*Start the app*<br>
>```npm start```<br>




