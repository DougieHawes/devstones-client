import Layout from "./Layout";

const Home = () => {
  const children = <div className="children">CHILDREN</div>;

  return (
    <Layout
      title="devstones"
      description="online bookstore for developers and programmers"
      children={children}
    />
  );
};

export default Home;
