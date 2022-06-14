import react, { useEffect, useState } from 'react'
import axios from 'axios'

const YoutubeDescription = ({ videoId }) => {
  const [data, setData] = useState()
  const [fullDescription, setFullDescription] = useState()

  // gets data from youtube api
  const getDescription = async (videoId) => {
    const config = {
      method: 'get',
      url: `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&fields=items(id,snippet(channelId,title,categoryId,description,thumbnails),statistics)&part=snippet,statistics`,
      headers: {},
    }

    const response = await axios(config)
    const data = await response.data
    setData(data)
    setFullDescription(data.items[0].snippet.description)
  }

  useEffect(() => {
    getDescription(videoId)
  }, [])

  if (!data) {
    return <h1>Loading...</h1>
  }

  console.log(fullDescription)
  console.log(data)

  return <div>full return</div>
}

export default YoutubeDescription
