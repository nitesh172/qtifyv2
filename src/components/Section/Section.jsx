import React, { useEffect, useRef, useState } from "react"
import styles from "./Section.module.css"
import AlbumCard from "../AlbumCard/AlbumCard"

const Section = ({ title, endpoint, isGenres }) => {
  const [isCollapse, setIsCollapse] = useState(false)
  const [albums, setAlbums] = useState([])
  const [genres, setGenres] = useState([])
  const [selectedGenres, setSelectedGenres] = useState("all")
  const [filterAlbums, setFilterAlbums] = useState([])

  const carouselRef = useRef(null)

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -210, behavior: "smooth" })
  }

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 210, behavior: "smooth" })
  }

  const collapse = () => setIsCollapse(!isCollapse)

  const fetchAlbums = async () => {
    try {
      const response = await fetch(
        `https://qtify-backend.labs.crio.do/${endpoint}`
      )

      setAlbums(await response.json())
    } catch (error) {
      console.log(error)
    }
  }

  const fetchGenres = async () => {
    try {
      const response = await fetch(`https://qtify-backend.labs.crio.do/genres`)

      const data = await response.json()

      setGenres([{ key: "all", label: "All" }, ...data.data])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAlbums()
    isGenres && fetchGenres()
  }, [])

  useEffect(() => {
    if (isGenres && selectedGenres !== "all" && albums && !!albums.length) {
      const filterSongs = albums.filter((album) => {
        if (album.genre.key === selectedGenres) {
          return album
        }
      })
      console.log(selectedGenres, filterSongs)
      setFilterAlbums(filterSongs)
    } else {
      setFilterAlbums(albums)
    }
  }, [selectedGenres, albums])

  const selectGenre = (key) => setSelectedGenres(key)

  const GenreCard = ({ genre }) => {
    return (
      <div onClick={() => selectGenre(genre.key)} className={styles.genresCard}>
        <div className={styles.genresCardText}>{genre.label}</div>
        <div
          className={
            genre.key === selectedGenres
              ? styles.genresCardIndicatorSelected
              : styles.genresCardIndicator
          }
        />
      </div>
    )
  }

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.title}>{title}</div>
        {!isGenres && (
          <div onClick={collapse} className={styles.textButton}>
            {isCollapse ? "Collapse" : "Show All"}
          </div>
        )}
      </div>
      {isGenres && !!genres.length && (
        <div className={styles.genres}>
          {genres.map((genre) => (
            <GenreCard key={genre.key} genre={genre} />
          ))}
        </div>
      )}
      <div className={styles.carouselWrapper}>
        {!isCollapse && (
          <button className={styles.leftBtn} onClick={scrollLeft}>
            <span>‹</span>
          </button>
        )}

        {(!!albums.length || (isGenres && !!filterAlbums.length)) && (
          <div
            ref={carouselRef}
            className={isCollapse ? styles.cardGrid : styles.cardCarousel}
          >
            {(isGenres ? filterAlbums : albums).map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        )}

        {!isCollapse && (
          <button className={styles.rightBtn} onClick={scrollRight}>
            <span>›</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default Section
