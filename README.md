This is a clone of a popular note taking app Notion made for educational purposes.
It is developed using Nextjs, TailwindCSS, Shadcnui for styling, Convex for the backend, Clerk for authentication, & Edgestore for storing images.
I tried to amke it as close to the original as possible in terms of style and features.
It has following features so far:
1. Ability to add, update, delete and preview documents with live database.(thanks convex)
2. Ability to upload images in documents.
3. Ability to create unlimited child documents.
4. Ability to archive documents.
5. Dark mode toggle. (thanks shadcnui).
6. Same editor as the one in Notion built using [Blocknote](https://www.blocknotejs.org/)



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

