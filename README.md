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

1. Import `database.sql` into your local MySQL server.
2. Set up a local PHP server (e.g., XAMPP).
3. Update DB connection credentials in PHP files.
4. Open the purchase form in your browser, submit a purchase, and download the PDF.

---

Feel free to fork or contribute to improve the project!
