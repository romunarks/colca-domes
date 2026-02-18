# Colca Domes: Full-Stack Sustainable Housing Platform 🏔️

This project is a high-performance web application developed for **OPIT - Open Institute of Technology**. It serves as a digital ecosystem for exploring and managing sustainable dome-shaped accommodations in the Colca Canyon, Peru.

## 🎯 Project Vision
To bridge the gap between sustainable architecture and modern software engineering by providing a type-safe, database-driven platform that handles real-time data and user interactions.

## 🛠️ Technical Architecture & Stack

### **Frontend & Logic**
* **TypeScript (TS):** Implementing strict typing across the application to ensure memory safety, reduce runtime bugs, and improve developer experience.
* **HTML5 & CSS3:** Utilizing advanced layouts (Flexbox/Grid) with a **Mobile-First** approach through optimized Media Queries.
* **DOM Manipulation:** Efficient event handling for a dynamic User Experience.

### **Backend-as-a-Service (BaaS)**
* **Supabase:** The core engine for the backend infrastructure.
    * **PostgreSQL Database:** Storing complex data structures for dome features, locations, and user data.
    * **Supabase Auth:** (If implemented) Secure user authentication and session management.
    * **Real-time Subscriptions:** Leveraging Supabase's capabilities for instant data updates.

## 🚀 Key Engineering Features
* **Database Integration:** Seamless connection between the TypeScript frontend and the Supabase PostgreSQL backend.
* **Type-Safe Schemas:** Custom interfaces that mirror the database structure for end-to-end type safety.
* **Responsive Design:** Fully adaptive UI designed to perform in low-bandwidth environments (crucial for remote locations like Colca).
* **Scalable Structure:** Modular code organization following clean code principles.

## ⚙️ Development Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/romunarks/colca-domes.git](https://github.com/romunarks/colca-domes.git)
    ```
2.  **Environment Variables:**
    Create a `.env` file and add your Supabase credentials:
    ```env
    SUPABASE_URL=your_project_url
    SUPABASE_KEY=your_anon_key
    ```
3.  **Install Dependencies:**
    ```bash
    npm install
    ```
4.  **Build & Transpile:**
    ```bash
    tsc
    ```

## 👤 Author
**Rodrigo Prieto Munar**
*Student at OPIT - Open Institute of Technology*
GitHub: [@romunarks](https://github.com/romunarks)
