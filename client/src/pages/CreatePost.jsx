import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

// import { set } from 'mongoose';

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        console.log('Sending request with prompt:', form.prompt);

        // http://localhost:3000/api/v1/huggingface
        const response = await fetch('https://andrew-image-generator.onrender.com/api/v1/huggingface', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data = await response.json();
        console.log('Received response:', data);

        if (data.photo) {
          setForm({ ...form, photo: data.photo });
        } else {
          console.error('No photo in response:', data);
          alert(data.error || 'Failed to generate image. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert(error.message || 'Something went wrong');
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please enter a prompt');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        // http://localhost:3000/api/v1/post
        const response = await fetch('https://andrew-image-generator.onrender.com/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });

        const result = await response.json();
        console.log('Post response:', result);

        if (response.ok) {
          navigate('/');
        } else {
          alert(result.message || 'Failed to share the post. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert(error.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image before sharing');
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[38px] text-[white]">AI-Powered Image Creation</h1>
        <p className="mt-2 text-[white] text-[18px] max-w-[500px]">Want to bring your ideas to life? Try our AI Image Generator today! Simply describe your image, and watch the magic happen.</p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder='A photo of a Samoyed dog with its tongue out hugging a white Siamese cat'
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className=" text-white bg-green-700 font-medium text-[18px] rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[white] text-[18px]">Get the image you want? Share it to the community!</p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-[18px] w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Sharing...' : 'Share'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;