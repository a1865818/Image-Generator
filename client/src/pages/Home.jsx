import React , {useState, useEffect} from 'react'
import {Loader, Card, FormField} from "../components";

const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
      return (
        data.map((post) => <Card key={post._id} {...post} />)
      );
}  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [allPosts, setAllPosts] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState(null);
  
    useEffect(() => {
      const fetchPosts = async () => {
        setLoading(true);
        try {
          //http://localhost:3000/api/v1/post
          const response = await fetch('https://andrew-image-generator.onrender.com/api/v1/post', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        if (response.ok) {
          const result = await response.json();
          setAllPosts(result.data.reverse());
        } else {
          console.error('Failed to fetch posts:', result.message);
        }
        } catch (error) {
          console.error('Error fetching posts:', error);
        } finally{
          setLoading(false);
        }
      }
      fetchPosts();
      },[]);

      const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);
    
        setSearchTimeout(
          setTimeout(() => {
            const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
            setSearchedResults(searchResult);
          }, 500),
        );
      };

    return (
        <section className="max-w-7xl mx-auto">
            <div>
            <h1 className="font-extrabold text-[38px] text-[white]">AI Image Generator</h1>
            <p className="mt-2 text-[white] text-[18px] max-w-[500px]">
            An Automatic AI Image Generator using HuggingFace API
            </p>
            </div>
            <div className="mt-16">
            <FormField
            labelName="Search posts"
            type="text"
            name="text"
            placeholder="Search posts"
            value={searchText}
            handleChange={handleSearchChange}
            />
            </div>
            <div className="mt-10">
                {loading ? (
                <div className="flex justify-center items-center">
                    <Loader />
                </div>
                ) : (
                <>
                    {searchText && (
                    <h2 className="font-medium text-xl mb-3 text-[white]">
                        Showing Results for <span className="text-[white]">{searchText}</span>:
                    </h2>
                    )}
                    <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                    {searchText ? (
                        <RenderCards
                        data={searchedResults}
                        title="No Search Results Found"
                        />
                    ) : (
                        <RenderCards
                        data={allPosts}
                        title="No Posts Yet"
                        />
                    )}
            </div>
          </>
        )}
      </div>
        </section>

        
    )
}

export default Home