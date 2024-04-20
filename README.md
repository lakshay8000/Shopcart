**Shopcart: A Feature-Rich E-commerce Website**


**Overview**

Welcome to ShopCart, an e-commerce website project built to showcase my skills and expertise in front-end development, API integration, and user experience design. ShopCart offers a range of features designed to simulate a real shopping experience while demonstrating proficiency in creating dynamic, user-friendly, and responsive web applications accessible across all screen sizes. ShopCart leverages the power of React and adheres to modern development practices to deliver a seamless user experience.


**Technologies Used**

* Front-End: React
* State Management: React Context 
* Token Decoding: jwt-decode
* HTTP Requests: Axios
* Routing: React Router
* Notifications: react-toastify
* Styling: Reactstrap and Bootstrap (integrated through reactstrap)
* Code Linting: eslint-plugin-simple-import-sort (for improved code organization)


**Key Features**

* **Responsive Design:** 
    * ShopCart adapts seamlessly to different screen sizes, ensuring a smooth user experience across all devices (desktops, tablets, and smartphones).

* **User Authentication and Account Management:**
    * User registration creates accounts with secure storage of cart details using a third-party API.
    * Login allows access to saved account information.

* **Intuitive Navigation:**
    * A clear navbar facilitates access to account information, cart, and login/logout options.
    * Category listings on the homepage guide users to explore products.

* **Comprehensive Product Browsing:**
    * Product categories enable organized product discovery.
    * Search functionality aids product discovery.
    * Filtering by price range streamlines product selection.
    * Clear filter removal option ensures ease of resetting filters.

* **Detailed Product Views:**
    * Product pages display essential product details (image, description, name, price).

* **Dynamic Cart Management:**
    * Users can add products to their cart from product details pages.
    * Quantity adjustments provide flexibility in managing cart items.
    * Item removal allows users to refine their cart selections.
    * Real-time cart price updates reflect changing cart contents.

* **Checkout (Future Implementation):**
    * Currently redirects to the homepage (to be replaced with a secure checkout process).

* **Error Handling:** 
    * Error pages and messages are displayed in case of any issues, ensuring a smooth user experience.


**Installation and Setup**

Ready to experience the power of Shopcart? Clone the repository and dive in!

1. Clone the repository to your local machine.
2. Install dependencies using `npm install`.
3. Start the development server locally using `npm run dev` (built with Vite).


**Using FakeStore API as Backend**

To utilize the FakeStore API as the backend for this project, follow these steps:

1. Visit [FakeStore API](https://fakestoreapi.com/) to explore its endpoints and understand its structure.
2. Create a `.env` file in the root directory of the project.
3. Follow the documentation of fakeStore API and then set the API base URL in the `.env` file.
4. Modify the APIs in the "apis" file in "src" folder, if required according to FakeStore API documentation.


**Backend Information:**

The backend of this project has been modified to add additional functionalities to the FakeStore API. It's hosted on a free instance backend deployment, which may experience delays due to inactivity. Requests might be delayed by up to 50 seconds if the backend instance needs to spin up. Please keep this in mind when testing or using the application.


## Feedback

This project is created as a personal project for inclusion in my portfolio. Its purpose is to showcase my skills in building React applications. If you have any questions or feedback, feel free to reach out.