# To-Do task management system using Convex

## Project Overview

This project is an To-Do task management system which utilizes Convex as the frontend and backend, developed as part of the Headstarter AI Fellowship. It features real-time to-do lists management, sharing across multiple devices, and secured using user auth and session control.

![Dashboard Screenshot](pantry_tracker_homepage.png)

## 🌟 Features

- real-time to-do lists management
- sharing across multiple devices
- secured using user auth
- session control on devices accessing from web
- Search functionality for quick item lookup
- Responsive design for various screen sizes

## 🛠️ Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material-UI](https://material-ui.com/)
- [Convex](https://www.convex.dev/)
- [OpenRouter API](https://openrouter.ai/docs/quick-start)

## 🚀 Live Demo

Check out the video demo on YouTube: [\[Click Here!\]](https://www.youtube.com)

## 🏁 Getting Started

To get a local copy up and running, follow these steps:

1. Clone the repository:


```bash
git clone https://github.com/nehalpatil7/convex-todos.git
```

2. Navigate to the project directory:

```bash
cd convex-todos
```

3. Install dependencies:
```bash
npm install
npm i -s convex
```

4. Set up environment variables:
Create a `.env.local` file in the root directory of your project & add the following environment variables:

```bash
# Deployment used by `npx convex dev`
NEXT_PUBLIC_OPENROUTER_ENDPOINT=your_openrouter_endpoint
OPENROUTER_API_KEY=your_openrouter_api_key

CONVEX_DEPLOYMENT=your_convex_deployment_project
NEXT_PUBLIC_CONVEX_URL=your_convex_url
```

Replace the placeholder values (`your_convex_deployment_project`, `your_convex_url`, etc.) with your actual Convex credentials.

To set up your Firebase project and obtain these credentials:
i. Go to the [Convex Console](https://dashboard.convex.dev/)
ii. Click on "Add project" or select an existing project
iii. Follow the setup wizard to create your project
iv. Alternatively, you can also initialize convex by running 'npm convex dev' and giving it access to your github account and eventually convex console.
v. Then, as you define your schema in your convex/schema.ts file, it automatically syncs back to your convex dashboard.
vi. It will also give you the link to the convex dashboard, as you initialize it in your terminal.

For the OpenAI API key, sign up at the [OpenAI website](https://openai.com/api/) to get your API key.


5. Run the development server:
```bash
npm run dev
```

6. Run the backend convex development server:
```bash
npx convex dev
```

7. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🐛 Troubleshooting

If you encounter any issues while setting up or running the project, try the following:

1. Ensure all dependencies are installed:
```bash
npm install
```

2. Clear Next.js cache:
```bash
rm -rf .next
```

3. Rebuild the project:
```bash
npm run build
```

4. For OpenAI API issues, verify that your API key is correctly set in the `.env.local` file and that you have sufficient credits in your OpenAI account.

5. For Convex issues, verify your backend is successfully initialized and up and running in the background.

6. While deploying your application on Vercel or any platform, you need to update the build commands to also run the convex backend along with the frontend. You also need to update the env variables in Vercel.

7. If you're encountering CORS issues with the OpenAI API, ensure that your serverless function (in `pages/api/object-detection.js`) is correctly configured to handle the API request.


## 👤 Author

**Nehal Patil**

- LinkedIn: [Nehal Patil](https://www.linkedin.com/in/nehalpatil7/)
- GitHub: [@nehalpatil7](https://github.com/nehalpatil7)

## 🙏 Acknowledgments

- Headstarter AI Fellowship for the opportunity and support
- OpenAI for providing the powerful API
- All contributors and reviewers
