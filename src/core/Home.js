import Layout from "./Layout";

import { API } from "../config";

const Home = () => {
  return (
    <Layout
      title="devstones"
      description="online bookstore for developers and programmers"
      children={API}
    />
  );
};

export default Home;
