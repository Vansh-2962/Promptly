import PromptCard from "./PromptCard";
const profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full px-10 ">
      <h1>
        <span className="font-bold font-sans text-3xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text text-center">
          {name} Profile
        </span>
        <p className="text-left mt-6">{desc}</p>
      </h1>

      <div className="my-16  grid md:grid-cols-3  grid-cols-1 gap-3">
        {data?.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default profile;
