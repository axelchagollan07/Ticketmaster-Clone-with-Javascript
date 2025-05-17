# 🎟️ TicketMaster Clone - Event Ticket Purchase System

This project is a simplified event ticket purchasing platform inspired by TicketMaster. It allows users to purchase tickets for events, stores the purchase information in a MySQL database, and generates a downloadable PDF receipt with a QR code linking to the purchase details.

## 🛠️ Features

- User-friendly ticket purchase form  
- Backend written in PHP with MySQL integration  
- Stores all purchases in a normalized relational database  
- Generates unique QR codes for each purchase  
- Creates a custom PDF receipt with purchase details and embedded QR code  
- Public `verCompra.html` page to view purchase data by ID  

## 📦 Technologies Used

- PHP  
- MySQL  
- HTML/CSS/JavaScript  
- [QRious](https://github.com/neocotic/qrious) for QR code generation  
- [jsPDF](https://github.com/parallax/jsPDF) for PDF creation  


## 🚀 How to Run

1. Create a database named **`ticketmaster`**.  
2. Import the **`database.sql`** file into the database.  
3. Update your database username and password in the following files:  
   - `/login/backend/db.js`  
   - `/login/backend/index.js`  
   - `/pagos/guardar_boleto.php`  
4. Run **`/login/backend/index.js`** using Node.js.  
5. Open **`index.html`** with Live Server (VS Code extension): right-click the file and select **"Open with Live Server"**.  
6. You're all set—enjoy the app!


### Description

This project is a web-based ticketing system named **TicketMaster**, designed to simulate the process of selecting, purchasing, and storing event tickets. It features a front-end interface for users to browse and choose seats, as well as a back-end setup that handles user authentication, database interactions, and payment processing. It's a great example of full-stack development using technologies like HTML, CSS, JavaScript, PHP, and Node.js.

### Watch the Demo

Want to see how it all works in action?  
🎥 **Check out my video explaining the website here:**  
[https://youtu.be/h_oR3PIg0kY?si=QaRIp5BgT6whYHT3](https://youtu.be/h_oR3PIg0kY?si=QaRIp5BgT6whYHT3)


---

Feel free to fork or contribute to improve the project!
