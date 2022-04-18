import { Button, Grid, TextField } from "@mui/material"
import axios from "axios"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { useState } from "react"
import { useInput } from "../../components/useInput"
import MainLayout from "../../layouts/MainLayout"
import { ITrack } from "../../types/track"

const TrackPage = ({serverTrack}) => {
  const router = useRouter()
  const [track, setTrack] = useState(serverTrack)
  const username = useInput('')
  const text = useInput('')

  const addComment = async () => {
    try {
      const response = await axios.post('http://localhost:5555/tracks/comment', {
        username: username.value,
        text: text.value,
        trackId: track._id
      })
      setTrack({...track, comments: [...track.comments, response.data]})
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <MainLayout>
      <Button
        variant={'outlined'}
        style={{fontSize: 32}}
        onClick={()=>router.push('/tracks')}
      >
        К списку
      </Button>
      <Grid container style={{margin: '20px 0'}}>
        <img src={'http://localhost:5555/' + track.picture} width={200} height={200}/>
          <div style={{marginLeft: 30}}>
              <h1>Название трека - {track.name}</h1>
              <h1>Исполнитель - {track.artist}</h1>
              <h1>Прослушиваний - {track.listens}</h1>
          </div>
      </Grid>
      <h1>Слова в треке</h1>
      <p>{track.text}</p>
      <h1>Комментарии</h1>
      <Grid container>
        <TextField
          label="Ваше имя"
          fullWidth
          {...username}
        />
        <TextField
          label="Комментарий"
          fullWidth
          multiline
          rows={4}
          {...text}
        />
        <Button onClick={addComment}>Отправить</Button>
        <div>
          {track.comments.map(comment =>
              <div>
                <div>Автор - {comment.username}</div>
                <div>Комментарий - {comment.text}</div>
              </div>
          )}
        </div>
      </Grid>
    </MainLayout>
  )
}

export default TrackPage

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const repsonse = await axios.get('http://localhost:5555/tracks/' + params.id)
  return {
    props: {
      serverTrack: repsonse.data
    }
  }
}