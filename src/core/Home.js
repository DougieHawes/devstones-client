import Layout from "./Layout";

const Home = () => {
  const home = <div className="child">CHILDREN</div>;

  return (
    <Layout
      title="devstones"
      description="online bookstore for developers and programmers"
      children={home}
    />
  );
};

export default Home;
