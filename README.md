# Sol-Pe

**Sol-Pe** is a web application that allows users to manage their Solana account keypairs securely. It provides seamless transaction capabilities through email address search and QR code generation, similar to UPI apps in India. Users can send and receive payments, search for accounts using email addresses, and generate QR codes for fast transactions.

## Features

- **Solana Keypair Management:** Store and manage your Solana account keypair securely.
- **Email-Based Transactions:** Search and make transactions by simply entering the recipient's email address.
- **QR Code Payments:** Generate and share QR codes for easy, fast, and secure transactions.
- **Security:** Built with a focus on privacy and security for handling cryptocurrency transactions.
- **User-Friendly Interface:** Modern and intuitive design for ease of use.

## Technologies Used

- **Application:**
  - Next.js
  - Tailwind CSS
  - Web3.js (for Solana blockchain interaction)
  - Prisma and Postgres

- **Blockchain:**
  - Solana Network (DEVENET)

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (version 14.x or higher)
- **NPM** or **Yarn**
- A Solana account or wallet (e.g., Phantom)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/sol-pe.git
   cd sol-pe
2. Install the required dependencies:
    ```bash
    npm install
3. Set up environment variables:
    ```bash
    DATABASE_URL="DATABASE_URL"
    GOOGLE_CLIENT_ID="GOOGLE_CLIENT_ID"
    GOOGLE_CLIENT_SECRET="GOOGLE_CLIENT_SECRET"
    NEXTAUTH_URL="NEXTAUTH_URL"
4. Start the development server:
    ```bash
    npm run dev
5. Open your browser and go to http://localhost:3000 to view the application.

### Usage
- Create an Account: Sign up using your email address and create a Solana keypair.
- Send/Receive Payments: Use email addresses or QR codes to send and receive payments.
- Manage Transactions: View your transaction history and wallet balance. (BUILDING)
