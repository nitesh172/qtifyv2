import React from "react"
import styles from "./AlbumCard.module.css"
import { Chip } from "@mui/material"

const AlbumCard = ({ album }) => {
  return (
    <div className={styles.albumCard}>
      <div className={styles.content}>
        <img
          src={album?.image}
          alt={album?.slug}
          className={styles.cardImage}
        />
        <div className={styles.followConatiner}>
          <Chip
            label={`${album?.follows || album?.likes} ${
              !album?.follows ? "Likes" : "Follows"
            }`}
            variant="filled"
            color="secondary"
            size="small"
          />
        </div>
      </div>
      <div className={styles.cardTitle}>{album?.title}</div>
    </div>
  )
}

export default AlbumCard
