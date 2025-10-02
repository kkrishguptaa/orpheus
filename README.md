# Orpheus

NextJs Poetry Showcase Website with Notion as CMS

[![A screenshot of the Orpheus Website](https://github.com/kkrishguptaa/orpheus/raw/main/.github/screenshot.png)](https://poems.krishg.com)

## 👋 Introduction

What is the world but a collection of words? Everything we see, feel, and experience is an assumption, a belief, a word. I am a poet who believes in the power of words to shape our reality. Through my poetry, I explore the depths of human emotion, the beauty of nature, and the complexities of life.

To let the world grasp my poems, I build Orpheus, the website where I showcase them. It is designed to be infrastructure-efficient, fast, and easy to use. I use Notion as my CMS, which allows me to write and manage my poems in a familiar environment. The website is built with Next.js, a powerful framework for building web applications.


## 📦 Tech Stack

- [Next.js](https://nextjs.org/) - React framework.
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework.
- [Notion](https://www.notion.so/) - CMS for managing poems.
- [Vercel](https://vercel.com/) - Hosting platform.
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript.

### Next.js

None of the routes generated are static. The home page is rendered on ISR (Incremental Static Regeneration) every 24 hours. Each poem page is server-rendered once and kept forever. The expectation is that published poems shall not receive any edits, while I can still write new poems and publish them.

The image optimization provided by Next.js is NOT used. All images are optimised before putting them in the repository. I have used `cwebp` and `svgo` to optimise images.

### Notion

The notion database is expected to have the following properties:

| Property Name | Type     | Description                         |
| ------------- | -------- | ----------------------------------- |
| Name          | Title    | The title of the poem.              |
| Category      | Select   | Filtering for "Poem"                |
| Status        | Select   | Filtering for "Written" (Published) |
| Written       | Date     | The date the poem was written.      |


I use a Notion automation to set the `Written` date to the current date when the `Status` is changed to `Written`. This ensures that the `Written` date is always accurate and up-to-date.

The "Category" property exists solely because I write more than just poems in that one Notion database.

### Vercel

This website is hosted on Vercel. If you want to deploy it yourself, you can use this handy button:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkkrishguptaa%2Forpheus&env=NOTION_API_KEY,NOTION_DATA_SOURCE_ID&envDescription=Values%20needed%20for%20Notion%20to%20work.&envLink=https%3A%2F%2Fgithub.com%2Fkkrishguptaa%2Forpheus%23environment-variables&project-name=orpheus&repository-name=orpheus&demo-title=Orpheus&demo-description=NextJs%20Poetry%20Showcase%20Website%20with%20Notion%20as%20CMS&demo-url=https%3A%2F%2Fpoems.krishg.com&demo-image=https%3A%2F%2Fgithub.com%2Fkkrishguptaa%2Forpheus%2Fraw%2Fmain%2F.github%2Fscreenshot.png)

## ✌️ Deployment

### Environment Variables

The following environment variables are required to run the project:

```ini
NOTION_API_KEY=your_notion_api_key
NOTION_DATA_SOURCE_ID=your_notion_database_id
```

You can obtain the `NOTION_API_KEY` by creating an integration in Notion and sharing your database with that integration. The `NOTION_DATA_SOURCE_ID` is the ID of your Notion data source, which can be options menu of your database view in Notion.

![Notion Data Source ID](https://github.com/user-attachments/assets/99238922-d8c0-46b6-b141-97f0bb3e929f)

### Running Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/kkrishguptaa/orpheus.git
   ```
2. Navigate to the project directory:

   ```bash
   cd orpheus
    ```

3. Install dependencies:

    ```bash
    pnpm install
    ```

4. Create a `.env` file in the root directory and add the required environment variables.

5. Run the development server:

   ```bash
   pnpm dev
   ```

## 📜 License

This source code for this project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute it as per the terms of the license. However, the poems showcased on the website are my original work and are protected under copyright law. Please do not use or reproduce them without my permission.
