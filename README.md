# beeform

---

<div align="center">
  <br />
    <a href="https://github.com/sanketghosh/beeform" target="_blank">
      <img src="https://github.com/sanketghosh/beeform/blob/main/public/beeformRepoBanner.png" alt="Beeform Repo Banner">
    </a>
  <br />
</div>

---

## Table of Contents

1. [Overview](#overview)
2. [Technologies Used](#tech-stack)
3. [Key Features](#features)
4. [Setup Instructions](#setup-instruction)

---

<div align="center">
  <br />
    <a href="https://github.com/sanketghosh/beeform" target="_blank">
      <img src="https://github.com/sanketghosh/beeform/blob/main/public/beeform.png" alt="Beeform Repo Banner">
    </a>
  <br />
</div>

## <a name="overview">Overview</a>

A form builder application developed using Bun, Next.js, TypeScript, PostgreSQL, Prisma, and Dnd Kit. It allows users to create custom forms through a drag-and-drop interface and stores form data in a PostgreSQL database.

## <a name="tech-stack">Technologies Used</a>

- **Bun:** A fast all-in-one JavaScript runtime & package manager.
- **Next.js:** React framework for building server-rendered and statically generated applications.
- **Better Auth** Comprehensive authentication framework for TypeScript.
- **TypeScript:** A strongly typed superset of JavaScript.
- **PostgreSQL:** A powerful, open-source relational database system.
- **Prisma:** A modern database ORM for TypeScript.
- **Dnd Kit:** A lightweight, performant, accessible drag-and-drop toolkit for React.
- **Tailwind CSS:** For styling.
- **ShadcnUI**: As Tailwind component library

## <a name="features">Key Features</a>

- **Drag-and-drop form building:** Users can drag form elements from a sidebar onto the canvas.
- **Form data storage:** Form definitions and submitted data are stored in a PostgreSQL database using Prisma ORM.
- **Responsive design:** The form builder is designed to be responsive across different devices.
- **Form stats:** Display analytics for each form, such as submission counts and average completion times.
- **Data export to CSV:** Allow users to export submitted form data as a CSV file.

## <a name="setup-instruction">Setup Instructions</a>

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/sanketghosh/beeform.git
    cd beeform
    ```

2.  **Install dependencies using Bun:**

    ```bash
    bun install
    ```

3.  **Set up PostgreSQL:**

    - Ensure you have PostgreSQL installed and running.
    - Create a database for the project.
    - Update the `.env` file with your database connection details:

      ```
      BETTER_AUTH_SECRET=c40843d8e2ffef0a7d4bbad19025
      BETTER_AUTH_URL=http://localhost:3000
      DATABASE_URL="postgresql://postgres:postgres@localhost:5432/beeform"
      NODE_ENV="development"
      ```

4.  **Run Prisma migrations:**

    ```bash
    bunx prisma migrate dev
    ```

5.  **Start the development server:**

    ```bash
    bun run dev
    ```

6.  **Open your browser and navigate to `http://localhost:3000`.**
