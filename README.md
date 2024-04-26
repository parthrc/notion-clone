# Protion a Notion clone.
## Demo [here](#)
This is a clone of a popular note taking app Notion made for educational purposes. It is developed using Nextjs, tailwindcss & shadcnui for styling, [Convex](https://www.convex.dev/) for the backend, [Clerk](https://clerk.com/) for authentication, & [Edgestore](https://edgestore.dev/) for storing images. 
I tried to make it as close to the original as possible in terms of style and features.

### It has the following features so far:
- Ability to create, update, delete pages with live database thanks to Convex.
- Ability to upload images in the pages using edgestore.
- Can create infinite child pages.
- Can archive and publish pages to share on the internet.
- Dark mode toggle.
- Same editor as the one in Notion built using [Blocknote](https://www.blocknotejs.org/)





## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

