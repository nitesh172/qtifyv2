import React from "react"
import Hero from "../components/Hero/Hero"
import Section from "../components/Section/Section"

const Home = () => {
  return (
    <>
      <Hero />
      <Section endpoint="albums/top" title="Top Albums" />
      <Section endpoint="albums/new" title="New Albums" />
      <Section endpoint="songs" title="Songs" isGenres />
    </>
  )
}

export default Home
