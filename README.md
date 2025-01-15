# Prison Management System

(Project originally finised in May 2023)

## Project Overview
The Prison Management System is a web-based application designed to manage prison operations efficiently. This system enables administrators to manage inmates, guards, cells, and shifts with ease. The project is built using **JavaScript (Node.js with Express)** for the backend, **SQL Server** for the database, and **Pug** as the template engine for the frontend.

## Features

### Inmate Management
- **Insert Inmate:** Add new inmate records including first name, last name, sentence, gang affiliation, cell allocation, conduct, and gender.
- **Update Inmate:** Modify existing inmate details.
- **Delete Inmate:** Remove inmate records.
- **Move Inmate:** Transfer inmates between cells.

### Guard Management
- **Insert Guard:** Add new guard records with clearance level and role.
- **Update Guard:** Modify guard information.
- **Delete Guard:** Remove guard records.

### Cell & Cell Block Management
- **Insert/Update/Delete Cells:** Manage prison cells and their statuses.
- **Insert/Update/Delete Cell Blocks:** Manage different cell blocks.

### Shift Management
- **Insert/Update/Delete Shifts:** Schedule and manage guard shifts.

### Queries and Reports
- Execute simple and advanced queries:
  - View inmates by sentence duration.
  - Count shifts on each cell block.
  - Calculate average number of guards per cell block.
  - Identify empty cells.

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** SQL Server
- **Frontend:** Pug (template engine), HTML, CSS

## Project Structure
```
├── routes
│   ├── index.js
│   ├── insert.js
│   ├── queries.js
│   ├── delete.js
│   ├── update.js
│   └── users.js
├── views
│   ├── insertInmate.pug
│   ├── deleteInmate.pug
│   ├── viewInmates.pug
│   └── error.pug
├── public
│   └── stylesheets
├── app.js
├── package.json
└── README.md
```

## Database Schema
The system uses the following SQL Server tables:

- **Inmates** (`PID`, `PFirst`, `PLast`, `PSentence`, `PGang`, `PConduct`, `Gender`, `Parole`, `CID`)
- **Guards** (`GID`, `GFirst`, `GLast`, `GType`, `Clearance`, `Warden`)
- **Cell** (`CID`, `CellStatus`, `MaxCap`, `CBname`)
- **CellBlock** (`CBname`, `CBType`, `NoCams`)
- **Shifts** (`Day`, `Time`, `GID`, `CBname`)

### Entity-Relationship Diagram (ERD)
![ERD](https://github.com/user-attachments/assets/89b119c9-367d-480c-bf40-3c749024b2da)

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/prison-management-system.git
    cd prison-management-system
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```


3. **Configure SQL Server Database:**
    - Set up a database in SQL Server using the provided schema.
    - Update the database connection settings in the project.

4. **Run the application:**
    ```bash
    npm start
    ```

5. **Access the app:**
    - Open your browser and go to `http://localhost:3000`

## Screenshots

### Insert Inmate Page
![Insert](https://github.com/user-attachments/assets/96a94368-eb30-4f9c-83b0-b80c18084343)


### Main Dashboard
![Main page](https://github.com/user-attachments/assets/ade95e92-ef3a-42b8-91c7-2c2dec1902d3)
![Main page2](https://github.com/user-attachments/assets/bf61d548-f981-40a7-bbfa-2f1349744e44)

### Move Inmate Page
![Move](https://github.com/user-attachments/assets/675aca99-95ce-4017-b7b6-6be7fe3aa096)


### Cell Block Information
![Cell Blocks](https://github.com/user-attachments/assets/cd2dad68-5fd6-436d-959e-640e29e6cc2e)


### Database Schema in SQL Server
![Table2](https://github.com/user-attachments/assets/faa2ff4f-0ab8-4569-bb11-e61a508f1072)
![Table](https://github.com/user-attachments/assets/99c01414-0b35-4547-ab4d-4e9a33ed7985)


### UML Diagram
![UML](https://github.com/user-attachments/assets/bac85fb6-d8ff-4b8b-b1c5-b5f7bd20c430)



## License
This project is licensed under the MIT License.

## Acknowledgments
- Built with **Node.js**, **SQL Server**, and **Pug**.
- Developed using **Visual Studio 2022**.

