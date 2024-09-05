PharmaFleet

PharmaFleet is a comprehensive web application designed to streamline the process of managing and tracking prescription orders. The platform provides functionalities for both customers and administrators, ensuring efficient order placement, tracking, and management.

Features

Customer Features

Order Placement: Customers can place orders for their prescriptions by providing necessary details such as medication, dosage, and delivery address.

Order Tracking: Customers can track their orders in real-time using Mapbox integration, which displays the delivery location on a map.

User Authentication: Secure login and registration for customers to manage their orders and personal information.

Admin Features

Order Management: Administrators can view and manage all prescription orders, including updating order statuses and viewingPharmaFleet

PharmaFleet is a comprehensive web application designed to streamline the process of managing and tracking prescription orders. The platform provides functionalities for both customers and administrators, ensuring efficient order placement, tracking, and management.

Features

Customer Features

Order Placement: Customers can place orders for their prescriptions by providing necessary details such as medication, dosage, and delivery address.

Order Tracking: Customers can track their orders in real-time using Mapbox integration, which displays the delivery location on a map.

User Authentication: Secure login and registration for customers to manage their orders and personal information.

Admin Features

Order Management: Administrators can view and manage all prescription orders, including updating order statuses and viewing customer details.

Map Integration: Navigation to delivery locations using Mapbox, allowing administrators and users to monitor the delivery process.

Technologies Used
Frontend: React, CSS, HTML

Backend: Node.js, Express

Database: MongoDB

Map Integration: Mapbox

Authentication: JWT (JSON Web Tokens)

Installation

1. Clone the repository

git clone https://github.com/yourusername/PharmaFleet.git

cd PharmaFleet

2. Install dependencies

npm install

3. Set up environment variables: create a .env file in the root directory and add the following variables

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

MAPBOX_ACCESS_TOKEN=your_mapbox_access_token

4. Run the application
npm run dev - for admin and frontend

Usage

Customer: Navigate to the customer portal to place and track orders.

Admin: Navigate to the admin portal to manage orders and view the dashboard.


Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

License
This project is licensed under the MIT License.





# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
