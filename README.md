# **ImagiAI - AI Image Generator**  

[**Live Demo**](https://andrew-image-generator.vercel.app/)  
[**Public Repository**](https://github.com/a1865818/Image-Generator)  

## **Overview**  
ImagiAI is a personal project designed as a hands-on practice with **React.js**, integrating the **HuggingFace API ** to generate unique AI-driven images. The application features a streamlined user experience, with options to save, share, and manage image prompts.  

Users can run this project locally by setting up dependencies based on `package.json` for both client and server and generating the required API keys.  

## **Features**  
- **AI-Driven Image Generation**: Utilize the **HuggingFace API** to generate custom images based on user prompts.  
- **User Management**: Save and associate image prompts with user accounts stored in a database.  
- **Image Hosting**: Upload images to **Cloudinary** for reliable storage and link generation.  
- **Responsive Design**: Built with **TailwindCSS** for mobile-friendly layouts and a modern look.  
- **Interactive UI**: Styled with **Fontawesome** icons and responsive components for a smooth user experience.  
- **Full-Stack Functionality**: Combines a **React.js** frontend with a **Node.js** backend for seamless integration.  

## **Technologies Used**  
### **Languages**  
- **JavaScript**  
- **HTML**  
- **CSS**  
- **Git**  

### **Frameworks and Tools**  
- **React.js**  
- **Node.js**  
- **TailwindCSS**  
- **Vite**  
- **Fontawesome**  

### **APIs and Services**  
- **HuggingFace API**: For generating unique images based on user prompts.  
- **MongoDB**: For storing image URLs, prompts, and user details.  
- **Cloudinary**: For uploading and hosting images, generating shareable links.  

## **Setup Instructions**  
1. Clone the repository:  
   ```bash  
   git clone https://github.com/a1865818/Image-Generator.git  
   ```  
2. Navigate to the project directory:  
   ```bash  
   cd Image-Generator  
   ```  
3. Install dependencies for the client:  
   ```bash  
   cd client  
   npm install  
   ```  
4. Install dependencies for the server:  
   ```bash  
   cd server  
   npm install  
   ```  
5. Set up API keys:  
   - HuggingFace API Key: Required for image generation.  
   - MongoDB URI: For database connectivity.  
   - Cloudinary API Key: For image uploading and hosting.  

6. Create a `.env` file in the root directory with the following structure:  
   ```env  
   HuggingFace API_KEY=<Your_HuggingFace API_Key>  
   MONGODB_URI=<Your_MongoDB_URI>  
   CLOUDINARY_API_KEY=<Your_Cloudinary_API_Key>  
   CLOUDINARY_SECRET=<Your_Cloudinary_Secret>  
   CLOUDINARY_NAME=<Your_Cloudinary_Name>  
   ```  

7. Run the client and server:  
   - Start the frontend:  
     ```bash  
     cd client  
     npm run dev  
     ```  
   - Start the backend:  
     ```bash  
     cd server  
     npm start  
     ```  

8. Open the application in your browser at `http://localhost:3000`.  

## **Folder Structure**  
```
Image-Generator/  
│  
├── client/               # React.js frontend  
│   ├── src/              # Source files  
│   ├── public/           # Static assets  
│   └── package.json      # Client dependencies  
│  
├── server/               # Node.js backend  
│   ├── models/           # MongoDB models  
│   ├── routes/           # API routes  
│   └── package.json      # Server dependencies  
│  
└── .env                  # Environment variables  
```  

## **Future Enhancements**  
- **Social Sharing**: Add options to share generated images on social media platforms.  
- **Custom Filters**: Allow users to apply filters to enhance generated images.  
- **Multi-Language Support**: Extend the app to support multiple languages for a global audience.  
- **Improved AI Models**: Experiment with other AI models for better image quality.  

## **License**  
This project is licensed under the **MIT License**.  

## **Acknowledgments**  
- **HuggingFace** for the API integration.  
- **MongoDB** for database support.  
- **Cloudinary** for reliable image hosting.  
- **TailwindCSS** for sleek, responsive designs.  

