import React from 'react';
import Layout from '../../components/Layout/Layout';
import Baner from '../../components/Banner/Banner';
import Intro from '../../components/Intro/Intro';


const HomePage = () => {
  return (
    <Layout>
      <Baner/>
      <Intro/>
      <h1>Home Page</h1>
    </Layout>
  )
}

export default HomePage;